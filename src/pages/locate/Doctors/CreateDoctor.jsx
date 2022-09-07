import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { callApi } from '../../../utils/CallApi';
import { Link } from 'react-router-dom';
const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email('Invalid email format').required(),
    zipcode: yup.string().required(),
    website: yup.string().required(),
    mobile: yup.string().required(),
    address: yup.string().required(),
});
const CreateDoctor = () => {

    const [all_Countries, setall_Countries] = useState([])
    const [all_States, setall_States] = useState([])
    const [all_Cities, setall_Cities] = useState([])
    const [countryCode, setCountryCode] = useState("")
    const [recruitModel, setrecruitModel] = useState({
        city: "",
        state: "",
        country: "",
    })
    const [file, setFile] = useState('')


    const handleChangeCountry = (e) => {
        let { value } = e.target
        const updatedStates = State.getStatesOfCountry(value)
        setall_States(updatedStates)
        setrecruitModel((prevmodel) => ({
            ...prevmodel,
            country: value,

        }))



    }


    const handleState = (e) => {
        let { value } = e.target
        const updatedCities = City.getCitiesOfState(recruitModel.country, value)
        setrecruitModel((prevmodel) => ({
            ...prevmodel,
            state: value,

        }))
        setall_Cities(updatedCities)

    }


    const handleChange = (e) => {
        let { name, value } = e.target
        setrecruitModel((prevmodel) => ({
            ...prevmodel,
            [name]: value
        }))
    }




    const { register, watch, control, reset, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });



    const onSubmit = async (data) => {
        try {
            let payload = {
              title: data.title,
              content: data.content,
              gender: data.gender,
              category: "Doctors",
              contactNo: data.mobile,
              address: data.address,
              state: recruitModel.state,
              zip: data.zipcode,
              email: data.email,
              website: data.website,
              facebook:data.facebook,
              twitter: data.twitter,
              instagram: data.instagram,
              linkedin: data.linkedIn,
              isIndividual: true,
              serviceCountry: recruitModel.country,
              serviceCity: recruitModel.city,
              serviceLocation: {
                    "type": "Point",
                    "coordinates": [
                        -2.681792,
                        42.859165
                    ]
                }
            }

            const res = await callApi("/locateservices/createService", "post", payload)
            console.log("Res" , res )
            reset()

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        try {
            (async () => {
                const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
                const currentCountryCode = response.data.location.country.code
                let id = response.data.location.country.tld
                let removeDot = id.replace('.', "")
                setCountryCode(removeDot)
                const get_countris = Country.getAllCountries()
                const updatedStates = State.getStatesOfCountry(currentCountryCode)
                setall_States(updatedStates)
                setrecruitModel((prevmodel) => ({
                    ...prevmodel,
                    country: currentCountryCode,

                }))
                setall_Countries(get_countris)


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

                    <div className='col-12  mb-5'>
                        <div className='mb-3'>
                            <ul className="inline-flex flex-wrap text-sm font-medium">
                                <li className="flex items-center">
                                    <Link to="/dashboard" className="text-slate-500 hover:text-indigo-500" >Dashboard </Link>
                                    <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/locate/doctor" className="text-slate-500 hover:text-indigo-500" href="#0">Doctors</Link>
                                    <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <div className="text-slate-500 hover:text-indigo-500" >Add New Doctor</div>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='col-12 mb-6'>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Doctor</h2>
                        </header>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Title </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('title') ? <FcCheckmark /> : errors.title ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <div className='text-gray-500 text-base bg-light-gray  h-11'>
                            <input name='title'
                                type="text"
                                {...register('title')}
                                placeholder='Title'
                                className={`form-input w-full h-full  ${errors.title ? "border-red-400" : "border-gray-400"} `}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                            <span hidden={watch('title')} className='absolute  text-red-400 font-medium text-lg top-[36px] left-[60px]'>*</span>
                            {/* <span className={watch('title') ? `visible absolute top-1/4 right-3` : `invisible`}>
            <FcCheckmark />
        </span> */}

                        </div>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="salary">Content</label>
                        <div className='absolute right-5 top-10'>
                            {!errors.content && watch("content") ? <FcCheckmark /> : errors.content ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('content')}
                            autoComplete="off"
                            className={`w-full  ${errors.content ? "border-red-400" : "border-gray-400"}`}
                            name='content' id="content"
                            type="text"
                            placeholder="Content"

                        />
                        <span hidden={watch("content")} className='absolute text-red-400 text-lg font-medium  top-9 left-[95px]'>*</span>

                        {errors.content && (
                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>

                        <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.gender && watch("gender") ? <FcCheckmark className='mr-5' /> : errors.gender ? <div className=' text-red-500'><MdClose className='mr-5' /></div> : null}
                        </div>
                        <select
                         
                            {...register('gender')}
                            name="gender"
                            id="gender"
                            className={`form-input w-full   ${errors.gender && 'border-red-500'}`}
                        >
                            <option value="">Select Gender </option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>


                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender.message}</p>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.country ? <FcCheckmark /> : errors.country ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>


                        <select
                            value={recruitModel.country}
                            onChange={handleChangeCountry}
                            name="country"
                            id="country"
                            className={`form-input w-full   ${errors.country && 'border-red-500'}`}
                        >
                            <option value="">Select Country </option>
                            {all_Countries.map((contry) => {
                                return (
                                    <option value={contry.isoCode}>{contry.name}</option>

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
                            onChange={handleState}
                            name="state"
                            id="state"
                            className={`form-input w-full   ${errors.state && 'border-red-500'}`}
                        >
                            <option value="">Select State </option>
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
                            <option value="">Select city </option>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="zipcode">ZipCode</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.zipcode && watch('zipcode') ? <FcCheckmark /> : errors.zipcode ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('zipcode')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.zipcode && 'border-red-500'}`}
                            name='zipcode' id="zipcode"
                            placeholder="Zipcode"

                            type="text" />
                        {errors.zipcode && (
                            <p className="text-red-500 text-sm">{errors.zipcode.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="website">Website </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.website && watch('website') ? <FcCheckmark /> : errors.website ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('website')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.website && 'border-red-500'}`}
                            name='website' id="website"
                            placeholder="website"

                            type="text" />
                        {errors.website && (
                            <p className="text-red-500 text-sm">{errors.website.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="facebook">Facebook </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.facebook && watch('facebook') ? <FcCheckmark /> : errors.facebook ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('facebook')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.facebook && 'border-red-500'}`}
                            name='facebook' id="facebook"
                            placeholder="Facebook"

                            type="text" />
                        {errors.facebook && (
                            <p className="text-red-500 text-sm">{errors.facebook.message}</p>
                        )}
                    </div>
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="twitter">Twitter </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.twitter && watch('twitter') ? <FcCheckmark /> : errors.twitter ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('twitter')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.twitter && 'border-red-500'}`}
                            name='twitter' id="twitter"
                            placeholder="Twitter"

                            type="text" />
                        {errors.twitter && (
                            <p className="text-red-500 text-sm">{errors.twitter.message}</p>
                        )}
                    </div>
                    <div className='col-lg-6 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="instagram">Instagram </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.instagram && watch('instagram') ? <FcCheckmark /> : errors.instagram ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('instagram')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.instagram && 'border-red-500'}`}
                            name='instagram' id="instagram"
                            placeholder="instagram"

                            type="text" />

                    </div>
                    <div className='col-lg-6 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="linkedIn">LinkedIn </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.linkedIn && watch('linkedIn') ? <FcCheckmark /> : errors.linkedIn ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('linkedIn')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.linkedIn && 'border-red-500'}`}
                            name='linkedIn' id="linkedIn"
                            placeholder="LinkedIn"

                            type="text" />

                    </div>
                    <div className='col-lg-6 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="address"> Permanet Address </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.address && watch('address') ? <FcCheckmark /> : errors.address ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input

                            autoComplete="off"
                            className={`form-input w-full  ${errors.address && 'border-red-500'}`}
                            {...register('address')}
                            name='address' id="address"
                            placeholder="Permanent Address "
                            type="text"
                        // pattern="[0-9]+"
                        // type="number"
                        />

                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    <div className='col-lg-6 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="image"> Image </label>

                        <input
                            className={`form-input w-full h-[42px]`}
                            onChange={(e) => setFile(e.target.files[0])}
                            name='image' id="image"
                            type="file"
                        />


                    </div>


                    <div className='col-lg-12'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" type="submit" >Submit</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateDoctor