import React, { useState } from 'react'
import Flatpickr from 'react-flatpickr';
const CreateJob = () => {
    const [jobModel, setjobModel] = useState({
        expiryDate: new Date()
    })
    const handleExpiryDateChange = (date) => {
        setjobModel((prevmodel) => ({
            ...prevmodel,
            expiryDate: date
        }))
    }
    // ****************** Flatpicker Content ***********
    const options = {

        static: true,
        monthSelectorType: 'static',
        enableTime: false,
        dateFormat: 'M j, Y',
        defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        // onReady: (selectedDates, dateStr, instance) => {
        //     instance.element.value = dateStr.replace('to', '-');
        //     const customClass = (align) ? align : '';
        //     instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
        // },
        // onChange: (selectedDates, dateStr, instance) => {
        //     instance.element.value = dateStr.replace('to', '-');
        // },
    }
    return (
        <div className='bscontainer-fluid'>
            <div className='row'>
                <div className='col-lg-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="job_title">Job Title</label>
                        <input name='job_title' id="job_title" className="form-input w-full" type="text" />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
                        <input name='salary' id="salary" className="form-input w-full" type="text" />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <input name='description' id="description" className="form-input w-full" type="text" />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="employer">Employer</label>
                        <input name='employer' id="employer" className="form-input w-full" type="text" />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <label className="block text-sm font-medium mb-1" htmlFor="country">jobtype</label>
                    <select id="country" className="form-select w-full">
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Hybrid</option>
                    </select>
                </div>
                <div className='col-lg-4'>
                    <label className="block text-sm font-medium mb-1" htmlFor="country">Job Status</label>
                    <select id="country" className="form-select w-full">
                        <option>Active</option>
                        <option>Deactive</option>
                    </select>
                </div>
                <div className='col-lg-4'>
                    <label className="block text-sm font-medium mb-1" htmlFor="country">Job Class</label>
                    <select id="country" className="form-select w-full">
                        <option>Physical</option>
                        <option>Rermote</option>
                    </select>
                </div>
                <div className='col-lg-4'>
                    <label className="block text-sm font-medium mb-1"  >Expiry Date</label>
                    <div className="relative">
                        <Flatpickr data-enable-time
                            value={jobModel.expiryDate}
                            onChange={handleExpiryDateChange} className="form-input w-full pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300  " options={options} />
                        <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
                                <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                            </svg>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default CreateJob