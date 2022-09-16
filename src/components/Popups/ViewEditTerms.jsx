import React, { useState, useEffect } from 'react'
import { FcCheckmark } from 'react-icons/fc'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { callApi } from '../../utils/CallApi';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import moment from 'moment';
const ViewEditTerms = (props) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const [expiryDate, setexpiryDate] = useState({ day: dd, month: mm, year: yyyy })
    const [description, setdescription] = useState(props.data.description)
    const [error, setError] = useState("")
    const handleDiscription = (event, editor) => {

        const data = editor.getData();
        if (data !== "") {
            setError('')
            setdescription(data)
        }
        else {
            setError('Description is Required')

        }

    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (description === "") {
            setError("Description is Required")
        }
        else {
            const payload = {
                termsDate: `${expiryDate.year}-${expiryDate.month}-${expiryDate.day}`,
                description: description
            }
            try {

                const res = await callApi("/terms/updateTerms", "post", payload)
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


    useEffect(() => {
      
        const date = moment(props.data?.termsDate).format('yyyy-M-D').split('-')
    setexpiryDate({ day: +date[2], month: +date[1], year: +date[0] })
    }, [props.data]);


    return (
        <Modal open={props.open} onClose={props.onClose} center  >
            <div className=''>
                <form >
                    <div className='row p-5'>
                        <div className='col-lg-6 mb-5'>
                            <label className="block text-lg text-left font-medium mb-1" htmlFor="description">DATE</label>
                            {props.mode === "view" ?
                                (
                                    <p>{props.data.termsDate}</p>


                                ) : (
                                    <>

                                        <DatePicker
                                            value={expiryDate}
                                            calendarPopperPosition="bottom"
                                            
                                            onChange={setexpiryDate}
                                            renderInput={renderCustomInput} // render a custom input
                                            shouldHighlightWeekends
                                        />
                                    </>
                                )}
                        </div>
                        <div className='col-lg-12 mb-5'>
                            <label className="block text-lg text-left font-medium mb-1" htmlFor="description">DESCRIPTION</label>
                            {props.mode === "view" ?
                                (
                                    <div dangerouslySetInnerHTML={{_html:props.data.description }}/>
                                ) : (

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        config={{
                                            toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList']
                                        }}
                                        onChange={handleDiscription}

                                    />

                                )}
                            {error && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='col-lg-12 mt-10'>
                            {props.mode === "edit" &&
                                <button onClick={(e) => onSubmit(e)} className="btn bg-red-500 hover:bg-green-600 text-white" type='submit' >Update</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ViewEditTerms