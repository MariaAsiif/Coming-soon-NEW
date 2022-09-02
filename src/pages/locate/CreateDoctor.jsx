import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from 'country-state-city';
import axios from 'axios'


const CreateDoctor = () => {
    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange' });
    const [countryCode, setCountryCode] = useState("")
    const [all_Countries, setall_Countries] = useState([])
    const [all_States, setall_States] = useState([])
    const [all_Cities, setall_Cities] = useState([])
    const [serviceCountry, setserviceCountry] = useState("")


    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "country") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
            const updatedCities = City.getCitiesOfState(value, stateCode)
            setall_States(updatedStates)
            setall_Cities(updatedCities)

        }
        else if (name === "state") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
            const updatedCities = City.getCitiesOfState(value, stateCode)
            setall_Cities(updatedCities)

        }
        else {
            // setrecruitModel((prevmodel) => ({
            //     ...prevmodel,
            //     [name]: value
            // }))
        }
    }


    const onSubmit = (data) => {
        console.log(data);
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
                const CurrentStates = State.getStatesOfCountry(currentCountryCode)
                const CurrentCities = City.getCitiesOfState(currentCountryCode, CurrentStates[0].isoCode)
                setserviceCountry(currentCountryCode)
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
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row p-11'>
                    <div className='col-12 mb-6'>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Doctor</h2>
                        </header>
                    </div>
                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Title </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('title') ? <FcCheckmark /> : errors.title ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('title', { required: true })} placeholder='Title' className={`  w-full  ${errors.title ? "border-red-400" : "border-gray-400"} `} />
                        {errors.title && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>
                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Content </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('content') ? <FcCheckmark /> : errors.content ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('content', { required: true })} placeholder='Title' className={`  w-full  ${errors.content ? "border-red-400" : "border-gray-400"} `} />
                        {errors.content && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1">Content </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.gender && watch('content') ? <FcCheckmark /> : errors.gender ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <select {...register('gender', { required: true })} placeholder='Gender' className={`  w-full  ${errors.gender ? "border-red-400" : "border-gray-400"} `}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        {errors.gender && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">category </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('category') ? <FcCheckmark /> : errors.category ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('category', { required: true })} placeholder='Title' className={`  w-full  ${errors.category ? "border-red-400" : "border-gray-400"} `} />
                        {errors.category && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>


                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.mobile && watch('mobile') ? <FcCheckmark /> : errors.mobile ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <div className='w-full '>
                            <Controller name="contactNo" control={control} rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput value={value} enableSearch disableSearchIcon country={countryCode} onChange={onChange} placeholder="000 000 000" className={` w-full  ${errors.mobile && 'error_form'}`} dropdownClass={"custom-dropdown"} />
                                )}
                            />
                        </div>
                        {errors.mobile && (<p className="text-red-500 text-sm">This is required field</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">address </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('address') ? <FcCheckmark /> : errors.address ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('address', { required: true })} placeholder='Title' className={`  w-full  ${errors.address ? "border-red-400" : "border-gray-400"} `} />
                        {errors.address && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">state </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('state') ? <FcCheckmark /> : errors.state ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('state', { required: true })} placeholder='Title' className={`  w-full  ${errors.state ? "border-red-400" : "border-gray-400"} `} />
                        {errors.state && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">zip </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('zip') ? <FcCheckmark /> : errors.zip ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="number"  {...register('zip', { required: true })} placeholder='Title' className={`  w-full  ${errors.zip ? "border-red-400" : "border-gray-400"} `} />
                        {errors.zip && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">email </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('email') ? <FcCheckmark /> : errors.email ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="email"  {...register('email', { required: true })} placeholder='Title' className={`  w-full  ${errors.email ? "border-red-400" : "border-gray-400"} `} />
                        {errors.email && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">website </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('website') ? <FcCheckmark /> : errors.website ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('website', { required: true })} placeholder='Title' className={`  w-full  ${errors.website ? "border-red-400" : "border-gray-400"} `} />
                        {errors.website && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">facebook </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('facebook') ? <FcCheckmark /> : errors.facebook ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('facebook', { required: true })} placeholder='Title' className={`  w-full  ${errors.facebook ? "border-red-400" : "border-gray-400"} `} />
                        {errors.facebook && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">twitter </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('twitter') ? <FcCheckmark /> : errors.twitter ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('twitter', { required: true })} placeholder='Title' className={`  w-full  ${errors.twitter ? "border-red-400" : "border-gray-400"} `} />
                        {errors.twitter && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">instagram </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('instagram') ? <FcCheckmark /> : errors.instagram ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('instagram', { required: true })} placeholder='Title' className={`  w-full  ${errors.instagram ? "border-red-400" : "border-gray-400"} `} />
                        {errors.instagram && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative '>
                        <label className="block text-sm font-medium mb-1" htmlFor="title">linkedin </label>
                        <div className='absolute right-10 top-10'>
                            {!errors.title && watch('linkedin') ? <FcCheckmark /> : errors.linkedin ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input type="text"  {...register('linkedin', { required: true })} placeholder='Title' className={`  w-full  ${errors.linkedin ? "border-red-400" : "border-gray-400"} `} />
                        {errors.linkedin && (<p className="text-red-500 text-sm">This field is required</p>)}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.country ? <FcCheckmark /> : errors.country ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>


                        <select
                            value={setserviceCountry}
                            onChange={handleChange}
                            name="country"
                            id="country"
                            className={`form-input w-full   ${errors.country && 'border-red-500'}`}
                        >
                            <option defaultChecked disabled>Select Country </option>
                            {all_Countries.map((contry) => {
                                return (
                                    <option value={contry.isoCode}>{contry.name}</option>

                                )
                            })
                            }

                        </select>

                    </div>



                    <div className='col-lg-12'>
                        <button type="submit" className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateDoctor