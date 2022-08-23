import React, { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { validateCandidate, validateJob } from '../../helpers/validation';
import { useFormJob, useFormCandidate } from '../../helpers/useForm';
import { surnames } from '../../utils/enum';
import { FcCheckmark } from 'react-icons/fc'
import { MdClose, MdOutlineClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
import { GoDeviceMobile } from 'react-icons/go'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';


const CreateCandidate = () => {
    const token = useSelector((state) => state.userAuth.loginInfo.token);
    let navigate = useNavigate();
    const [all_Countries] = useState(() => Country.getAllCountries())
    const [all_States, setall_States] = useState(() => State.getStatesOfCountry("AF"))
    const [all_Cities, setall_Cities] = useState(() => City.getCitiesOfState("AF", "BDS"))
    const [countryCode, setCountryCode] = useState("")
    const [mobile, setmobile] = useState("")
    const [defaultCountry, setDefaultCountry] = useState("")
    const [defaultCity, setDefaultCity] = useState("")
    const [expiryDate, setexpiryDate] = useState({ day: 10, month: 8, year: 2022 })
    const [recruitModel, setrecruitModel] = useState({
        surname: "Mr",
        fullname: "",
        firstFname: "",
        secondFname: "",
        thirdFname: "",
        email: "",
        reEmail: "",
        city: "",
        state: "",
        industry: "",
        country: "",
        // postcode:"",
        position: "",
        mobile: "",
        age: "",
    })


    // const handlePlaces = (iso_Code, name) => {
    //     localStorage.setItem(name, iso_Code);
    //     let updatedCities = []
    //     let cityName = ""
    //     if (name === "country") {
    //         console.log(iso_Code);
    //         const updatedStates = State.getStatesOfCountry(iso_Code)
    //         const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
    //         updatedCities = City.getCitiesOfState(iso_Code, stateCode)
    //         cityName = updatedCities.length > 0 ? updatedCities[0].name : ""
    //         setall_States(updatedStates)
    //         setall_Cities(updatedCities)
    //         setrecruitModel((prevmodel) => ({
    //             ...prevmodel,
    //             state: stateCode,
    //             city: cityName
    //         }))
    //     }
    //     else if (name === "state") {
    //         updatedCities = City.getCitiesOfState(recruitModel.country, iso_Code)
    //         cityName = updatedCities.length > 0 ? updatedCities[0].name : ""
    //         setall_Cities(updatedCities)
    //         setrecruitModel((prevmodel) => ({
    //             ...prevmodel,
    //             city: cityName
    //         }))
    //     }
    //     setrecruitModel((prevmodel) => ({
    //         ...prevmodel,
    //         [name]: iso_Code
    //     }))
    // }

    // ================ check Name ========




    const handleMobileChange = (value) => {
        setmobile(value)
    }


    const handleSaveJob = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            let response = await axios.post('http://localhost:5873/jobs/createjob', values, config);
            console.log(response);
            if (response.data.status === "Success") {
                navigate("/jobs", { replace: true });
                toast.success(response.data.message);

            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }


    // ****************** Flatpicker Content ***********
    const options = {

        static: true,
        monthSelectorType: 'static',
        enableTime: false,
        dateFormat: 'M j, Y',
        defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',

    }


    // ****************** Datepicker Content ***********
    const renderCustomInput = ({ ref }) => (
        < div className='relative cursor-pointer'>
            <input readOnly ref={ref} // necessary  placeholder="yyy-mm-dd"
                value={expiryDate ? `${expiryDate.year}/${expiryDate.month}/${expiryDate.day}` : ''}
                className={`date_picker w-full outline-blue-400 cursor-pointer z-30  border-2 px-2 py-2  border-gray-400`}
            />
            <div className={`visible absolute top-3 cursor-pointer right-5`}>   <FcCheckmark />   </div>

        </div >
    )

    useEffect(() => {
        console.log("useEffect 1 run");
        try {
            (async () => {
                const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
                const currentCountryCode = response.data.location.country.code
                let id = response.data.location.country.tld
                let removeDot = id.replace('.', "")
                setCountryCode(removeDot)
                const CurrentStates = State.getStatesOfCountry(currentCountryCode)
                const CurrentCities = City.getCitiesOfState(currentCountryCode, CurrentStates[0].isoCode)
                setall_States(CurrentStates)
                setall_Cities(CurrentCities)

            })();
        } catch (error) {
            console.log(error);
        }

    }, [])




    //   usefORM HOOKS
    const {
        values,
        errors,
        handleChange,
        handleExpiryDateChange,
        handleSubmit,
    } = useFormCandidate(handleSaveJob, validateCandidate);


    console.log("valus", values)

    return (
        <div className='bscontainer-fluid'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form onSubmit={handleSubmit} noValidate>
                <div className='row p-11'>

                    <div className='col-12 mb-6'>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Candidate</h2>
                        </header>
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="fullname">Full Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.fullname && values.fullname ? <FcCheckmark /> : errors.fullname || values.fullname < 0 ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <div className='text-gray-500 text-base font-medium bg-light-gray flex h-11'>
                            <div className="dropdown relative w-1/5">
                                <button className=" w-full bg-white border border-r-0 h-full  border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="surdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {surnames.find((s_name) => s_name === values.surname)}
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                    </svg>
                                </button>
                                <ul className=" dropdown-menu absolute w-full  max-h-52 overflow-y-auto overflow-x-hidden bg-white text-base z-100 float-left py-2 list-none text-left shadow-lg mt-1 hidden m-0 bg-clip-padding border-none " aria-labelledby="surdropdown">
                                    {surnames.map((sur, i) => {
                                        if (values.surname !== "sur")
                                            return (
                                                <li key={i} >
                                                    <span className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "  >{sur}</span>
                                                </li>
                                            )
                                    })}
                                </ul>
                            </div>
                            <div className='relative inline-block w-4/5 '>
                                <input name='fullname'
                                    value={values.fullname}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder='Name '
                                    // className={`form-input w-full h-full ${errors.fullname && 'border-red-500'}`}

                                    className={`w-full h-full  ${errors.fullname ? "border-red-400" : "border-gray-400"} `}
                                />
                                <span hidden={values.fullname.length} className='absolute  text-red-400 font-medium text-lg top-1/4 left-[70px]'>*</span>
                                <span className={values.fullname.length ? `visible absolute top-1/4 right-3` : `invisible`}>
                                    <FcCheckmark />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="salary">First Family Name </label>
                        {/* <small>suggestion: US$ 150,000 / Anum</small> */}
                        <div className='absolute right-5 top-10'>
                            {!errors.firstFname && values.firstFname ? <FcCheckmark /> : errors.firstFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`w-full  ${errors.firstFname ? "border-red-400" : "border-gray-400"}`}
                            value={values.firstFname || ''}
                            name='firstFname' id="firstFname"
                            // className="form-input w-full"
                            type="text"
                            placeholder="FIRST FAMILY NAME "

                        />
                        <span hidden={values?.firstFname.length} className='absolute text-red-400 text-lg font-medium  top-9 left-[175px]'>*</span>

                        {errors.firstFname && (
                            <p className="text-red-500 text-sm">{errors.firstFname}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="secondFname">Second Family Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.secondFname && values.secondFname ? <FcCheckmark /> : errors.secondFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.secondFname && 'border-red-500'}`}
                            value={values.secondFname || ''}
                            name='secondFname' id="secondFname"
                            // className="form-input w-full"
                            placeholder="2nd Family Name "

                            type="text" />
                        <span hidden={values?.secondFname.length} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span>


                        {errors.secondFname && (
                            <p className="text-red-500 text-sm">{errors.secondFname}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="thirdFname">Third Family Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.thirdFname && values.thirdFname ? <FcCheckmark /> : errors.thirdFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.thirdFname && 'border-red-500'}`}
                            value={values.thirdFname || ''}
                            name='thirdFname' id="thirdFname"
                            // className="form-input w-full"
                            placeholder="3rd Family Name"

                            type="text" />
                        <span hidden={values?.thirdFname.length} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span>

                        {errors.employer && (
                            <p className="text-red-500 text-sm">{errors.employer}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.email && values.email ? <FcCheckmark /> : errors.email ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.email && 'border-red-500'}`}
                            value={values.email || ''}
                            name='email' id="email"
                            // className="form-input w-full"
                            placeholder="Email Address"

                            type="text" />
                        <span hidden={values?.email.length} className='absolute text-red-400 text-lg font-medium  top-9 left-[150px]'>*</span>

                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="Remail">Re Email </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.Remail && values.Remail ? <FcCheckmark /> : errors.Remail ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.Remail && 'border-red-500'}`}
                            value={values.Remail || ''}
                            name='Remail' id="Remail"
                            // className="form-input w-full"
                            placeholder="Re Email Address "

                            type="text" />
                        {errors.jobstatus && (
                            <p className="text-red-500 text-sm">{errors.jobstatus}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.country && values.country ? <FcCheckmark /> : errors.country ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select
                            onChange={handleChange}
                            value={values.country}
                            name="country"
                            id="country"
                            className={`form-input w-full   ${errors.country && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select Country </option>
                            {all_Countries.map((contry) => {
                                return (
                                    <option>{contry.name}</option>

                                )
                            })
                            }

                        </select>
                        {errors.country && (
                            <p className="text-red-500 text-sm">{errors.country}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.state && values.state ? <FcCheckmark /> : errors.state ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select
                            onChange={handleChange}
                            value={values.state}
                            name="state"
                            id="state"
                            className={`form-input w-full   ${errors.state && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select State </option>
                            {all_States.map((contry) => {
                                return (
                                    <option>{contry.name}</option>

                                )
                            })
                            }

                        </select>
                        {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.city && values.city ? <FcCheckmark /> : errors.city ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select
                            onChange={handleChange}
                            value={values.city}
                            name="city"
                            id="city"
                            className={`form-input w-full   ${errors.city && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select city </option>
                            {all_Cities.map((contry) => {
                                return (
                                    <option>{contry.name}</option>

                                )
                            })
                            }

                        </select>
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.phone && values.phone ? <FcCheckmark /> : errors.phone ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>

                        {
                            !mobile || countryCode &&
                            <div className='flags absolute flex items-center top-[6px]  left-[8px] z-[1]  w-[122px] h-[32px] '><div>
                                <GoDeviceMobile />
                            </div></div>
                        }
                        <div className='w-full '>
                            <PhoneInput
                                country={countryCode}
                                dropdownClass={"custom-dropdown"}
                                enableSearch
                                disableSearchIcon
                                placeholder="000 000 000"
                                countryCodeEditable={false}
                                value={mobile}
                                onChange={handleMobileChange} />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="industry">Industry </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.industry && values.industry ? <FcCheckmark /> : errors.industry ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.industry && 'border-red-500'}`}
                            value={values.industry || ''}
                            name='industry' id="industry"
                            // className="form-input w-full"
                            placeholder="Current Industry"

                            type="text" />
                        {errors.jobstatus && (
                            <p className="text-red-500 text-sm">{errors.jobstatus}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="position">Position </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.position && values.position ? <FcCheckmark /> : errors.position ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.position && 'border-red-500'}`}
                            value={values.position || ''}
                            name='position' id="position"
                            // className="form-input w-full"
                            placeholder="Position of Interest? "

                            type="text" />
                        {errors.jobstatus && (
                            <p className="text-red-500 text-sm">{errors.jobstatus}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="age">Age </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.age && values.age ? <FcCheckmark /> : errors.age ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.age && 'border-red-500'}`}
                            value={values.age || ''}
                            name='age' id="age"
                            // className="form-input w-full"
                            placeholder="Age"
                            pattern="[0-9]+"
                            type="number" />

                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="secondFname">Cv </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.cv && values.cv ? <FcCheckmark /> : errors.cv ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            className={`form-input w-full h-[42px]  ${errors.cv && 'border-red-500'}`}
                            value={values.cv || ''}
                            name='cv' id="cv"
                            // className="form-input w-full"
                            placeholder="2nd Family Name "

                            type="file" />

                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 '>
                        <label className="block text-sm font-medium mb-1 "  >Expiry Date</label>
                        <div className="relative">

                            <DatePicker
                                value={expiryDate}
                                onChange={setexpiryDate}
                                renderInput={renderCustomInput} // render a custom input
                                shouldHighlightWeekends
                            />
                        </div>
                        {errors.expiryDate && (
                            <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                        )}
                    </div>
                    <div className='col-lg-12'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateCandidate