import React from 'react'
import comming_soonvideo from "../assets/videos/comming-soon.mp4"
import { useForm } from "react-hook-form";
import { callApi } from '../utils/CallApi';
import { toast, ToastContainer } from 'react-toastify';
const UserFeedback = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data)
        try {
            let formdata = new FormData()
            formdata.append('feedbackimg', data.feedbackimg);
            formdata.append('request', JSON.stringify({
                userEmail: data.email,
                feedbackDescription: data.feedback,
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
            <div className='row'>
                <div className='col-12'>
                    <div className='absolute right-0 w-full  h-screen flex justify-between items-center bg-black  '>
                        <video className='absolute top-0 left-0 w-full h-full object-cover opacity-80' src={comming_soonvideo} autoPlay muted loop />
                        <div className='absolute top-0 left-0 w-full h-full bg-[#00000066] mix-blend-overlay'></div>
                        <div className='w-full z-[1]'>
                            <div className='bscontainer'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='row justify-center'>
                                        <div className='col-md-4  '>
                                            <div className='bg-white px-8 py-6 rounded-md'>
                                                <h1 className='text-center text-2xl font-semibold mb-6'>Feedback</h1>
                                                <div className=''>
                                                    <div className='mb-3'>
                                                        <label className='block font-semibold text-lg mb-2'>User name</label>
                                                        <input  {...register('username', { required: true })} className='border-gray-300 w-full rounded' type="text" />
                                                        {errors.username && (<p className="text-red-500 text-sm">User name is required</p>)}
                                                    </div>
                                                    <div className='mb-3'>
                                                        <label className='block font-semibold text-lg mb-2'>Email address</label>
                                                        <input  {...register('email', { required: true })} className='border-gray-300 w-full rounded' type="email" />
                                                        {errors.email && (<p className="text-red-500 text-sm">Email is required</p>)}
                                                    </div>
                                                    <div className='mb-3'>
                                                        <p className='font-semibold text-lg mb-2 '>Image</p>
                                                        <label className='block text-center cursor-pointer font-semibold text-lg mb-2 border p-2 border-gray-300 w-full rounded'>
                                                            Upload
                                                            <input {...register('feedbackimg')} type="file" hidden className='border-gray-300 w-full rounded' />
                                                        </label>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <label className='block font-semibold text-lg mb-2'>Your feedback</label>
                                                        <input   {...register('feedback', { required: true })} className='border-gray-300 w-full rounded' type="text" />
                                                        {errors.feedback && (<p className="text-red-500 text-sm">Feedback is required</p>)}
                                                    </div>
                                                    <div >
                                                        <button type='submit' className='bg-red-500 hover:bg-green-600 w-full rounded p-3 text-white font-semibold'>SUBMIT</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserFeedback