import React, { useState } from 'react'
import { FcCheckmark } from 'react-icons/fc'
import { MdClose } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { callApi } from '../../utils/CallApi';
import { Link } from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
const schema = yup.object({
    name: yup.string().required("Author Name is Required"),


});

const CreateTermsCondition = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const [expiryDate, setexpiryDate] = useState({ day: dd, month: mm, year: yyyy })
    const [description, setdescription] = useState("")



    const handleDiscription = (event, editor) => {
        const data = editor.getData();

        setdescription(data)

    }
    const onSubmit = async () => {
        const payload = {
            termsDate: `${expiryDate.year}-${expiryDate.month}-${expiryDate.day}`,
            description: description
        }
        console.log(expiryDate);
        try {

            const res = await callApi("/terms/createTerms", "post", payload)
            if (res.status === "Success") {
                toast.success(res.message);

            }
            else {
                toast.error(res.message);

            }

        } catch (error) {
            console.log(error);
        }
    }

    // ****************** DatePicker Content ***********
    const renderCustomInput = ({ ref }) => (
        < div className='relative cursor-pointer'>
            <input readOnly ref={ref} // necessary  placeholder="yyy-mm-dd"
                value={expiryDate ? `${expiryDate.year}/${expiryDate.month}/${expiryDate.day}` : ''}
                className={`date_picker w-full outline-blue-400 cursor-pointer z-30  border px-2 py-2  border-gray-400`}
            />
            <div className={`visible absolute top-3 cursor-pointer right-5`}>   <FcCheckmark />   </div>

        </div >
    )
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
            <form>

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
                                    <Link to="/phonebook" className="text-slate-500 hover:text-indigo-500" >Terms Condition</Link>
                                    <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/ticker/create-phonebook" className="text-slate-500 hover:text-indigo-500" href="#0">Create Terms Condition</Link>
                                </li>
                            </ul>
                        </div>
                        <header className="py-4">
                            <h2 className="font-semibold text-slate-800">Add New Terms Condition</h2>
                        </header>
                    </div>
                    <div className='col-md-6'>
                        <label>Title</label>
                        <DatePicker
                            value={expiryDate}
                            calendarPopperPosition="bottom"
                            onChange={setexpiryDate}
                            renderInput={renderCustomInput} // render a custom input
                            shouldHighlightWeekends
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>Added by</label>
                        <select className='w-full'>
                            <option value="">Select Added By</option>
                            <option>Super Amin</option>
                            <option>Amin</option>
                            <option>User</option>
                        </select>
                    </div>
                    <div className='col-md-12 mt-3'>
                        <label>Desccription</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            config={{
                                toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList']
                            }}
                            onChange={handleDiscription}

                        />

                    </div>
                    <div className='col-md-12 mt-3'>
                        <button className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                    </div>


                </div>

            </form>
        </div >
    )
}

export default CreateTermsCondition