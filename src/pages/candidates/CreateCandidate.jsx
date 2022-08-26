import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { surnames } from '../../utils/enum';
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
// import { GoDeviceMobile } from 'react-icons/go'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
    fullname: yup.string().required(),
    firstFname: yup.string().required(),
    secondFname: yup.string().required(),
    thirdFname: yup.string().required(),
    email: yup.string().email('Invalid email format').required(),
    reEmail: yup.string().email('Invalid email format').required(),
    industry: yup.string().required(),
    position: yup.string().required(),
    mobile: yup.string().required(),
    cv: yup.mixed()
        .test("required", "You need to provide a file", (file) => {
            // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
            if (file) return true;
            return false;
        })
    ,
    // cv: yup.mixed()
    //     .required("You need to provide a file")
    //     .test("fileSize", "File Size is too large", (value) => {
    //         return value && value[0].size <= 5242880;
    //     })
    //     .test("fileType", "Unsupported File Format", (value) =>
    //         ["image/jpeg", "image/png", "image/jpg",].includes(value.type)
    //     ),
    age: yup.string().required(),
});

const CreateCandidate = () => {
    // const token = useSelector((state) => state.userAuth.loginInfo.token);
    // let navigate = useNavigate();
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const [expiryDate, setexpiryDate] = useState({ day: dd , month: mm, year: yyyy })
    const [all_Countries , setall_Countries] = useState([])
    const [all_States, setall_States] = useState([] )
    const [all_Cities, setall_Cities] = useState([])
    const [countryCode, setCountryCode] = useState("")
    const [mobile, setmobile] = useState("")
    const [defaultCountry, setDefaultCountry] = useState("")
    const [defaultCity, setDefaultCity] = useState("")
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


    const handleMobileChange = (value) => {
        setmobile(value)
    }


    const { register, watch, setValue, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });


    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "country") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
            const updatedCities = City.getCitiesOfState( value , stateCode)
            setall_States(updatedStates)
            setall_Cities(updatedCities)
         
        }
        else if (name === "state") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
           const updatedCities = City.getCitiesOfState( value , stateCode)
            setall_Cities(updatedCities)

        }
        else {
            setrecruitModel((prevmodel) => ({
                ...prevmodel,
                [name]: value
            }))
        }
    }

    console.log("red", recruitModel)

    const onSubmit = async (data) => {
        console.log("Data", data)
        // try {
        //     const config = {
        //         headers: {
        //             'Authorization': 'Bearer ' + token
        //         }
        //     };
        //     let response = await axios.post('http://localhost:5873/jobs/createjob', config);
        //     console.log(response);
        //     if (response.data.status === "Success") {
        //         navigate("/jobs", { replace: true });
        //         toast.success(response.data.message);

        //     }
        //     else {
        //         toast.error(response.data.message);
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    }



    // ****************** Datepicker Content ***********
    const renderCustomInput = ({ ref }) => (
        < div className='relative cursor-pointe w-full'>
            <input readOnly ref={ref} // necessary  placeholder="yyy-mm-dd"
                value={expiryDate ? `${expiryDate.year}/${expiryDate.month}/${expiryDate.day}` : ''}
                className={` form-input w-full outline-blue-400 cursor-pointer z-30  px-2 py-2  border-gray-400`}
            />
            <div className={`visible absolute top-3 cursor-pointer right-5`}>   <FcCheckmark />   </div>

        </div >
    )

    useEffect(() => {
        try {
            (async () => {
                const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
                const currentCountryCode = response.data.location.country.code
                let id = response.data.location.country.tld
                let removeDot = id.replace('.', "")
                setCountryCode(removeDot)
                const get_countris =  Country.getAllCountries()
                const CurrentStates = State.getStatesOfCountry(currentCountryCode)
                const CurrentCities = City.getCitiesOfState(currentCountryCode, CurrentStates[0].isoCode)
                setrecruitModel((prevmodel) => ({
                    ...prevmodel,
                    country: currentCountryCode,
                    state: CurrentStates.length > 0 ? CurrentStates[0].isoCode : "",
                    city: CurrentCities.length > 0 ? CurrentCities[0].name : ""
                }))
                setall_Countries(get_countris)
                setall_States(CurrentStates)
                setall_Cities(CurrentCities)

            })();
        } catch (error) {
            console.log(error);
        }

    }, [])




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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row p-11'>

                    <div className='col-12 mb-6'>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Candidate</h2>
                        </header>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="fullname">Full Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.fullname ? <FcCheckmark /> : errors.fullname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <div className='text-gray-500 text-base bg-light-gray flex h-11'>
                            <div className="dropdown relative w-1/5">
                                {/* <button className=" w-full bg-white border border-r-0 h-full  border-gray-400 text-gray-400 dropdown-toggle p-2   focus:outline-blue-400 focus:ring-0 active:border-blue-400   transition duration-150 ease-in-out flex items-center whitespace-nowrap " type="button" id="surdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {surnames.find((s_name) => s_name === values.surname)}
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                    </svg>
                                </button> */}
                                <select className=" w-full h-full" {...register('surname')} id="dropdown">
                                    {surnames.map((sur, i) => {
                                        // if (values.surname !== "sur")
                                        return (
                                            <option>{sur}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='relative inline-block w-4/5 '>
                                <input name='fullname'
                                    type="text"
                                    {...register('fullname')}
                                    placeholder='Name'
                                    className={`form-input w-full h-full  ${errors.fullname ? "border-red-400" : "border-gray-400"} `}
                                />
                                {errors.fullname && (
                                    <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                                )}
                                <span hidden={watch('fullname')} className='absolute  text-red-400 font-medium text-lg top-1/4 left-[70px]'>*</span>
                                <span className={watch('fullname') ? `visible absolute top-1/4 right-3` : `invisible`}>
                                    <FcCheckmark />
                                </span>

                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="salary">First Family Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.firstFname && watch("firstFname") ? <FcCheckmark /> : errors.firstFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('firstFname')}
                            autoComplete="off"
                            className={`w-full  ${errors.firstFname ? "border-red-400" : "border-gray-400"}`}
                            name='firstFname' id="firstFname"
                            type="text"
                            placeholder="FIRST FAMILY NAME "

                        />
                        <span hidden={watch("firstFname")} className='absolute text-red-400 text-lg font-medium  top-9 left-[175px]'>*</span>

                        {errors.firstFname && (
                            <p className="text-red-500 text-sm">{errors.firstFname.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="secondFname">Second Family Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.secondFname && watch('secondFname') ? <FcCheckmark /> : errors.secondFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('secondFname')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.secondFname && 'border-red-500'}`}
                            name='secondFname' id="secondFname"
                            placeholder="2nd Family Name"

                            type="text" />
                        <span hidden={watch('secondFname')} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span>


                        {errors.secondFname && (
                            <p className="text-red-500 text-sm">{errors.secondFname.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="thirdFname">Third Family Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.thirdFname && watch('thirdFname') ? <FcCheckmark /> : errors.thirdFname ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('thirdFname')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.thirdFname && 'border-red-500'}`}
                            name='thirdFname' id="thirdFname"
                            placeholder="3rd Family Name"
                            type="text"
                        />
                        <span hidden={watch('thirdFname')} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span>

                        {errors.thirdFname && (
                            <p className="text-red-500 text-sm">{errors.thirdFname.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.email && watch('email') ? <FcCheckmark /> : errors.email ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('email')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.email && 'border-red-500'}`}
                            name='email' id="email"
                            placeholder="Email Address"
                            type="text" />
                        <span hidden={watch('email')} className='absolute text-red-400 text-lg font-medium  top-9 left-[150px]'>*</span>

                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="reEmail">Re Email </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.reEmail && watch('reEmail') ? <FcCheckmark /> : errors.reEmail ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('reEmail')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.reEmail && 'border-red-500'}`}
                            name='reEmail' id="reEmail"
                            placeholder="Re Email Address "
                            type="text" />
                        {errors.reEmail && (
                            <p className="text-red-500 text-sm">{errors.reEmail.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.country  ? <FcCheckmark /> : errors.country ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>


                        <select
                            value={recruitModel.country}
                            onChange={handleChange}
                            name="country"
                            id="country"
                            className={`form-input w-full   ${errors.country && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select Country </option>
                            {all_Countries.map((contry) => {
                                return (
                                    <option value={contry.isoCode}>{contry.name }</option>

                                )
                            })
                            }

                        </select>

                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.state ? <FcCheckmark /> : errors.state ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select
                            // {...register('state')}
                            value={recruitModel.state}
                            onChange={handleChange}
                            name="state"
                            id="state"
                            className={`form-input w-full   ${errors.state && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select State </option>
                            {all_States.map((contry) => {
                                return (
                                    <option value={contry.isoCode}>{contry.name}</option>

                                )
                            })
                            }

                        </select>
                        {/* {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state.message}</p>
                        )} */}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.city ? <FcCheckmark /> : errors.city ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select
                            // {...register('city')}
                            value={recruitModel.city}
                            onChange={handleChange}
                            name="city"
                            id="city"
                            className={`form-input w-full   ${errors.city && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select city </option>
                            {all_Cities.map((contry) => {
                                return (
                                    <option >{contry.name}</option>

                                )
                            })
                            }

                        </select>
                        {/* {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )} */}
                    </div>
                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.mobile && watch('mobile') ? <FcCheckmark /> : errors.mobile ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>

                        <div className='w-full '>
                            <Controller
                                name="mobile"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        value={value}
                                        enableSearch
                                        disableSearchIcon
                                        country={countryCode}
                                        onChange={onChange}
                                        placeholder="000 000 000"
                                        // countryCodeEditable={false}
                                        className={` w-full  ${errors.mobile && 'error_form'}`}
                                        dropdownClass={"custom-dropdown"}
                                    />
                                )}
                            />
                            {/* <PhoneInput
                                country={countryCode}
                                dropdownClass={"custom-dropdown"}
                                enableSearch
                                disableSearchIcon
                                placeholder="000 000 000"
                                countryCodeEditable={false}
                                value={mobile}
                                onChange={handleMobileChange} /> */}
                        </div>
                        {errors.mobile && (
                            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="industry">Industry </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.industry && watch('industry') ? <FcCheckmark /> : errors.industry ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('industry')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.industry && 'border-red-500'}`}
                            name='industry' id="industry"
                            placeholder="Current Industry"

                            type="text" />
                        {errors.industry && (
                            <p className="text-red-500 text-sm">{errors.industry.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="position">Position </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.position && watch('position') ? <FcCheckmark /> : errors.position ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('position')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.position && 'border-red-500'}`}
                            name='position' id="position"
                            placeholder="Position of Interest? "

                            type="text" />
                        {errors.position && (
                            <p className="text-red-500 text-sm">{errors.position.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="age">Age </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.age && watch('age') ? <FcCheckmark /> : errors.age ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input

                            autoComplete="off"
                            className={`form-input w-full  ${errors.age && 'border-red-500'}`}
                            {...register('age')}
                            name='age' id="age"
                            placeholder="Age"
                            pattern="[0-9]+"
                            type="number" />

                        {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="secondFname">Cv </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.cv && watch('cv') ? <FcCheckmark /> : errors.cv ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <Controller
                            control={control}
                            name="cv"
                            render={({ field: { onChange, onBlur, } }) => (
                                <input
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    type="file"
                                    className={`form-input w-full h-[42px]  ${errors.cv && 'border-red-500'}`}
                                    name='cv' id="cv"
                                />
                            )}
                        />
                        {/* <input
                            {...register('cv')}
                            autoComplete="off"
                            className={`form-input w-full h-[42px]  ${errors.cv && 'border-red-500'}`}
                            name='cv' id="cv"
                            type="file" /> */}

                        {errors.cv && (
                            <p className="text-red-500 text-sm">{errors.cv.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 '>
                        <label className="block text-sm font-medium mb-1 "  >Expiry Date</label>
                        <div className="relative">
                            <Controller
                                control={control}
                                name="expiryDate"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <DatePicker
                                        value={value}
                                        onChange={setexpiryDate}
                                        renderInput={renderCustomInput} // render a custom input
                                        shouldHighlightWeekends
                                    />
                                )}
                            />
                        </div>


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