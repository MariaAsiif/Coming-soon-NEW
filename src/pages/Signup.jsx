import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcCheckmark } from 'react-icons/fc';
import AuthImage from '../images/signin.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import axios from 'axios';
import { callPublicApi } from '../utils/CallApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../images/hporx_logo.png';
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
    first_family_name: 'jamshaid',
    second_family_name: 'jamshaid',
    third_family_name: 'jamshaid',
    email: '',
    password: '',
    phoneNumber: '+923074901291',
    channel: 'sms',
    role: 'superadmin',
    approved: false,
    location: {
      type: 'Point',
      coordinates: [74.28911285869138, 31.624888273644956],
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const handleSignup = async () => {
    console.log('handle sign up clicked');
    try {
      const response = await callPublicApi('/users/signup', 'post', formdata);
      console.log('response', response);
      if (response.status === 'Success') {
        console.log('Successs');
        navigate('/ecommerce/orders', { replace: true });
      }
    } catch (error) {
      console.log('ERROR of Signup', error);
    }
  };

  return (
    <main className='bg-white'>
      <div className='relative md:flex'>
        {/* Content */}
        <div className='md:w-1/2'>
          <div className='min-h-screen h-full flex flex-col after:flex-1'>
            {/* Header */}
            <div className='flex-1'>
              <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
                {/* logo */}
                <Link className='block' to='/'>
                  <img src={logo} alt='Logo' className=' w-36' />
                </Link>
              </div>
            </div>

            <div className='max-w-lg mx-auto px-4 py-8'>
              <h1 className='text-3xl text-slate-800 font-bold mb-6'>
                Create your Account
              </h1>
              {/* Form */}
              <form>
                <div className='space-y-6'>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='name'
                      >
                        Full Name <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='first_name'
                        value={formdata.first_name}
                        onChange={handleChange}
                        id='name'
                        className='form-input w-full'
                        type='text'
                      />
                      {errors.first_name && (
                        <p className='text-red-500 text-sm'>
                          {errors.first_name.message}
                        </p>
                      )}
                      <span
                        className={
                          watch('first_name')
                            ? `visible absolute top-1/4 right-3`
                            : `invisible`
                        }
                      >
                        <FcCheckmark />
                      </span>
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='First Family Name'
                      >
                        First Family Name
                        <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='First Family Name'
                        value={formdata.first_family_name}
                        onChange={handleChange}
                        id='first_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='name'
                      >
                        Second Family Name
                        <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='Second Family Name'
                        value={formdata.second_family_name}
                        onChange={handleChange}
                        id='second_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='Third Family Name'
                      >
                        Third Family Name
                        <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='third_family_name'
                        value={formdata.third_family_name}
                        onChange={handleChange}
                        id='third_family_name'
                        className='form-input w-full'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='Email'
                      >
                        Email <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='email'
                        value={formdata.Email}
                        onChange={handleChange}
                        id='Email'
                        className='form-input w-full'
                        type='text'
                      />
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='Password'
                      >
                        Password <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='password'
                        value={formdata.Password}
                        onChange={handleChange}
                        id='Password'
                        className='form-input w-full'
                        type='text'
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
                        value=''
                        // onChange={handleChangeCountry}
                        name='country'
                        id='country'
                        className={`form-input w-full`}
                      >
                        <option value=''>Select Country </option>
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
                        value=''
                        // onChange={handleChangeCountry}
                        name='state'
                        id='state'
                        className={`form-input w-full`}
                      >
                        <option value=''>Select State </option>
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
                        value=''
                        // onChange={handleChangeCountry}
                        name='city'
                        id='city'
                        className={`form-input w-full`}
                      >
                        <option value=''>Select City </option>
                      </select>
                    </div>
                    <div className='col-lg-6 mb-4 '>
                      <label
                        className='block text-sm font-medium mb-1'
                        htmlFor='phonenumber'
                      >
                        Phone Number <span className='text-rose-500'>*</span>
                      </label>
                      <input
                        name='phoneNumber'
                        value={formdata.phoneNumber}
                        onChange={handleChange}
                        id='phoneNumber'
                        className='form-input w-full'
                        type='number'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  <button
                    onClick={handleSignup}
                    type='button'
                    className='btn bg-red-500 hover:bg-green-600 text-white'
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
