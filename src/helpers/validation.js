export default function validate(values) {
    let errors = {};
    if (!values.job_title) {
        errors.job_title = 'Job Title is required';
    }
    if (!values.salary) {
        errors.salary = 'Salary is required';
    }
    if (!values.description) {
        errors.description = 'Description is required';
    }
    if (!values.employer) {
        errors.employer = 'Employer is required';
    }
    if (!values.jobtype) {
        errors.jobtype = 'Job Type is required';
    }
    if (!values.jobstatus) {
        errors.jobstatus = 'Job Status is required';
    }
    if (!values.jobclass) {
        errors.jobclass = 'Job Class is required';
    }
    if (!values.expiryDate) {
        errors.expiryDate = 'Expiry Date is required';
    }
    return errors;
};