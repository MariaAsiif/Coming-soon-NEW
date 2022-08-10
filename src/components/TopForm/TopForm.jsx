import React, { useState, useEffect } from 'react'
import uk from "../../assets/images/u_k.png"
import ReactFlagsSelect from 'react-flags-select';
import './topform.css'
import axios from 'axios';
import Input from 'react-phone-number-input/input'


const TopForm = () => {

    const [select, setSelect] = useState("SE");
    const [firstname, setfirstname] = useState({ fname: "firstname", value: "", isempty: true })
    const [email, setemail] = useState({ femail: "email", value: "", isempty: true })
    const [mobileno, setmobileno] = useState({ fmobile: "mobile", value: "", isempty: true })
    const [activeField, setactiveField] = useState("firstname")
    const [errors, seterrors] = useState({
        nameError: null,
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
    const handleChangeEmail = (e) => {
        let { value } = e.target
        // if (value.includes(" ")) {
        //     value = value + e.target.value.toUpperCase().replace(/[^a-z ]/gi, '');
        //     //value = e.target.value.toUpperCase().replace(/[^a-z ]/gi, '');
        // }
        setemail((prevname) => ({
            ...prevname,
            value
        }))
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
                emailError: null,
            })
        }
        else {
            seterrors({
                nameError: null,
                mobileError: null,
                emailError: null,
            })
            setactiveField("email")
        }
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

    const goToMobileField = () => {
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
            console.log("api will run");
        }
    }

    useEffect(() => {
        (async () => {
            const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
            const currentCountryCode = response.data.location.country.code
            console.log(currentCountryCode);
            setSelect(currentCountryCode)


        })();
    }, [])
    const [num, setnum] = useState("")
    return (
        <section className='row mb-1'>
            <div className="col-12">
                <Input
                    country="GB"
                    international
                    withCountryCallingCode
                    value={num}
                    onChange={(v) => setnum(v)} />
                <div className='text-center mt-5 relative form_input '>
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
                                    <input name='firstname' value={firstname.value} onChange={handleChangeName} type="text " className=" focus:outline-none border-0  w-[64%] placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Name?" />
                                    <button onClick={goToNameField} className='bg-light-red border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium'>Enter</button>
                                </div>
                            </>
                        ) : null}


                    {activeField === "email" ?
                        (
                            <>

                                <div className='flex justify-end form-field'>
                                    <input name='email' value={email.value} onChange={handleChangeEmail} type="email " className=" focus:outline-none border-0 w-4/5  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Email?" />
                                    <button onClick={goToEmailField} className='bg-light-red border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium'>Enter</button>
                                </div>
                            </>
                        ) : null}

                    {activeField === "mobile" ?
                        (
                            <>

                                <div className='flex justify-end form-field'>
                                    {/* <input name='mobile' value={mobileno.value} onChange={handleChangeMobile} type="text " className=" focus:outline-none border-0 w-4/5  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Mobile?" /> */}
                                    <Input
                                        className=" focus:outline-none border-0 w-4/5  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Mobile?"
                                        country={select}
                                        international
                                        withCountryCallingCode
                                        value={mobileno.value}
                                        onChange={handleChangeMobile} />
                                    <button onClick={goToMobileField} className='bg-light-red border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium'>Enter</button>
                                </div>
                            </>
                        ) : null}




                </div>
                {errors.nameError}
                {errors.emailError}
                {errors.mobileError}

            </div>

        </section>
    )
}

export default TopForm