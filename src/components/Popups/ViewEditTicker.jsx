import React, { useRef, useEffect, useState } from 'react'
import Transition from '../../utils/Transition';
import { callApi } from '../../utils/CallApi';

import { toast, ToastContainer } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Author Name is Required"),
    quote: yup.string().required("Quotation is Required"),
});

const ViewEditCandidate = ({ id, modalOpen, onClose, mode, data }) => {
    debugger
    const modalContent = useRef(null);

    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });



    const onSubmit = async (data) => {
        console.log("Data", data)
        try {
            let value = {
                quoteText: data.quote,
                authorName: data.name,
                quoteColor: "Red",
                quoteDate: Date.now(),
                addedby: "6305dac13c594d3538c790b8"
            }
            const res = await callApi("/quotes/createQuote", "post", value)
            if (res.status === "Success") {
                toast.success(res.message);
                reset()
            }
            else {
                toast.error(res.message);
    
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* Modal backdrop */}
            <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
                show={modalOpen}
                enter="transition ease-out duration-200"
                enterStart="opacity-0"
                enterEnd="opacity-100"
                leave="transition ease-out duration-100"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                aria-hidden="true"
            />
            {/* Modal dialog */}
            <Transition
                id={id}
                className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
                role="dialog"
                aria-modal="true"
                show={modalOpen}
                enter="transition ease-in-out duration-200"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4"
            >
                <div ref={modalContent} className="bg-white rounded shadow-lg  overflow-x-hidden  max-w-[1200px] max-h-full">
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

                      {/* Modal header */}
                      <div className="px-5 py-3 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-slate-800">View Candidate</div>
                            <button className="text-slate-400 hover:text-slate-500" onClick={onClose}>
                                <div className="sr-only">Close</div>
                                <svg className="w-4 h-4 fill-current">
                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row p-11'>

                    <div className='col-12 mb-6'>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Ticker</h2>
                        </header>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Text</label>
                        <div className='absolute right-5 top-10'>
                            {!errors.name && watch("name") ? <FcCheckmark /> : errors.name ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('name')}
                            autoComplete="off"
                            className={`w-full  ${errors.name ? "border-red-400" : "border-gray-400"}`}
                            name='name' id="name"
                            type="text"
                            placeholder="AUTHOR NAME"

                        />
                        <span hidden={watch("name")} className='absolute text-red-400 text-lg font-medium  top-9 left-[145px]'>*</span>

                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>



                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="secondFname">logo </label>
                        <div className='absolute right-5 top-10'>
                            {!errors.logo && watch('logo') ? <FcCheckmark /> : errors.logo ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <Controller
                            control={control}
                            name="logo"
                            render={({ field: { onChange, onBlur, } }) => (
                                <input
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    type="file"
                                    className={`form-input w-full h-[42px]  ${errors.logo && 'border-red-500'}`}
                                    name='logo' id="logo"
                                />
                            )}
                        />


                        {errors.cv && (
                            <p className="text-red-500 text-sm">{errors.cv.message}</p>
                        )}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <div>
                            <div className="text-sm text-slate-800 font-semibold mb-3">Active/DeActive</div>
                            <div className="flex items-center">
                                <div className="form-switch">
                                    <input
                                        type="checkbox"
                                        id="company-toggle"
                                        className="sr-only"
                                        checked={companySetting}
                                        onChange={() => setCompanySetting(!companySetting)}
                                    />
                                    <label className="bg-slate-400" htmlFor="company-toggle">
                                        <span className="bg-white shadow-sm" aria-hidden="true"></span>
                                        <span className="sr-only">Company Culture</span>
                                    </label>
                                </div>
                                <div className="text-sm text-slate-400 italic ml-2">{companySetting ? 'Active' : 'DeActive'}</div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-12'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                    </div>
                </div>
            </form >

                </div>
            </Transition>
        </>
    )
}

export default ViewEditCandidate