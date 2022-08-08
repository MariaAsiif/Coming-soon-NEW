
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FcCheckmark } from "react-icons/fc";
import { surnames } from "../../utils/enum";
import leafLogo2 from "../../assets/images/Logo-leaf-Top-red-V2.png"
import usFlaglogo from "../../assets/images/usflag_logo_v2.png"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from 'country-state-city';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import { AiFillCalendar } from "react-icons/ai";
const RecForm = () => {

    const [mobile, setmobile] = useState("")
    const [dob, setdob] = useState(new Date())
    const [all_Countries] = useState(() => Country.getAllCountries())
    const [all_States, setall_States] = useState(() => State.getStatesOfCountry("AF"))
    const [all_Cities, setall_Cities] = useState(() => City.getCitiesOfState("AF", "BDS"))
    const [dateob, setdateob] = useState(null)
    const [activeIndex, setActiveIndex] = useState(null)
    const [uploadFiles, setuploadFiles] = useState([])
    const [selectedDay, setSelectedDay] = useState(null);



    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),

    });


    // =============== Three Dots function ============

    let stateName = ""
    let cityName = ""

    let checkData = ""

    const handlePlaces = () => { }


    function add3Dots(string, limit) {
        var dots = "...";
        if (string && string > limit) {
            // you can also use substr instead of substring
            string = string.substring(0, limit) + dots;
        }
    }

    const renderCustomInput = ({ ref }) => (
        < div className='relative cursor-pointer'>
            <input
                readOnly
                ref={ref} // necessary
                placeholder="yyy-mm-dd"
                value={dateob ? `${dateob.year}/${dateob.month}/${dateob.day}` : ''}
            // className={`date_picker w-full outline-blue-400 cursor-pointer z-30  border-2 px-2 py-2 ${validationModel.dateob ? "border-red-400" : "border-gray-400"}`}
            // a styling class
            />
            {/* <div className={.email ? `visible absolute top-3 cursor-pointer right-5` : `visible absolute top-3 cursor-pointer right-5`}>
            {dateob ?
              <FcCheckmark />
              :
              <AiFillCalendar />
            }
          </div> */}

        </div >
    )


    const handleSubmit = (
        { email, password, acceptTOS },
        { setFieldError }
    ) => {
        console.log("Success! Call the API Now!");
        setTimeout(() => {
            setFieldError("email", "This email is already taken");
        }, 1000);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    firstFname: '',
                    secondFname: '',
                    email: '',
                    reEmail: '',
                    thirdFname: '',
                    mobile: '',
                    country: '',
                    city: '',
                    state: '',
                    position: '',
                    industry: '',
                    age: '',
                    dateob: '',
                }}
                onSubmit={(values, errors) => {
                    handleSubmit(values, errors);
                }}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                }) => {
                    console.log("tuched", values)
                    return (
                        <form onSubmit={handleSubmit}>
                            <section className='bscontainer-fluid'>
                                <section className='row' >
                                    <div style={{ backgroundColor: "#ffffffad" }} className='col-12 bg-hero-pattern bg-center bg-no-repeat     bg-cover bg-blend-lighten '  >
                                        <div className='lg:my-10 my-5 lg:px-28 md:px-5 px-6'>
                                            <div className='row  justify-center items-center'>
                                                <div className='col-4'>
                                                    <figure>
                                                        <img src={leafLogo2} className="md:w-16 w-11 " alt="leafLogo" />
                                                        <figcaption className='text-left md:-ml-6 -ml-3 mt-1 text-xs text-red-600 font-semibold '>
                                                            {/* CULTIVATED WELLNESS */}
                                                            Cultivated Wellness
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div className='col-4 text-center lg:text-6xl md:text-6xl text-3xl font-medium flex items-center justify-center'>
                                                    <p>RECRUIT</p>
                                                </div>
                                                <div className='col-4 '>
                                                    <figure className='flex flex-col justify-center  '>
                                                        <img src={usFlaglogo} className=" ml-auto  md:w-16 w-11 " alt="leafLogo" />
                                                        <figcaption className='caption justify-center md:mr-1 mx-5 relative mt-1 text-xs text-red-600 font-semibold  '>
                                                            <div className="flex justify-center">
                                                                Language
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                                </svg>
                                                            </div>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row justify-center md:gap-2 gap-4 mb-4 g-0 '>
                                            <div className='col-lg-3 col-md-10'>
                                                <div className='text-gray-500 text-base font-medium bg-light-gray flex h-11'>
                                                    <div className="dropdown relative w-1/5">
                                                        <button className=" w-full bg-white border-2 border-r-0 h-full  border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="surdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {surnames.find((s_name) => s_name === values.surname)}
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                            </svg>
                                                        </button>
                                                        <ul className=" dropdown-menu absolute w-full  max-h-52 overflow-y-auto overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="surdropdown">
                                                            {surnames.map((sur, i) => {
                                                                return (
                                                                    <li key={i} >
                                                                        <span className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{sur}</span>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className='relative inline-block w-4/5 '>
                                                        <input name='fullname' value={values.fullname} onChange={handleChange} type="text" placeholder='Name ' className={`w-full h-full p-2 bg-white  outline-blue-400 border-2 ${errors.fullnameError ? "border-red-400" : "border-gray-400"} `} />
                                                        <span hidden={values.fullname} className='absolute  text-red-400 font-medium text-lg top-1/4 left-16'>*</span>
                                                        <span className={values.fullname ? `visible absolute top-1/4 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.fullname}
                                            </div>
                                            <div className='col-lg-3 col-md-10'>
                                                <div className='relative'>
                                                    <input name='firstFname' value={values.firstFname} onChange={handleChange} type="text" placeholder='1st Family Name' className={`w-full outline-blue-400 border-2 p-2 ${errors.firstFnameError ? "border-red-400" : "border-gray-400"}`} />
                                                    {values.firstFname ?
                                                        <p className={values.firstFname ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.firstFname} className='absolute text-red-400 font-medium text-lg top-1/4 left-36'>*</span>
                                                    }
                                                </div>
                                                {errors.firstFname}
                                            </div>
                                        </div>
                                        <div className='row justify-center  md:gap-2 gap-4 mb-4 g-0 w-full flex-col-reverse lg:flex-row md:items-center  md:flex-col-reverse sm:flex-col-reverse '>
                                            <div className='col-lg-3 col-md-10 email_hide'>
                                                <div className='relative'>
                                                    <input name='email' value={values.email} onChange={handleChange} type="email" placeholder='Email Address' className={`w-full outline-blue-400 border-2 p-2 ${errors.emailError ? "border-red-400" : "border-gray-400"}`} />
                                                    {values.email && !errors.email ?
                                                        <p className={values.email ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.email} className='absolute text-red-400 font-medium text-lg top-1/4 left-32'>*</span>
                                                    }
                                                </div>
                                                {touched.email && errors.email}
                                            </div>
                                            <div className='col-lg-3 col-md-10 relative thirdname_show'>
                                                <div className='relative'>
                                                    <input name='thirdFname' value={values.thirdFname} onChange={handleChange} type="email" placeholder='3rd Family Name ' className={`w-full outline-blue-400 border-2 p-2 border-gray-400`} />
                                                    {values.thirdFname ?
                                                        <p className={values.thirdFname ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.thirdFname} className='absolute text-red-400 font-medium text-lg top-1/4 left-32'>*</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-10 '>
                                                <div className='relative'>
                                                    <input name='secondFname' value={values.secondFname} onChange={handleChange} type="text" placeholder='2nd Family Name ' className={`w-full outline-blue-400 border-2 p-2 border-gray-400`} />
                                                    {values.secondFname ?
                                                        <p className={values.secondFname ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.secondFname} className='absolute text-red-400 font-medium text-lg top-1/4 left-40'>*</span>
                                                    }
                                                </div>
                                            </div>


                                        </div>

                                        <div className='row justify-center md:gap-2 gap-4 mb-4 g-0 flex-col-reverse lg:flex-row md:items-center  md:flex-col-reverse sm:flex-col-reverse   '>
                                            <div className='col-lg-3 col-md-10 relative '>
                                                <div className='relative'>
                                                    <input name='reEmail' value={values.reEmail} onChange={handleChange} type="email" placeholder='Re Enter Email Address' className={`w-full outline-blue-400 border-2 p-2 ${errors.reEmailError || errors.sameEmailError ? "border-red-400" : "border-gray-400"}`} />
                                                    {values.reEmail ?
                                                        <p className={values.reEmail ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.reEmail} className='absolute text-red-400 font-medium text-lg top-1/4 left-48'>*</span>
                                                    }
                                                </div>
                                                {errors.reEmail}
                                            </div>
                                            <div className='col-lg-3 col-md-10 relative thirdname_hide'>
                                                <div className='relative'>
                                                    <input name='thirdFname' value={values.thirdFname} onChange={handleChange} type="email" placeholder='3rd Family Name ' className={`w-full outline-blue-400 border-2 p-2 border-gray-400`} />
                                                    {values.thirdFname ?
                                                        <p className={values.thirdFname ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.thirdFname} className='absolute text-red-400 font-medium text-lg top-1/4 left-40'>*</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-10 email_show'>
                                                <div className='relative'>
                                                    <input name='email' value={values.email} onChange={handleChange} type="email" placeholder='Email Address' className={`w-full outline-blue-400 border-2 p-2 ${errors.emailError ? "border-red-400" : "border-gray-400"}`} />
                                                    {values.email ?
                                                        <p className={values.email ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                            <FcCheckmark />
                                                        </p>
                                                        :
                                                        <span hidden={values.email} className='absolute text-red-400 font-medium text-lg top-1/4 left-32'>*</span>
                                                    }
                                                </div>
                                                {errors.email}
                                            </div>
                                        </div>
                                        <div className='row justify-center md:gap-2 gap-4 mb-4 g-0  '>
                                            <div className={`col-lg-3 col-md-10 relative`} >
                                                <div className='absolute top-0  left-[42px]   w-[2px] h-[40px] bg-gray-400 z-[1]'></div>
                                                {
                                                    !values.mobile && (<div className='absolute flex items-center top-[3px]  left-[48px]   w-[122px] h-[32px] bg-white z-[1]'><div>000 00 00 00</div></div>)
                                                }

                                                <PhoneInput
                                                    country={'es'}
                                                    dropdownClass={"custom-dropdown"}
                                                    enableSearch
                                                    disableSearchIcon
                                                    countryCodeEditable={false}
                                                    value={mobile}
                                                    placeholder="*** ** ** **"
                                                // onChange={handleMobileChange} 
                                                />

                                                {errors.mobile}


                                            </div>
                                            <div className='col-lg-3 col-md-10'>
                                                <div className="dropdown relative">
                                                    <button className=" w-full bg-white border-2 border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="citydropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {all_Countries.find((city) => city.isoCode === values.country)?.name}
                                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                            <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                        </svg>
                                                        {values.country ? <span className={values.reEmail ? `visible absolute top-1/4 border-1 right-8` : `visible`}>
                                                            <FcCheckmark />
                                                        </span>
                                                            : null}
                                                    </button>
                                                    <ul className=" dropdown-menu   absolute w-full  max-h-52 overflow-y-scroll overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="citydropdown">
                                                        {all_Countries.map((city) => {
                                                            return (
                                                                <li key={city.name}>
                                                                    <span className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{city.name}</span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='row justify-center md:gap-2 gap-4 mb-4 g-0   '>
                                            <div className='col-lg-3 col-md-10 relative  '>
                                                <input name='industry' value={values.industry} onChange={handleChange} type="text" placeholder='Current Industry' className="w-full outline-blue-400 border-2 px-2 py-2 border-gray-400" />
                                                {values.industry ?
                                                    <p className={values.industry ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                        <FcCheckmark />
                                                    </p>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className='col-lg-3 col-md-10 city_group_hide '>
                                                <div className='row g-1'>
                                                    <div className='col-6'>
                                                        <div className="dropdown relative">
                                                            <button className=" w-full bg-white border-2 border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="statedropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {add3Dots(stateName, 10)}
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                                </svg>
                                                                {values.state !== "" ? <span className={values.state ? `visible absolute top-1/4 border-1 right-8` : `invisible`}>
                                                                    <FcCheckmark />
                                                                </span>
                                                                    : null}

                                                            </button>
                                                            <ul className=" dropdown-menu   absolute w-full  max-h-52 overflow-y-scroll overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="statedropdown">
                                                                {all_States.map((state) => {
                                                                    return (
                                                                        <li key={state.isoCode}>
                                                                            <span className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{state.name}</span>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className="dropdown relative">
                                                            <button className=" w-full bg-white border-2 border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="citydropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {add3Dots(cityName, 10)}
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                                </svg>
                                                                {values.city !== "" ? <span className={values.city ? `visible absolute top-1/4 border-1 right-8 md:right-9` : `visible`}>
                                                                    <FcCheckmark />
                                                                </span>
                                                                    : null}

                                                            </button>
                                                            <ul className=" dropdown-menu   absolute w-full  max-h-52 overflow-y-scroll overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="citydropdown">
                                                                {all_Cities.map((city) => {
                                                                    return (
                                                                        <li key={city.name}>
                                                                            <span onClick={() => handlePlaces(city.name, "city")} className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{city.name}</span>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-10 postion_show '>
                                                <input name='position' value={values.position} onChange={handleChange} type="text" placeholder='Position of Interest?' className="w-full outline-blue-400 border-2 px-2 py-2 border-gray-400 " />
                                                {values.position ?
                                                    <p className={values.position ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                        <FcCheckmark />
                                                    </p>
                                                    :
                                                    null
                                                }
                                            </div>

                                        </div>

                                        <div className='row justify-center md:gap-2 gap-4 mb-4 g-0  '>
                                            <div className='col-lg-3 col-md-10 position_hide relative'>
                                                <input name='position' value={values.position} onChange={handleChange} type="text" placeholder='Position of Interest?' className="w-full outline-blue-400 border-2 px-2 py-2 border-gray-400 " />
                                                {values.position ?
                                                    <p className={values.position ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                        <FcCheckmark />
                                                    </p>
                                                    :
                                                    null
                                                    // <span hidden={values.position} className='absolute text-red-400 font-medium text-lg top-1/4 left-32'>*</span>

                                                }
                                            </div>
                                            <div className='col-lg-3 col-md-10 city_group_show '>
                                                <div className='row g-1'>
                                                    <div className='col-6'>
                                                        <div className="dropdown relative">
                                                            <button className=" w-full bg-white border-2 border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="statedropdown" data-bs-toggle="dropdown" aria-expanded="false">

                                                                {add3Dots(stateName, 10)}
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                                </svg>
                                                                <span className={values.state ? `visible absolute top-1/4 border-1 right-0` : `invisible`}>
                                                                    <FcCheckmark />
                                                                </span>
                                                            </button>
                                                            <ul className=" dropdown-menu   absolute w-full  max-h-52 overflow-y-scroll overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="statedropdown">
                                                                {all_States.map((state) => {
                                                                    return (
                                                                        <li key={state.isoCode}>
                                                                            <span onClick={() => handlePlaces(state.isoCode, "state")} className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{state.name}</span>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className="dropdown relative ">
                                                            <button className=" w-full bg-white border-2 border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="citydropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {add3Dots(cityName, 10)}
                                                                {values.city !== "" ?
                                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                                    </svg>
                                                                    :
                                                                    <span className={values.city ? `visible absolute top-1/4 border-1 right-8` : `invisible`}>
                                                                        <FcCheckmark />
                                                                    </span>
                                                                }

                                                            </button>
                                                            <ul className=" dropdown-menu   absolute w-full  max-h-52 overflow-y-scroll overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="citydropdown">
                                                                {all_Cities.map((city) => {
                                                                    return (
                                                                        <li key={city.name}>
                                                                            <span onClick={() => handlePlaces(city.name, "city")} className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{city.name}</span>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-10  '>
                                                <div className='row g-1'>
                                                    <div className='col-6'>
                                                        <div className='relative'>
                                                            <input name='age' value={values.age} onChange={handleChange} type="number" placeholder='Age ' className={`w-full outline-blue-400 border-2 px-2 py-2 ${errors.ageError ? "border-red-400" : "border-gray-400"}`} />
                                                            {values.position ?
                                                                <p className={values.position ? `visible absolute bottom-1/3 right-3` : `invisible`}>
                                                                    <FcCheckmark />
                                                                </p>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                        {errors.age}
                                                    </div>
                                                    <div className='col-6'>

                                                        <DatePicker
                                                            value={dateob}
                                                            onChange={setdateob}
                                                            renderInput={renderCustomInput} // render a custom input
                                                            shouldHighlightWeekends
                                                        />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row justify-center gap-2 mb-8 g-0 '>
                                            <div className='col-lg-6 col-md-10'>
                                                <p className='text-lg text-red-600 mb-4  '><sup className='text-red-600 font-bold'>*</sup>Mandatory</p>
                                                <button onClick={handleSubmit} className={`text-white ${checkData ? `bg-green-600` : `bg-gray-900`} w-full px-2 py-1 text-3xl font-medium tracking-wide`}>SUBMIT</button>
                                            </div>

                                        </div>
                                    </div>

                                </section>
                            </section>


                        </form>
                    );
                }}
            </Formik>
        </div >
    );
};

export default RecForm;