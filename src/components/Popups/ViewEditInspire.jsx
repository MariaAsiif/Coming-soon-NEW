import React, { useRef, useState } from 'react'
import Transition from '../../utils/Transition';
import { callApi } from '../../utils/CallApi';

import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import { toast, ToastContainer } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import moment from 'moment';

const schema = yup.object({
    name: yup.string().required("Author Name is Required"),
    quote: yup.string().required("Quotation is Required"),
});


const ViewEditInspire = ({ id, modalOpen, onClose, mode, data }) => {
    const modalContent = useRef(null);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

  console.log("name", data.authorName)

    const [expiryDate, setexpiryDate] = useState({ day: dd , month: mm, year: yyyy })

    const defaultValues = {
        name: "laher asif",
        quote: "this is new quotation",
    }

    const { register, watch, reset, control, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });

    const onSubmit = async (values) => {
        let value = {
           quoteid:data._id,
           quoteText:values.quote, 
           authorName:values.name,
           quoteColor: "Red",
           quoteDate: values.expiryDate,
            active: true
            
        }
        const res = await callApi("/quotes/updateQuote", "post", value)
        if (res.status === "Success") {
            toast.success(res.message);
            onClose(false)
        }
        else {
            toast.error(res.message);

        }
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
                            <div className="font-semibold text-slate-800">{mode === "edit" ? "Edit Inspire" : "View Inspire"}</div>
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

                            <div className='col-lg-6 mb-4 relative'>
                                <label className="block text-sm font-medium mb-1" htmlFor="name">Author Name </label>
                                {mode === "view" ?
                                    <div> {data?.authorName} </div>
                                    :
                                    <>
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
                                    </>
                                }
                            </div>

                            <div className='col-lg-6 mb-4 '>
                                <label className="block text-sm font-medium mb-1 "  >Quote Date</label>
                                {mode === "view" ?
                                    <div> {moment(data?.quoteDate).format('ll')} </div>
                                    :
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
                                }


                            </div>

                            <div className='col-lg-12 mb-4 relative'>
                                <label className="block text-sm font-medium mb-1" htmlFor="quote">Quotation</label>
                                {mode === "view" ?
                                    <div> {data?.quoteText} </div>
                                    :
                                    <>
                                        <div className='absolute right-5 top-10'>
                                            {!errors.quote && watch('quote') ? <FcCheckmark /> : errors.quote ? <div className=' text-red-500'><MdClose /></div> : null}
                                        </div>
                                        <textarea
                                            {...register('quote')}
                                            autoComplete="off"
                                            className={`form-input w-full  ${errors.quote && 'border-red-500'}`}
                                            name='quote' id="quote"
                                            placeholder="QUOTATION"
                                            cols="20"
                                        ></textarea>
                                        {/* <span hidden={watch('quot')} className='absolute text-red-400 text-sm font-medium  top-9 left-[170px]'>(optional)</span> */}

                                        {errors.quote && (
                                            <p className="text-red-500 text-sm">{errors.quote.message}</p>
                                        )}
                                    </>
                                }
                            </div>

                            <div className='col-lg-12'>
                                <button className="btn bg-red-500 hover:bg-green-600 text-white" > {mode === "edit" ? "Update" : "Submit"}</button>
                            </div>
                        </div>
                    </form >

                </div>
            </Transition>
        </>
    )
}

export default ViewEditInspire