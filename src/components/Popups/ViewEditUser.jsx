import React, { useEffect, useState, useRef } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Transition from '../../utils/Transition';
import { FcCheckmark } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import { Country, State, City } from 'country-state-city';
import { Alert } from 'react-bootstrap';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';
import { callApi } from '../../utils/CallApi';

const ViewEditUser = (props) => {
  const [all_Countries, setall_Countries] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange ' });
  const [all_States, setall_States] = useState([]);
  const [all_Cities, setall_Cities] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const modalContent = useRef(null);

  const [recruitModel, setrecruitModel] = useState({
    surname: 'Mr',
    fullname: '',
    firstFname: '',
    secondFname: '',
    thirdFname: '',
    email: '',
    reEmail: '',
    city: '',
    state: '',
    industry: '',
    country: '',
    // postcode:"",
    position: '',
    mobile: '',
    age: '',
  });

  console.log(`hello i am pop`);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'country') {
      const updatedStates = State.getStatesOfCountry(value);
      const stateCode =
        updatedStates.length > 0 ? updatedStates[0].isoCode : '';
      const updatedCities = City.getCitiesOfState(value, stateCode);
      setall_States(updatedStates);
      setall_Cities(updatedCities);
    } else if (name === 'state') {
      const updatedStates = State.getStatesOfCountry(value);
      const stateCode =
        updatedStates.length > 0 ? updatedStates[0].isoCode : '';
      const updatedCities = City.getCitiesOfState(value, stateCode);
      setall_Cities(updatedCities);
    } else {
      setrecruitModel((prevModel) => ({
        ...prevModel,
        [name]: value,
      }));
    }
  };
  const onSubmit = async (values) => {
    const { created_at } = values;
    const formattedDate = moment(created_at).format('YYYY-MM-DD');
    const payload = { ...values, created_at: formattedDate };
    let response = await callApi('/users/updateuser', 'post', payload);
    response.status === 'Success' && props.onClose();
  };

  useEffect(() => {
    reset(props.data);
    console.log(`props =============`, props);
  }, [props.data, reset]);

  return (
    <>
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
      {/* Modal backdrop */}
      <Transition
        className='fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity'
        show={props.show}
        enter='transition ease-out duration-200'
        enterStart='opacity-0'
        enterEnd='opacity-100'
        leave='transition ease-out duration-100'
        leaveStart='opacity-100'
        leaveEnd='opacity-0'
        aria-hidden='true'
      />
      {/* Modal dialog */}
      <Transition
        id={props.id}
        className='fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6'
        role='dialog'
        aria-modal='true'
        show={props.show}
        enter='transition ease-in-out duration-200'
        enterStart='opacity-0 translate-y-4'
        enterEnd='opacity-100 translate-y-0'
        leave='transition ease-in-out duration-200'
        leaveStart='opacity-100 translate-y-0'
        leaveEnd='opacity-0 translate-y-4'
      >
        <div
          ref={modalContent}
          className='bg-white rounded shadow-lg overflow-auto w-3/4 h-2/3'
        >
          {/* Modal header */}
          <div className='px-5 py-3 border-b border-slate-200'>
            <div className='flex justify-between items-center'>
              <div className='font-semibold text-slate-800'>View User</div>
              <button
                className='text-slate-400 hover:text-slate-500'
                onClick={props.onClose}
              >
                <div className='sr-only'>Close</div>
                <svg className='w-4 h-4 fill-current'>
                  <path d='M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z' />
                </svg>
              </button>
            </div>
          </div>
          <div className='bscontainer'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row p-5'>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    First Family Name
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.first_family_name}</p>
                  ) : (
                    <input
                      {...register('first_family_name', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    First Name
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.first_name}</p>
                  ) : (
                    <input
                      {...register('first_name', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Second Name
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.secondFname}</p>
                  ) : (
                    <input
                      {...register('secondFname', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Email
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.email}</p>
                  ) : (
                    <input
                      {...register('email', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    City
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.city}</p>
                  ) : (
                    <input
                      {...register('city', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Country
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.country}</p>
                  ) : (
                    <input
                      {...register('country', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    State
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.state}</p>
                  ) : (
                    <input
                      {...register('state', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Phone Number
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.phoneNumber}</p>
                  ) : (
                    <input
                      {...register('phoneNumber', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Role
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.role}</p>
                  ) : (
                    <input
                      {...register('role', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='description'
                  >
                    Registered Date
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.created_at}</p>
                  ) : (
                    <input
                      {...register('created_at', { required: true })}
                      className={`form-input w-full ${
                        errors.authorName
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                    />
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                {/* <div className='col-lg-4 mb-5'>
                                <label className="block text-lg font-medium mb-1" htmlFor="description">QUOTE DATE</label>
                                {mode === "view" ?
                                    (
                                        <p>{moment(data.quoteDate).format('MM/DD/YYYY')}</p>
                                    ) : (
                                        <DatePicker
                                            value={quoteDate}
                                            onChange={(date) => setquoteDate(date)}
                                            renderInput={renderCustomInput} // render a custom input
                                            shouldHighlightWeekends
                                        // calendarPopperPosition="bottom"
                                        />
                                    )}
                            </div> */}
                {props.mode !== 'view' ? (
                  <div className='col-lg-12'>
                    <button
                      type='submit'
                      className='btn bg-red-500 hover:bg-green-600 text-white'
                    >
                      Update User
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ViewEditUser;
