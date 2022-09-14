import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Transition from '../../utils/Transition';
import { Country, State, City } from 'country-state-city';
import moment from 'moment';
import { callApi } from '../../utils/CallApi';
import PhoneInput from 'react-phone-input-2';

const ViewEditUser = (props) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange ' });

  const [isActive, setIsActive] = useState(true);
  const [approved, setApproved] = useState(true);
  const [verified, setVerified] = useState(true);
  const [roles, setallroles] = useState([]);
  const [role, setRole] = useState('');
  const [error, setError] = useState({
    userError: '',
    roleError: '',
  });

  // ROle Handler
  const [all_Countries, setall_Countries] = useState([]);
  const [all_States, setall_States] = useState([]);
  const [all_Cities, setall_Cities] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const modalContent = useRef(null);

  const [recruitModel, setrecruitModel] = useState({
    surname: 'Mr',
    fullname: '',
    first_family_name: '',
    second_family_name: '',
    third_family_name: '',
    email: '',
    reEmail: '',
    city: '',
    state: '',
    industry: '',
    country: '',
    position: '',
    mobile: '',
    age: '',
  });

  const handleIsActive = () => setIsActive(!isActive);
  const handleApproved = () => setApproved(!approved);
  const handleVerified = () => setVerified(!verified);

  // ROle Set
  const handleChangeRole = (e) => {
    let findRole = roles.find((f) => f._id === e.target.value);
    setRole(findRole._id);
  };

  const handleChangeCountry = (e) => {
    let { value } = e.target;
    let countryCode = all_Countries.find(
      (country) => country.name === value
    ).isoCode;
    const updatedStates = State.getStatesOfCountry(countryCode);
    setCountryCode(countryCode);
    setall_States(updatedStates);
    setrecruitModel((prevmodel) => ({
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
    setrecruitModel((prevmodel) => ({
      ...prevmodel,
      state: value,
    }));
    setall_Cities(updatedCities);
  };

  const handleChangeCity = (e) => {
    let { value } = e.target;
    setrecruitModel((prevmodel) => ({
      ...prevmodel,
      city: value,
    }));
  };

  const onSubmit = async (values) => {
    const { created_at } = values;
    const formattedDate = moment(created_at).format('YYYY-MM-DD');
    const payload = {
      ...values,
      country: recruitModel.country,
      state: recruitModel.state,
      city: recruitModel.city,
      created_at: formattedDate,
    };
    let response = await callApi('/users/updateuser', 'post', payload);
    response.status === 'Success' && props.onClose();
  };

  useEffect(() => {
    reset(props.data);
  }, [props.data, reset]);

  // Geo

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

  // ROle Set
  useEffect(() => {
    (async () => {
      try {
        const roles = {
          sortproperty: 'createdAt',
          sortorder: -1,
          offset: 0,
          limit: 50,
          query: {
            critarion: { active: true },
            fields: '_id roleName',
          },
        };

        const resRole = await callApi('/roles/getRolesList', 'post', roles);
        setallroles(resRole.data.roles);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
                    Second Family Name
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.second_family_name}</p>
                  ) : (
                    <input
                      {...register('second_family_name', { required: true })}
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
                    Third Family Name
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.third_family_name}</p>
                  ) : (
                    <input
                      {...register('third_family_name', { required: true })}
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
                    Country
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.country}</p>
                  ) : (
                    <select
                      value={
                        recruitModel.country
                          ? recruitModel.country
                          : props.data.country
                      }
                      onChange={handleChangeCountry}
                      name='country'
                      id='country'
                      className={`form-control  form-control-lg ${
                        errors.country && 'border-red-500'
                      }`}
                    >
                      <option value=''>Select Country </option>
                      {all_Countries.map((country) => (
                        <option>{country.name}</option>
                      ))}
                    </select>
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
                    <select
                      value={
                        recruitModel.state
                          ? recruitModel.state
                          : props.data.state
                      }
                      onChange={handleChangeState}
                      name='state'
                      id='state'
                      className={`w-full form-control  form-control-lg ${
                        errors.state && 'border-red-500'
                      }`}
                    >
                      <option value=''>Select State </option>
                      {all_States.map((state) => (
                        <option>{state.name}</option>
                      ))}
                    </select>
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='city'
                  >
                    City
                  </label>
                  {props.mode === 'view' ? (
                    <p>{props.data.city}</p>
                  ) : (
                    <select
                      // {...register('city')}
                      value={
                        recruitModel.city ? recruitModel.city : props.data.city
                      }
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
                          className={` w-full  ${
                            errors.phoneNumber && 'error_form'
                          }`}
                          dropdownClass={'custom-dropdown'}
                        />
                      )}
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
                    <select
                      onChange={handleChangeRole}
                      className={`w-full  ${
                        error.roleError ? 'border-red-400' : 'border-gray-400'
                      }`}
                    >
                      <option>Select Role</option>

                      {roles.map((business) => (
                        <option key={business._id} value={business.value}>
                          <span>{business.roleName}</span>
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.authorName && (
                    <span className='text-red-500'>This field is required</span>
                  )}
                </div>
                <div className='col-lg-4 mb-5'>
                  <label
                    className='block text-lg font-medium mb-1'
                    htmlFor='created_at'
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
                <div className='row'>
                  <div className='col-lg-4 mb-5'>
                    <label
                      className='block text-lg font-medium mb-1'
                      htmlFor='created_at'
                    >
                      Active/InActive
                    </label>
                    {props.mode === 'view' ? (
                      <p> {isActive ? 'Active' : 'InActive'}</p>
                    ) : (
                      <div className='flex items-center'>
                        <div className='form-switch'>
                          <input
                            type='checkbox'
                            id='active-toggle'
                            className='sr-only'
                            checked={isActive}
                            onChange={handleIsActive}
                          />
                          <label
                            className='bg-slate-400'
                            htmlFor='active-toggle'
                          >
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Active Culture</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {isActive ? 'Active' : 'InActive'}
                        </div>
                      </div>
                    )}
                    {errors.authorName && (
                      <span className='text-red-500'>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className='col-lg-4 mb-5'>
                    <label
                      className='block text-lg font-medium mb-1'
                      htmlFor='created_at'
                    >
                      Approved/DisApproved
                    </label>
                    {props.mode === 'view' ? (
                      <p> {approved ? 'Approved' : 'DisApproved'}</p>
                    ) : (
                      <div className='flex items-center'>
                        <div className='form-switch'>
                          <input
                            type='checkbox'
                            id='approved-toggle'
                            className='sr-only'
                            checked={approved}
                            onChange={handleApproved}
                          />
                          <label
                            className='bg-slate-400'
                            htmlFor='approved-toggle'
                          >
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Approved Culture</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {approved ? 'Approved' : 'DisApproved'}
                        </div>
                      </div>
                    )}
                    {errors.authorName && (
                      <span className='text-red-500'>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className='col-lg-4 mb-5'>
                    <label
                      className='block text-lg font-medium mb-1'
                      htmlFor='verified'
                    >
                      Verified/Non Verified
                    </label>
                    {props.mode === 'view' ? (
                      <p> {verified ? 'Verified' : 'DisVerified'}</p>
                    ) : (
                      <div className='flex items-center'>
                        <div className='form-switch'>
                          <input
                            type='checkbox'
                            id='verified-toggle'
                            className='sr-only'
                            checked={verified}
                            onChange={handleVerified}
                          />
                          <label
                            className='bg-slate-400'
                            htmlFor='verified-toggle'
                          >
                            <span
                              className='bg-white shadow-sm'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>verified Culture</span>
                          </label>
                        </div>
                        <div className='text-sm text-slate-400 italic ml-2'>
                          {verified ? 'Verified' : 'DisVerified'}
                        </div>
                      </div>
                    )}
                    {errors.authorName && (
                      <span className='text-red-500'>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
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
