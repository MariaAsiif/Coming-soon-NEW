import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Jobs = () => {
    const token = useSelector((state) => state.userAuth.loginInfo.token);
    const [alljobs, setalljobs] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                };
                let response = await axios.post('http://localhost:5873/jobs/listjobs', {
                    sortproperty: "created_at",
                    sortorder: -1,
                    offset: 0,
                    limit: 50
                }, config);
                setalljobs(response.data.data.jobs)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])
    return (
        <div className='bscontainer'>
            <div className='row'>
                <div className='col-12 border'>
                    {/* <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                        <header className="px-5 py-4">
                            <h2 className="font-semibold text-slate-800">All Jobs <span className="text-slate-400 font-medium">12</span></h2>
                        </header>
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                                        <tr>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                                <div className="flex items-center">
                                                    <label className="inline-flex">
                                                        <span className="sr-only">Select all</span>
                                                        <input className="form-checkbox" type="checkbox" checked={true} />
                                                    </label>
                                                </div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">JOB TITLE</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">SALARY</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">DESCRIPTION</div>
                                            </th>
                                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                <div className="font-semibold text-left">JobType</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-200">
                                        {alljobs.map(() => {

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Jobs