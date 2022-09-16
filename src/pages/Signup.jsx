import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/hporx_logo.png';
import AuthImage from '../images/signin.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Country, State, City } from 'country-state-city';
import * as yup from 'yup';
import { callApi } from '../utils/CallApi';
import { FcCheckmark } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2';
const schema = yup.object({
  first_name: yup.string().required(),
  first_family_name: yup.string().required(),
  second_family_name: yup.string().optional(),
  third_family_name: yup.string().optional(),
  email: yup.string().email('Invalid email format').required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
});

function Signup() {
  let navigate = useNavigate();
  const [formdata, setformdata] = useState({
    first_name: '',
    first_family_name: '',
    second_family_name: '',
    third_family_name: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    is_verified: false,
    approved: false,
    active: true,
  });

  const [all_Countries, setall_Countries] = useState([]);
  const [all_States, setall_States] = useState([]);
  const [all_Cities, setall_Cities] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const [location, setLocation] = useState({
    type: 'Point',
    coordinates: [0, 0],
  });

  const handleChangeCountry = (e) => {
    let { value } = e.target;
    console.log('value ', value);
    let countryCode = all_Countries.find(
      (country) => country.name === value
    ).isoCode;
    const updatedStates = State.getStatesOfCountry(countryCode);
    setCountryCode(countryCode);
    setall_States(updatedStates);
    setformdata((prevmodel) => ({
      ...prevmodel,
      country: value,
    }));
  };

  const handleChangeState = (e) => {
    let { value } = e.target;
    let stateCode = all_States.find((state) => state.name === value).isoCode;
    const updatedCities = City.getCitiesOfState(
      countryCode.toUpperCase(),
      stateCode
    );
    setformdata((prevmodel) => ({
      ...prevmodel,
      state: value,
    }));
    setall_Cities(updatedCities);
  };

  const handleChangeCity = (e) => {
    let { value } = e.target;
    setformdata((prevmodel) => ({
      ...prevmodel,
      city: value,
    }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      active: true,
      approved: false,
      is_verified: false,
      country: formdata.country,
      state: formdata.state,
      city: formdata.city,
      location,
    };
    console.log(`newData =====`, newData);
    try {
      let response = await callApi('/users/signup', 'post', newData);
      console.log('response======', response);
      if (response.status === 'Success') {
        console.log(`response message ========`, response.message);
        toast.success(`User signup successfully`);
        setTimeout(() => {
          navigate('/signin');
        }, 5000);
      } else {
        console.log(`Error reponse message ========`, response.message);

        toast.error(response.message);
      }
    } catch (error) {
      console.log(`error ============`, error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios(
          'https://api.ipregistry.co/?key=m7irmmf8ey12rx7o'
        );
        const currentCountryCode = response.data.location.country.code;
        let id = response.data.location.country.tld;
        let removeDot = id.replace('.', '');
        setCountryCode(removeDot);
        const get_countris = Country.getAllCountries();
        const CurrentStates = State.getStatesOfCountry(currentCountryCode);
        const CurrentCities = City.getCitiesOfState(
          currentCountryCode,
          CurrentStates[0].isoCode
        );
        setall_Countries(get_countris);
        setall_States(CurrentStates);
        setall_Cities(CurrentCities);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className='bg-white'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='relative md:flex'>
        {/* Content */}
        <div className='md:w-1/2'>
          <div className='min-h-screen h-full flex flex-col after:flex-1'>
            {/* Header */}
            <div className='flex-1'>
              <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
                {/* Logo */}
                <Link className='block' to='/'>
                  <img src={logo} alt='Logo' className=' w-36' />
                </Link>
              </div>
            </div>

            <div className='max-w-lg mx-auto px-4 py-4'>
              <h1 className='text-3xl text-slate-800 font-bold mb-6'>
                Create your Account
              </h1>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-0'>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='name'
                      >
                        Full Name <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        {...register('first_name')}
                        name='first_name'
                        value={formdata.first_name}
                        onChange={handleChange}
                        id='first_name'
                        className='form-input w-full'
                        type='text'
                      />

                      {errors.first_name && (
                        <p className='text-red-500 text-sm'>
                          {`first name is a required`}
                        </p>
                      )}
                      <div className='absolute right-5 top-10'>
                        {!errors.first_name ? (
                          <FcCheckmark />
                        ) : errors.first_name ? (
                          <div className=' text-red-500'>
                            <MdClose />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='first_family_name'
                      >
                        First Family Name
                        <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        {...register('first_family_name')}
                        name='first_family_name'
                        value={formdata.first_family_name}
                        onChange={handleChange}
                        id='first_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                      {errors.first_family_name && (
                        <p className='text-red-500 text-sm'>
                          {`first family name is a required`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='second_family_name'
                      >
                        Second Family Name
                      </label>
                      <input
                        {...register('second_family_name')}
                        name='second_family_name'
                        value={formdata.second_family_name}
                        onChange={handleChange}
                        id='second_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                      {errors.second_family_name && (
                        <p className='text-red-500 text-sm'>
                          {`second family name is a required`}
                        </p>
                      )}
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='third_family_name'
                      >
                        Third Family Name
                      </label>
                      <input
                        {...register('third_family_name')}
                        name='third_family_name'
                        value={formdata.third_family_name}
                        onChange={handleChange}
                        id='third_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                      {errors.third_family_name && (
                        <p className='text-red-500 text-sm'>
                          {errors.third_family_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='email'
                      >
                        Email <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        {...register('email')}
                        name='email'
                        value={formdata.email}
                        onChange={handleChange}
                        id='email'
                        className='form-input w-full'
                        type='text'
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='Password'
                      >
                        Password <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        {...register('password')}
                        name='password'
                        value={formdata.Password}
                        onChange={handleChange}
                        id='password'
                        className='form-input w-full'
                        type='password'
                      />
                      {errors.password && (
                        <p className='text-red-500 text-sm'>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='country'
                      >
                        Country <span className='text-rose-500'>*</span>
                      </label>
                      <select
                        value={formdata.country}
                        onChange={handleChangeCountry}
                        name='country'
                        id='country'
                        className={`form-input w-full   ${
                          errors.country && 'border-red-500'
                        }`}
                      >
                        <option value=''>Select Country </option>
                        {all_Countries.map((country) => (
                          <option>{country.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='state'
                      >
                        State <span className='text-rose-500'>*</span>
                      </label>
                      <select
                        value={formdata.state}
                        onChange={handleChangeState}
                        name='state'
                        id='state'
                        className={`form-input w-full   ${
                          errors.state && 'border-red-500'
                        }`}
                      >
                        <option value=''>Select State </option>
                        {all_States.map((state) => (
                          <option>{state.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='city'
                      >
                        City <span className='text-rose-500'>*</span>
                      </label>
                      <select
                        // {...register('city')}
                        value={formdata.city}
                        onChange={handleChangeCity}
                        name='city'
                        id='city'
                        className={`form-input w-full   ${
                          errors.city && 'border-red-500'
                        }`}
                      >
                        <option>Select city </option>
                        {all_Cities.map((city) => {
                          return <option>{city.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='phoneNumber'
                      >
                        Phone
                      </label>
                      <div className='w-full '>
                        <Controller
                          name='phoneNumber'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              value={value}
                              enableSearch
                              disableSearchIcon
                              country={countryCode}
                              onChange={onChange}
                              placeholder='000 000 000'
                              // countryCodeEditable={false}
                              className={` w-full  ${
                                errors.phoneNumber && 'error_form'
                              }`}
                              dropdownClass={'custom-dropdown'}
                            />
                          )}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className='text-red-500 text-sm'>
                          {`phone number is a required`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-end mt-6'>
                  <button
                    type='submit'
                    className='btn bg-red-500 hover:bg-green-600 text-white ml-3 whitespace-nowrap'
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className='pt-5 mt-6 border-t border-slate-200'>
                <div className='text-sm'>
                  Have an account?{' '}
                  <Link
                    className='font-medium text-indigo-500 hover:text-indigo-600'
                    to='/signin'
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className='hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2'
          aria-hidden='true'
        >
          <img
            className='object-cover object-center w-full h-full'
            src={AuthImage}
            width='760'
            height='1024'
            alt='Authentication'
          />
          <img
            className='absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block'
            src={AuthDecoration}
            width='218'
            height='224'
            alt='Authentication decoration'
          />
        </div>
      </div>
    </main>
  );
}

export default Signup;
