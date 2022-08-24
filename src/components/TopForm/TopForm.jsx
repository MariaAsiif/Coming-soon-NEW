import React, { useState, useEffect } from 'react'
import uk from "../../assets/images/u_k.png"
import ReactFlagsSelect from 'react-flags-select';
import './topform.css'
import axios from 'axios';
// import Input from 'react-phone-number-input/input'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUp from '../popup/popup';
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
const TopForm = (props) => {

    const [select, setSelect] = useState("SE");
    const [firstname, setfirstname] = useState({ fname: "firstname", value: "", isempty: true })
    const [familyName, setFamilyName] = useState({ fname: "familyname", value: "", isempty: true })
    const [firstFamilyName, setfirstFamilyName] = useState("")
    const [secondFamilyName, setsecondFamilyName] = useState("")
    const [thirdFamilyName, setthirdFamilyName] = useState("")
    const [email, setemail] = useState({ femail: "email", value: "", isempty: true })
    const [mobileno, setmobileno] = useState({ fmobile: "mobile", value: "", isempty: true })
    const [activeField, setactiveField] = useState("firstname")
    const [countryCode, setCountryCode] = useState("")
    const [name, setName] = useState({})
    const [isSuccess, seIsSuccess] = useState(false)
    const [error, setErrors] = useState(false)
    const [errors, seterrors] = useState({
        nameError: null,
        familyNameError: null,
        emailError: null,
        mobileError: null,
    })
    const onSelect = (code) => setSelect(code);
    const handleChangeName = (e) => {
        let { value } = e.target
        value = value.replace(/[^a-z ]/gi, '')
        if (value.includes(" ")) {
            let fvalue = value.split(" ")[0]
            let lvalue = value.split(" ")[1].toUpperCase().replace(/[^a-z ]/gi, '')
            value = fvalue + " " + lvalue
        }
        setfirstname((prevname) => ({
            ...prevname,
            value
        }))
    }
    const handleChangeFamilyName = (e) => {
        let { value } = e.target
        value = value.toUpperCase().replace(/[^a-z ]/gi, '')
        setFamilyName((prevname) => ({
            ...prevname,
            value
        }))
    }
    const handleChangeFirstFamilyName = (e) => {
        let { value } = e.target
        value = value.toUpperCase().replace(/[^a-z ]/gi, '')
        setfirstFamilyName(value)
    }
    const handleChangeSecondFamilyName = (e) => {
        let { value } = e.target
        value = value.toUpperCase().replace(/[^a-z ]/gi, '')
        setsecondFamilyName(value)
    }
    const handleChangeThirdFamilyName = (e) => {
        let { value } = e.target
        value = value.toUpperCase().replace(/[^a-z ]/gi, '')
        setthirdFamilyName(value)
    }


    const handleChangeEmail = (e) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { value } = e.target
        const validate = value.trim().toLowerCase();
        // Test if email is valid
        const isValidEmail = re.test(validate);
        console.log("isv", isValidEmail)
        if (isValidEmail === false) {
            seterrors({
                emailError: (<div className='text-red-600'>Email is invalid</div>),
            })
            setemail((prevname) => ({
                ...prevname,
                value
            }))

        }
        else {
            setemail((prevname) => ({
                ...prevname,
                value
            }))

            seterrors({
                emailError: null,
            })
        }
    }
    const handleChangeMobile = (e) => {
        //  let { value } = e.target
        // value = value.replace(/[^0-9]/gi, '')

        setmobileno((prevname) => ({
            ...prevname,
            value: e
        }))
    }
    // ===============================================================================
    const goToNameField = () => {
        if (firstname.value === "") {
            seterrors({
                nameError: (<div className='text-red-600'>Name is required</div>),
                mobileError: null,
                familyNameError: null,
                secondFamilyNameError: null,
                emailError: null,
            })
        }
        else {
            seterrors({
                nameError: null,
                mobileError: null,
                emailError: null,
                familyNameError: null,
                secondFamilyNameError: null,
            })
            setactiveField("familyname")
        }
    }


    const goToFamilyField = () => {
        if (familyName.value === "") {
            seterrors({
                familyNameError: (<div className='text-red-600'>Family Name is required</div>),
                mobileError: null,
                emailError: null,
                // familyNameError: null,
                secondFamilyNameError: null,
            })
        }
        else {
            seterrors({
                nameError: null,
                mobileError: null,
                emailError: null,
                familyNameError: null,
                secondFamilyNameError: null,
            })
            setactiveField("additionalfamilyname")
        }
    }
    const goToSecondFamilyField = () => {
        seterrors({
            nameError: null,
            mobileError: null,
            emailError: null,
            familyNameError: null,
            secondFamilyNameError: null,
        })
        setactiveField("email")

    }

    const goToEmailField = () => {
        if (email.value === "") {
            seterrors({
                nameError: null,
                mobileError: null,
                emailError: (<div className='text-red-600'>Email is required</div>),
            })
        }
        else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail = re.test(email.value);
            if (!isValidEmail) {
                seterrors({
                    nameError: null,
                    mobileError: null,
                    emailError: (<div className='text-red-600'>Email is invalid</div>),
                })
            }
            else {
                seterrors({
                    nameError: null,
                    mobileError: null,
                    emailError: null,
                })
                setactiveField("mobile")
            }

        }
    }

    const goToMobileField = async () => {


        if (mobileno.value === "") {
            seterrors((preverrors) => ({
                ...preverrors,
                mobileError: (<div className='text-red-600'>Mobile is required</div>),
            }))
        }
        else {
            seterrors({
                nameError: null,
                mobileError: null,
                emailError: null,
            })

            try {



                const response = await axios.post("https://hporx-admin-backend.herokuapp.com/users/signup",
                    {
                        first_name: firstname.value,
                        first_family_name: familyName.value,
                        second_family_name: secondFamilyName,
                        third_family_name: thirdFamilyName,
                        email: email.value,
                        userName: firstname.value,
                        password: "test",
                        platform: "email",
                        role: "subscriber",
                        location: {
                            type: "Point",
                            coordinates: [
                                0,
                                0
                            ]
                        },
                        phoneNumber: mobileno.value
                    })
                if (response.data.status === "Fail") {
                    toast.error(response.data.message);
                    setErrors(true)
                } else {

                    toast.success(response.data.message);
                    console.log("response", response)
                    seIsSuccess(true)
                    setName({ fname: firstname.value, fmname: familyName.value, smname: secondFamilyName.value })
                    setTimeout(() => {

                        setfirstname((prevname) => ({
                            ...prevname,
                            value: ""
                        }))
                        setFamilyName((prevname) => ({
                            ...prevname,
                            value: ""
                        }))

                        setemail((prevname) => ({
                            ...prevname,
                            value: ""
                        }))
                        setmobileno((prevname) => ({
                            ...prevname,
                            value: ""
                        }))
                        setfirstFamilyName('')
                        setsecondFamilyName('')
                        setthirdFamilyName('')
                        setactiveField("firstname")
                        setErrors(false)

                    }, 1000);


                }


            } catch (error) {
                console.log("api will error", error);
            }
        }
    }

    useEffect(() => {

        setCountryCode(props.countryCode.toLowerCase())

        setSelect(props.countryCode)

    }, [props.countryCode])

    return (
        <section className='row mb-1'>
            <div className="col-12">

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

                <div className="flex item-center">
                    {activeField === "familyname" && (
                        <button onClick={() => setactiveField("firstname")} className=' w-16 bg-white  border-r text-center flex flex-col text-[20px] pt-[7px] ' >
                            <BiLeftArrow className='ml-4 text-gray-400' />
                            <span className='hover:underline ml-4 text-[9px] text-red-500 font-bold ' >BACK</span>
                        </button>
                    )}

                    {activeField === "email" && (
                        <button onClick={() => setactiveField("additionalfamilyname")} className=' w-16 bg-white  border-r text-center flex flex-col text-[20px] pt-[7px] ' >
                            <BiLeftArrow className='ml-4 text-gray-400' />
                            <span className='hover:underline ml-4 text-[9px] text-red-500 font-bold ' >BACK</span>
                        </button>
                    )}

                    <div className='text-center mt-5 relative form_input w-full'>
                        {activeField === "firstname" ?
                            (
                                <>

                                    <ReactFlagsSelect
                                        selected={select}
                                        onSelect={onSelect}
                                        searchable={true}
                                        showSelectedLabel={false}
                                        showOptionLabel={false}
                                    />
                                    <div className='flex justify-end form-field'>
                                        <div className='w-[64%] relative'>
                                            <input name='firstname' value={firstname.value} onChange={handleChangeName} type="text " className=" focus:outline-none border-0  w-full placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Name?" />
                                            <span className={`absolute top-1/4 right-3 ${firstname.value.length ? "visible" : "invisible"} `}>
                                                <FcCheckmark />
                                            </span>
                                        </div>

                                        <button onClick={goToNameField} className={`${firstname.value !== "" ? 'bg-green-600' : 'bg-light-red'} border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium`}>Enter</button>
                                    </div>
                                </>
                            ) : null}

                        {activeField === "familyname" &&
                            (
                                <>

                                    <div className='w-4/5 relative inline-block'>
                                        <input name='familyname' value={familyName.value} onChange={handleChangeFamilyName} type="text " className=" focus:outline-none border-0  w-full placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Family Name?" />
                                        <span className={`absolute top-1/4 right-3 ${familyName.value.length ? "visible" : "invisible"} `}>
                                            <FcCheckmark />
                                        </span>
                                    </div>
                                    <button onClick={goToFamilyField} className={`${familyName.value !== "" ? 'bg-green-600' : 'bg-light-red'} border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium`}>Enter</button>
                                </>
                            )
                        }

                        {activeField === "additionalfamilyname" &&
                            (
                                <div className='flex item-center'>

                                    <div className=' w-3/12 flex'>
                                        <button onClick={() => setactiveField("familyname")} className=' w-20  border-r text-center flex flex-col text-[20px] pt-[7px] ' >
                                            <BiLeftArrow className='ml-4 text-gray-400' />
                                            <span className='hover:underline ml-4 text-[9px] text-red-500 font-bold ' >BACK</span>
                                        </button>
                                        <input name='firstFamilyName' value={firstFamilyName} onChange={handleChangeFirstFamilyName} type="text " className=" focus:outline-none border-0  w-full placeholder:font-Poppins placeholder:font-medium p-2" placeholder="1st Family Name" />
                                    </div>
                                    <div className=' w-3/12 relative inline-block'>
                                        <input name='secondFamilyName' value={secondFamilyName} onChange={handleChangeSecondFamilyName} type="text " className=" focus:outline-none border-l-2 border-r-2 border-gray-400  w-full placeholder:font-Poppins placeholder:font-medium p-2" placeholder="2nd Family Name" />
                                    </div>
                                    <div className=' w-3/12 relative inline-block'>
                                        <input name='thirdFamilyName' value={thirdFamilyName} onChange={handleChangeThirdFamilyName} type="text " className=" focus:outline-none border-0  w-full placeholder:font-Poppins placeholder:font-medium p-2" placeholder="3rd Family Name" />
                                    </div>
                                    <div className='item-center flex'>
                                        <button onClick={goToSecondFamilyField} className={`${firstFamilyName || secondFamilyName || thirdFamilyName ? 'bg-green-600' : 'bg-light-red'} border-red-600 w-[140px] h-[40px] text-white font-Poppins font-medium`}>Enter</button>
                                        <button onClick={() => setactiveField("email")} className='ml-3  text-center flex flex-col text-[20px] pt-[7px] ' >
                                            <BiRightArrow className='text-gray-400 ' />
                                            <span className='hover:underline text-[9px] text-green-500 text-bold' >SKIP</span>
                                        </button>

                                    </div>
                                </div>
                            )
                        }

                        {activeField === "email" ?
                            (
                                <>

                                    <div className='flex justify-end form-field'>
                                        <div className='w-4/5 relative inline-block'>
                                            <input name='email' value={email.value} onChange={handleChangeEmail} type="email " className=" focus:outline-none border-0 w-full  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Email Address" />
                                            {email.value.length && !errors.emailError ?
                                                <span className={`absolute top-1/4 right-3  `}><FcCheckmark /></span>
                                                : errors.emailError && email.value !== "" ?
                                                    <span className={`  absolute top-1/3 right-3`}>  <MdClose className='text-red-600' /> </span>
                                                    :
                                                    null}
                                        </div>

                                        <button onClick={goToEmailField} className={`${!errors.emailError && email.value !== "" ? 'bg-green-600' : 'bg-light-red'} border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium`}>Enter</button>
                                    </div>
                                </>
                            ) : null}

                        {activeField === "mobile" ?
                            (
                                <>

                                    <div className=' flex justify-end form-field'>
                                        {/* <input name='mobile' value={mobileno.value} onChange={handleChangeMobile} type="text " className=" focus:outline-none border-0 w-4/5  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Mobile?" /> */}
                                        <div className='w-4/5'>
                                            <PhoneInput
                                                country={countryCode}
                                                containerClass="flex items-center h-full "
                                                inputClass="phone_custom_input"
                                                dropdownClass={"custom-dropdown"}
                                                enableSearch
                                                disableSearchIcon
                                                countryCodeEditable={false}
                                                value={mobileno.value}
                                                onChange={handleChangeMobile} />
                                        </div>

                                        {/* <Input
                                        className=" focus:outline-none border-0 w-4/5  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Mobile?"
                                        country={select}
                                        international
                                        withCountryCallingCode
                                        value={mobileno.value}
                                        onChange={handleChangeMobile} /> */}
                                        <button onClick={goToMobileField}
                                            className={`${!errors.mobileError && mobileno.value !== "" ? `bg-green-600` : 'bg-light-red'} border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium`}>
                                            Enter</button>
                                    </div>
                                </>
                            ) : null}


                    </div>

                    <div className='skip_field  '>
                        {activeField === "additionalfamilyname" &&
                            <>


                                {/* <span className='hover:underline mr-3 ml-2' onClick={() => setactiveField("familyname")}>back</span>
                                <span className='hover:underline' onClick={() => setactiveField("email")}>or skip</span> */}
                            </>
                        }
                    </div>






                </div>
                {errors.nameError}
                {errors.familyNameError}
                {errors.secondFamilyNameError}
                {errors.emailError}
                {errors.mobileError}

            </div>

            {isSuccess && <PopUp permition={isSuccess} Toggle={(value) => seIsSuccess(value)} Firstname={name} />}

        </section>
    )
}

export default TopForm