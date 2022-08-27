import React, { useState } from 'react'
import { FcCheckmark, FcDataEncryption } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { callApi } from '../../utils/CallApi';
import { Link } from "react-router-dom"
const schema = yup.object({
    name: yup.string().required("Author Name is Required"),
    // logo: yup.mixed()
    //     .test("required", "You need to provide a file", (file) => {
    //         // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //         if (file) return true;
    //         return false;
    //     })


});

const CreateTicker = () => {

    const [companySetting, setCompanySetting] = useState(true)
    const [file, setFile] = useState('')

    const { register, watch, reset, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });



    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            let formdata = new FormData()
            formdata.append('logoimg', file);
            formdata.append('request', JSON.stringify({
                tickerText: data.name,
                "active": true
            }));
            const res = await callApi("/tickers/createTicker", "post", formdata)
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
                        <div className='mb-3'>
                            <ul className="inline-flex flex-wrap text-sm font-medium">
                                <li className="flex items-center">
                                    <Link to="/dashboard" className="text-slate-500 hover:text-indigo-500" >Dashboard </Link>
                                    <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/ticker" className="text-slate-500 hover:text-indigo-500" >Ticker </Link>
                                    <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/ticker/create-ticker" className="text-slate-500 hover:text-indigo-500" href="#0">Create ticker</Link>
                                </li>
                            </ul>
                        </div>
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
                        <input

                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            className={`form-input w-full h-[42px]  ${errors.logo && 'border-red-500'}`}
                            name='logo' id="logo"
                        />
                        <small className='text-red-500'>only png, svg images can be added</small>
                        {/* <Controller
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
                        /> */}


                        {/* {errors.cv && (
                            <p className="text-red-500 text-sm">{errors.cv.message}</p>
                        )} */}
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <div>
                            <div className="text-sm text-slate-800 font-semibold mb-3">Active/Deactivate</div>
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
                                <div className="text-sm text-slate-400 italic ml-2">{companySetting ? 'Active' : 'Deactivate'}</div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-12'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateTicker