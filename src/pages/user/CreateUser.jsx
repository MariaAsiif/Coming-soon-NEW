import React, { useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { callApi } from '../../utils/CallApi';

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Author Name is Required'),
  quote: yup.string().required('Quotation is Required'),
});

const CreateUsers = () => {
  console.log('Create User page');
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  const [quoteDate, setquoteDate] = useState({
    day: dd,
    month: mm,
    year: yyyy,
  });
  const [companySetting, setCompanySetting] = useState(true);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  // ****************** Datepicker Content ***********
  const renderCustomInput = ({ ref }) => (
    <div className='relative cursor-pointe w-full'>
      <input
        readOnly
        ref={ref} // necessary  placeholder="yyy-mm-dd"
        value={
          quoteDate
            ? `${quoteDate.year}/${quoteDate.month}/${quoteDate.day}`
            : ''
        }
        className={` form-input w-full outline-blue-400 cursor-pointer z-30  px-2 py-2  border-gray-400`}
      />
      <div className={`visible absolute top-3 cursor-pointer right-5`}>
        {' '}
        <FcCheckmark />{' '}
      </div>
    </div>
  );

  const handleChangeDate = (data) => {
    const date = moment(data).format('yyyy-M-D').split('-');
    setquoteDate({ day: +date[2], month: +date[1], year: +date[0] });
  };

  const onSubmit = async (data) => {
    let updated = `${quoteDate.year}-${quoteDate.month}-${quoteDate.day}`;

    let value = {
      quoteText: data.quote,
      authorName: data.name,
      quoteColor: 'Red',
      quoteDate: updated,
      addedby: '6305dac13c594d3538c790b8',
    };
    const res = await callApi('/quotes/createQuote', 'post', value);
    if (res.status === 'Success') {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='bscontainer-fluid'>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row p-11'>
          <div className='col-12 mb-6'>
            <div className='mb-3'>
              <ul className='inline-flex flex-wrap text-sm font-medium'>
                <li className='flex items-center'>
                  <Link
                    to='/dashboard'
                    className='text-slate-500 hover:text-indigo-500'
                  >
                    Dashboard{' '}
                  </Link>
                  <svg
                    className='h-4 w-4 fill-current text-slate-400 mx-3'
                    viewBox='0 0 16 16'
                  >
                    <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z' />
                  </svg>
                </li>
                <li className='flex items-center'>
                  <Link
                    to='/user/list'
                    className='text-slate-500 hover:text-indigo-500'
                  >
                    Users{' '}
                  </Link>
                  <svg
                    className='h-4 w-4 fill-current text-slate-400 mx-3'
                    viewBox='0 0 16 16'
                  >
                    <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z' />
                  </svg>
                </li>
                <li className='flex items-center'>
                  <Link
                    to='/user/list/create-user'
                    className='text-slate-500 hover:text-indigo-500'
                    href='#0'
                  >
                    Create Users
                  </Link>
                </li>
              </ul>
            </div>
            <header className='py-4'>
              <h2 className='font-semibold text-slate-800'>Add New User</h2>
            </header>
          </div>

          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='name'>
              First Name{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('name') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('name')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='name'
              id='name'
              type='text'
              placeholder='Name'
            />
            <span
              hidden={watch('name')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='firstFamilyName'
            >
              First Family Name{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('firstFamilyName') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('firstFamilyName')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='firstFamilyName'
              id='firstFamilyName'
              type='text'
              placeholder='First Family Name'
            />
            <span
              hidden={watch('firstFamilyName')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='secondFamilyName'
            >
              Second Family Name{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('secondFamilyName') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('secondFamilyName')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='secondFamilyName'
              id='secondFamilyName'
              type='text'
              placeholder='Second Family Name'
            />
            <span
              hidden={watch('secondFamilyName')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='thirdFamilyName'
            >
              Third Family Name{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('thirdFamilyName') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('thirdFamilyName')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='thirdFamilyName'
              id='thirdFamilyName'
              type='text'
              placeholder='Third Family Name'
            />
            <span
              hidden={watch('thirdFamilyName')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='city'>
              City{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('city') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('city')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='city'
              id='city'
              type='text'
              placeholder='City'
            />
            <span
              hidden={watch('City')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='country'>
              Country{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('city') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('country')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='country'
              id='country'
              type='text'
              placeholder='Country'
            />
            <span
              hidden={watch('Country')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='state'>
              State{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('state') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('state')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='state'
              id='state'
              type='text'
              placeholder='State'
            />
            <span
              hidden={watch('state')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='name'>
              Email{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('email') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('email')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='Email'
              id='name'
              type='text'
              placeholder='Email'
            />
            <span
              hidden={watch('email')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='phonenumber'
            >
              Phone Number{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('phoneNumber') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('phoneNumber')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='Phone Number'
              id='phoneNumber'
              type='number'
              placeholder='Phone Number'
            />
            <span
              hidden={watch('phoneNumber')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label className='block text-sm font-medium mb-1' htmlFor='role'>
              Role{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('password') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('role')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='Role'
              id='role'
              type='text'
              placeholder='Role'
            />
            <span
              hidden={watch('role')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='confirmPassword'
            >
              Confirm Password{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('confirmPassword') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('confirmPassword')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='confirmPassword'
              id='confirmPassword'
              type='text'
              placeholder='Confirm Password'
            />
            <span
              hidden={watch('confirmPassword')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='col-lg-4 mb-4 relative'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='password'
            >
              Password{' '}
            </label>
            <div className='absolute right-5 top-10'>
              {!errors.name && watch('role') ? (
                <FcCheckmark />
              ) : errors.name ? (
                <div className=' text-red-500'>
                  <MdClose />
                </div>
              ) : null}
            </div>
            <input
              {...register('password')}
              autoComplete='off'
              className={`w-full  ${
                errors.name ? 'border-red-400' : 'border-gray-400'
              }`}
              name='password'
              id='password'
              type='text'
              placeholder='Password'
            />
            <span
              hidden={watch('password')}
              className='absolute text-red-400 text-lg font-medium  top-9 left-[345px]'
            >
              *
            </span>

            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div className='col-lg-12'>
            <button className='btn bg-red-500 hover:bg-green-600 text-white'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUsers;
