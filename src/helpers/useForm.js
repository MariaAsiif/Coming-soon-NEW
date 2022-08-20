import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({
    expiryDate: "",
        job_title: "",
        salary: "",
        description: "",
        jobtype: "",
        jobstatus: "",
        jobclass: "",
        employer: "",
        job_image_url: "/uploads/dp/default.png",
        jobCategory: ["62fa17bbdd8f3425747ee221", "62fa188bdd8f3425747ee222"],
        physicalLocation: {
            country: "Lahore",
            state: "Lahore",
            province: "Lahore",
            city: "Lahore"
        },
        location: {
            type: "Point",
            coordinates: [
                74.28911285869138,
                31.624888273644956
            ]
        }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };


  const handleExpiryDateChange = (date) => {

    setValues(values => ({ ...values, expiryDate: date[0] }));

  }

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    handleExpiryDateChange,
    values,
    errors,
    isSubmitting,
  }
};

export default useForm;