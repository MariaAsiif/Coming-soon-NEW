import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import * as yup from "yup";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { callApi } from '../../../utils/CallApi';
import { useEffect } from 'react';


const CreateSinglePermission = () => {
    const [allpermission, setallpermission] = useState([])
    const userId = useSelector((state) => state.userAuth.userInfo.userid);



    useEffect(() => {
        (async () => {
            try {

                let payload = {

                    "sortproperty": "created_at",
                    "sortorder": -1,
                    "offset": 0,
                    "limit": 50,
                    "query": {
                        "critarion": { "active": true },

                        "addedby": "_id email first_name",

                        "lastModifiedBy": "_id email first_name"
                    }

                }

                let response = await callApi("/permissions/getPermissionsWithFullDetails", "post", payload);
                setallpermission(response.data.permissions)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])




    const onSubmit = async (data) => {
        try {
            let payload = {
                roleName: data.name,
                addedby: userId

            }
            const res = await callApi("/roles/createRole", "post", payload)
            if (res.status === "Success") {
                toast.success(res.message);
                // reset()
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
                                <Link to="/role" className="text-slate-500 hover:text-indigo-500" >Single Permission </Link>
                                <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
                                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                Create Single Permission
                            </li>
                        </ul>
                    </div>
                    <header className="py-4">
                        <h2 className="font-semibold text-slate-800">Add New Single Permission</h2>
                    </header>
                </div>

                <div className='col-lg-6 mb-4 relative w-full'>
                    <div className="bg-white shadow-lg w-full rounded-sm border border-slate-200 relative">
                        <header className="px-5 py-4">
                            {/* <h2 className="font-semibold text-slate-800">All Users <span className="text-slate-400 font-medium">{list.length}</span></h2> */}
                        </header>
                        <div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border">
                                    {/* Table header */}
                                    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                                        <tr>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                                <div className="flex items-center">
                                                    <label className="inline-flex">
                                                        <span className="sr-only">Select all</span>
                                                        <input className="form-checkbox" type="checkbox" />
                                                    </label>
                                                </div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">Name</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">CREATE</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">EDIT</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">DELETE</div>
                                            </th>


                                        </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="text-sm divide-y divide-slate-200">
                                        {allpermission.map((permission, i) => {
                                            return (
                                                <tr key={permission._id}>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                                        <div className="flex items-center">
                                                            <label className="inline-flex">
                                                                <span className="sr-only">Select</span>
                                                                <input className="form-checkbox" type="checkbox"  />
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        {permission?.permissionName}
                                                    </td>
                                                    <td className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <input type="checkbox" />
                                                    </td>

                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSinglePermission