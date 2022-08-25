import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { surnames } from '../../utils/enum';
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
import { GoDeviceMobile } from 'react-icons/go'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
    name: yup.string().required("Department Name is Required"),
    head: yup.string().required("Head of Department is Required"),
    added: yup.string().required("Add By Department is Required"),
    desc: yup.string().required("Description is Required"),

});

const CreateDepartment = () => {


    const { register, watch, setValue, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });




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
                            <h2 className="font-semibold text-slate-800">Add new Departmant</h2>
                        </header>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Department Name </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.name && watch("name") ? <FcCheckmark /> : errors.name ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('name')}
                            autoComplete="off"
                            className={`w-full  ${errors.name ? "border-red-400" : "border-gray-400"}`}
                            name='name' id="name"
                            type="text"
                            placeholder="DEPATMENT NAME"

                        />
                        <span hidden={watch("name")} className='absolute text-red-400 text-lg font-medium  top-9 left-[175px]'>*</span>

                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="head">Head of Department </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.head && watch('head') ? <FcCheckmark /> : errors.head ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('head')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.head && 'border-red-500'}`}
                            name='head' id="head"
                            placeholder="Head of Department"

                            type="text" />
                        <span hidden={watch("head")} className='absolute text-red-400 text-lg font-medium  top-9 left-[195px]'>*</span>


                        {errors.head && (
                            <p className="text-red-500 text-sm">{errors.head.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="head">Added By </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.added && watch('added') ? <FcCheckmark /> : errors.added ? <div className=' text-red-500 mr-5'><MdClose /></div> : null}
                        </div>
                        <select value="added_by "
                            name="added"
                            className={`form-input w-full  ${errors.added && 'border-red-500'}`}
                        >
                            <option>Select Added By</option>
                            <option>Super Admin</option>
                            <option>Admin</option>
                        </select>


                        {errors.added && (
                            <p className="text-red-500 text-sm">{errors.added.message}</p>
                        )}
                    </div>

                    <div className='col-lg-12 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="desc">Description  </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.desc && watch('desc') ? <FcCheckmark /> : errors.desc ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <textarea
                            {...register('desc')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.desc && 'border-red-500'}`}
                            name='desc' id="desc"
                            placeholder="Description"
                            cols="20"
                        ></textarea>
                        {/* <span hidden={watch('desc')} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span> */}

                        {errors.desc && (
                            <p className="text-red-500 text-sm">{errors.desc.message}</p>
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

export default CreateDepartment