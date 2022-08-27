import React, { useEffect, useState } from 'react'
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { callApi } from '../../utils/CallApi';
const schema = yup.object({
    username: yup.string().required("User Name is Required"),
    email: yup.string().required("Author Name is Required"),
    feedback: yup.string().required("Your Feedback is Required"),
    des: yup.string().required("Description is Required"),
    // logo: yup.mixed()
    //     .test("required", "You need to provide a file", (file) => {
    //         // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //         if (file) return true;
    //         return false;
    //     })


});

const CreateFeedback = () => {

    const [companySetting, setCompanySetting] = useState(true)
    const [file, setFile] = useState('')

    const { register, watch, reset, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });


    const hellow = () => {

        console.log("hellow")
    }

    const onSubmit = async (data) => {
        debugger
        console.log("find")
        try {
            let formdata = new FormData()
            formdata.append('feedbackimg', file);
            formdata.append('request', JSON.stringify({
                userEmail: data.email,
                feedbackDescription: data.desc,
                userName: data.username
            }));
            const res = await callApi("/feedbacks/createFeedback", "post", formdata)
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
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add new Feedback</h2>
                        </header>
                    </div>

                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">User Name</label>
                        <div className='absolute right-5 top-10'>
                            {!errors.name && watch("username") ? <FcCheckmark /> : errors.name ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            {...register('username')}
                            autoComplete="off"
                            className={`w-full  ${errors.name ? "border-red-400" : "border-gray-400"}`}
                            name='username' id="username"
                            type="text"
                            placeholder="User Name"

                        />
                        <span hidden={watch("username")} className='absolute text-red-400 text-lg font-medium  top-9 left-[125px]'>*</span>

                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>


                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
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
                    <div className='col-lg-4 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="image">Image</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.image ? <FcCheckmark /> : errors.image ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <input
                            // {...register('image')}
                            onChange={(e) => setFile(e.target.files[0])}
                            autoComplete="off"
                            className={`form-input w-full h-[43px]  ${errors.image && 'border-red-500'}`}
                            name='image' id="image"
                            type="file" />

                        {/* {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image.message}</p>
                        )} */}
                    </div>

                    <div className='col-lg-12 mb-4 relative'>
                        <label className="block text-sm font-medium mb-1" htmlFor="feedback">Your FeedBack</label>
                        <div className='absolute right-10 top-10'>
                            {!errors.feedback && watch('feedback') ? <FcCheckmark /> : errors.feedback ? <div className=' text-red-500'><MdClose /></div> : null}
                        </div>
                        <textarea
                            {...register('feedback')}
                            autoComplete="off"
                            className={`form-input w-full  ${errors.feedback && 'border-red-500'}`}
                            name='feedback' id="feedback"
                            placeholder="Your Feedback"
                            rows={4}
                        />
                        <span hidden={watch('feedback')} className='absolute text-red-400 text-lg font-medium  top-9 left-[150px]'>*</span>

                        {errors.feedback && (
                            <p className="text-red-500 text-sm">{errors.feedback.message}</p>
                        )}
                    </div>


                    <div className='col-lg-12'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" type='submit'>Submit</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateFeedback