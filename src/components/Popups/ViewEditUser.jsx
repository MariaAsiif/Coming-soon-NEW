import React,{useEffect, useState} from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { Country, State, City } from 'country-state-city';

const ViewEditUser = (props) => {
    const [all_Countries, setall_Countries] = useState([])
    const [all_States, setall_States] = useState([])
    const [all_Cities, setall_Cities] = useState([])
    const [countryCode, setCountryCode] = useState("")
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
            setrecruitModel((prevmodel) => ({
                ...prevmodel,
                [name]: value
            }))
        }
    }

    const { register, reset, watch ,  handleSubmit, formState: { errors } } = useForm({ mode: 'onChange ', });

    useEffect(() => {
        reset(props.data);

    }, [props.data, reset]);

    return (
        <Modal open={props.show} onClose={props.onClose} center classNames={{ modal: "w-11/12 p-0" }}>
            <div className='bscontainer'>
                <div className='row text-left'>
                    <div className='col-lg-3 mb-4'>
                        {/* <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">NAME</label> */}
                        {props.mode === "view" ? (
                            <p>{props.data.first_name}</p>
                        ) :
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">First family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.first_family_name}</p>
                        ) :
                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="salary">First Family Name </label> */}
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">Second Family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.second_family_name}</p>
                        ) :
                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="secondFname">Second Family Name </label> */}
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

                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">Third Family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.third_family_name}</p>
                        ) :
                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="thirdFname">Third Family Name </label> */}
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">email</label>
                        {props.mode === "view" ? (
                            <p>{props.data.email}</p>
                        ) :

                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label> */}
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">phone number</label>
                        {props.mode === "view" ? (
                            <p>{props.data.phoneNumber}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        {/* <label className="block text-lg font-medium mb-1" htmlFor="description">role</label> */}
                        {props.mode === "view" ? (
                            <p>{props.data.role}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">Country</label>
                        {props.mode === "view" ? (
                            <p>{props.data.country}</p>
                        ) :
                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label> */}
                                <div className='absolute right-10 top-10'>
                                    {!errors.country ? <FcCheckmark /> : errors.country ? <div className=' text-red-500'><MdClose /></div> : null}
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
                                            <option value={contry.isoCode}>{contry.name}</option>

                                        )
                                    })
                                    }

                                </select>

                            </div>
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">State</label>
                        {props.mode === "view" ? (
                            <p>{props.data.state}</p>
                        ) :

                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="state">State</label> */}
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">City</label>
                        {props.mode === "view" ? (
                            <p>{props.data.city}</p>
                        ) :
                            <div className='col-lg-4 mb-4 relative'>
                                {/* <label className="block text-sm font-medium mb-1" htmlFor="city">City</label> */}
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
                        }
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">Interest</label>
                        {props.mode === "view" ? (
                            <p>{props.data.interest.map((i) => <span key={i}>{i}</span>)}</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ViewEditUser