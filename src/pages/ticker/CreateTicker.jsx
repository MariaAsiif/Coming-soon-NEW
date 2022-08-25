import React, { useState } from 'react'
import axios from 'axios'
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
    name: yup.string().required("Author Name is Required"),
    logo: yup.mixed()
        .test("required", "You need to provide a file", (file) => {
            // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
            if (file) return true;
            return false;
        })


});

const CreateTicker = () => {

    const [companySetting, setCompanySetting] = useState(true)

    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });



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
        </div >
    )
}

export default CreateTicker