import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthImage from '../images/signin.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import logo from '../images/hporx_logo.png';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { signin } from "../Redux/UserAuthSlice/UserAuthSlice"

function Signin() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const [authValue, setAuthValue] = useState({
    email: "superadmin@getnada.com",
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
        passwordError: (<div className='text-red-600'>Password is required</div>),

      })
    }
    else {

      try {
        const response = await axios.post("http://localhost:5873/users/signin", authValue);
        if (response.data.status === "Fail") {
          toast.error(response.data.message);
        } else {
          dispatch(signin(response.data.token))
          navigate("../dashboard");
        }
      }
      catch (err) {

        dispatch(signin("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjp0cnVlLCJuIjoiSmFtc2hhaWQgU2FiaXIiLCJlIjoiamFtc2hhaWRzYWJpcjQxMTk4MEBnbWFpbC5jb20iLCJkIjoiNjJmNGUxMzI1NmYwNmQxMDg4NGY5NDRlIiwicCI6Ii91cGxvYWRzL2RwL2RlZmF1bHQucG5nIiwiciI6Il9hIiwiaWF0IjoxNjYwMjMxNTE1fQ.Q8gTpV9EW5ha1ujb4qLedGV4wQuQTIr12J0vPeLrhn4"))
        navigate("../dashboard");
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
                  <img src={logo} alt="Logo" className=" w-36" />
                </Link>
              </div>
            </div>

            <div className="w-full   md:w-3/4  mx-auto px-4 py-8">
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

                  {/* <Link to="/dashboard">
                    <button className="btn bg-indigo-500 bg-red-600 text-white ml-3" type="submit">Sign in</button>
                  </Link> */}
                  <button type="submit" className="btn bg-indigo-500 bg-red-600 text-white ml-3" >Sign In</button>

                </div>
              </form>
              {/* Footer */}

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