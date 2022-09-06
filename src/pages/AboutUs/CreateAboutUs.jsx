import React from 'react'
import { Link } from "react-router-dom"
const CreateAboutUs = () => {

    return (
        <div className='bscontainer-fluid'>


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
                                <Link to="/ticker" className="text-slate-500 hover:text-indigo-500" >About Us </Link>
                                <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <Link to="/ticker/create-ticker" className="text-slate-500 hover:text-indigo-500" href="#0">Create About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <header className="py-4">
                        <h2 className="font-semibold text-slate-800">Add new Ticker</h2>
                    </header>
                </div>
                <div className='col-md-4'>
                    <label>Title</label>
                    <input className='form-input w-full' />
                </div>
                <div className='col-md-4'>
                    <label>Added by</label>
                    <select className='w-full'>
                        <option></option>
                    </select>
                </div>
                <div className='col-md-4'>
                    <label>Desccription</label>
                    <textarea row={5} className='form-input w-full' />
                </div>
                <div className='col-md-12'>
                    <button className="btn bg-red-500 hover:bg-green-600 text-white" >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAboutUs