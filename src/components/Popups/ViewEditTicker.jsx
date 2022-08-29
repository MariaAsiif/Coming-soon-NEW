import React, { useRef, useEffect, useState } from 'react'
import Transition from '../../utils/Transition';
import { callApi } from '../../utils/CallApi';

// ========================= 3rd party packages

import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';




const ViewEditTicker = ({ id, modalOpen, onClose, mode, data }) => {
    const modalContent = useRef(null);
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange ', });
    const [file, setFile] = useState('')
    const [fileUrl, setFileUrl] = useState('')


    const onSubmit = async (values) => {
        // let value = {
        //     tickerid: data._id,
        //     logoFile : file || data?.logoFile,
        //     tickerText: values.tickerText,
        //     active: true
        // }

        let formdata = new FormData()
        formdata.append( 'logoFile' , file ||  data?.logoFile,);
        formdata.append('request', JSON.stringify({
            tickerid: data._id,
            tickerText: values.tickerText || data?.tickerText,
            "active": true
        }));

        const res = await callApi("/tickers/updateTicker", "post", formdata)
        if (res.status === "Success") {
            console.log("Res", res)
            toast.success(res.message);
            onClose()
            setFile('')
        }
        else {
            toast.error(res.message);

        }
    }


    const handleChangeImage = (e) => {
        let file = e.target.files[0]
        setFile(file)

        let url = URL.createObjectURL(file)
        setFileUrl(url)

    }


    console.log("file", fileUrl)
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            onClose();
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });
    useEffect(() => {
        reset(data);

    }, [data, reset]);

    return (
        <>
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
                <div ref={modalContent} className="bg-white rounded shadow-lg overflow-auto w-3/4 h-2/3">
                    {/* Modal header */}
                    <div className="px-5 py-3 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-slate-800">{mode === "edit" ? "Edit Ticker" : "View Ticker"}</div>
                            <button className="text-slate-400 hover:text-slate-500" onClick={onClose}>
                                <div className="sr-only">Close</div>
                                <svg className="w-4 h-4 fill-current">
                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='bscontainer'>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row p-5'>

                                <div className='col-lg-6 mb-5'>
                                    <label className="block text-lg font-medium mb-1" htmlFor="description">LOGO IMAGE</label>
                                    {mode === "view" ?
                                        (

                                            <img src={`http://localhost:5873/${data?.logoFile}`} className="w-full h-[90px]" alt="image_logo" />

                                        ) : (
                                            <>
                                                <label htmlFor='logo'>
                                                    {fileUrl ?
                                                        <img src={fileUrl} className="w-full h-[90px]" alt="image_logo" />
                                                        :
                                                        <img src={`http://localhost:5873/${data?.logoFile}`} className="w-full h-[90px] " alt="image_logo" />
                                                    }
                                                </label>

                                                <input id="logo" onChange={handleChangeImage} type="file" className='hidden pointer' />
                                            </>
                                        )}
                                    {errors.logoFile && <span className='text-red-500'>This field is required</span>}
                                </div>
                                <div className='col-lg-6 mb-5'>
                                    <label className="block text-lg font-medium mb-1" htmlFor="description">TICKER TEXT</label>
                                    {mode === "view" ?
                                        (
                                            <p>{data.tickerText}</p>
                                        ) : (

                                            <input    {...register("tickerText", { required: true })} className={`form-input w-full ${errors.tickerText ? "border-red-500" : "border-green-500"}`} />
                                        )}
                                    {errors.tickerText && <span className='text-red-500'>This field is required</span>}
                                </div>
                                <div className='col-lg-12 mt-10'>
                                    {mode === "edit" &&
                                        <button className="btn bg-red-500 hover:bg-green-600 text-white" type='submit' >Update</button>
                                    }
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </Transition>
        </>
    )
}

export default ViewEditTicker