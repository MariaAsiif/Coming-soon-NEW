import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import AuthImage from '../images/signin.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import logo from '../images/signin3.png';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { signin } from "../Redux/UserAuthSlice/UserAuthSlice"
const fakeemail = () => {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for (var ii = 0; ii < 15; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + '@gmail.com'
}
function Signin() {
  const dispatch = useDispatch()

  const [authValue, setAuthValue] = useState({
    email: fakeemail(),
    password: '12345678',
  });

  const [errors, seterrors] = useState({
    emailError: null,
    passwordError: null,
  })


  const handleChange = (e) => {
    const { value } = e.target
    // if (e.target.name === "email") {
    //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   const validate = value.trim().toLowerCase();
    //   const isValidEmail = re.test(validate);
    //   if (isValidEmail === false) {
    //     seterrors({
    //       emailError: (<div className='text-red-600'>Email is invalid</div>),
    //     })
    //     setAuthValue((prevname) => ({
    //       ...prevname,
    //       email: value,
    //     }))

    //   }


    // }
    // else {
    setAuthValue((prevname) => ({
      ...prevname,
      [e.target.name]: value,
    }))

    seterrors({
      emailError: null,
    })
    // }
  }


  const OnSubmitData = async (e) => {
    e.preventDefault();
    if (authValue.password === "") {
      seterrors({
        passwordError: (<div className='text-red-600'>Name is required</div>),

      })
    }
    else {

      try {
        const response = await axios.post("http://localhost:5873/users/signin", authValue);
        if (response.data.status === "Fail") {
          toast.error(response.data.message);
        } else {
          console.log(response);
        }
      }
      catch (err) {
        toast.error(err.message);
      }
    }
  }


  let { email, password } = authValue;
  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <img src={logo} alt="Logo" className="h-24 w-auto" />
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome back! </h1>
              {/* Form */}
              <form onSubmit={OnSubmitData}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" name="email" value={email} onChange={handleChange} className="form-input w-full" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" name="password" value={password} onChange={handleChange} className="form-input w-full" type="password" autoComplete="on" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">Forgot Password?</Link>
                  </div>


                  <button type="submit" className="btn bg-indigo-500 bg-red-600 text-white ml-3" >Sign In</button>

                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                {/* <div className="text-sm">
                  Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signup">Sign Up</Link>
                </div> */}
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">
                    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm"> To support you during the pandemic super pro features are free until March 31st. </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default Signin;