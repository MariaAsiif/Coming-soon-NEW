import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Jobs = () => {
    const token = useSelector((state) => state.userAuth.loginInfo.token);
    const [alljobs, setalljobs] = useState([])
    const [selectedjobs, setselectedjobs] = useState([])

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            let tempUser = alljobs.map((job) => {
                return { ...job, isChecked: checked };
            });
            setalljobs(tempUser);
            if (e.target.checked) {
                setselectedjobs(tempUser)
            }
            else {
                setselectedjobs([])
            }

        } else {
            let tempUser = alljobs.map((job) =>
                job._id === name ? { ...job, isChecked: checked } : job
            );
            setalljobs(tempUser);
            if (e.target.checked) {

                console.log("checked");
                let oldselectedjobssss = alljobs.find((sjob) => sjob._id === name)
                setselectedjobs((prevjob) => ([
                    ...prevjob,
                    oldselectedjobssss
                ]))
            }
            else {
                console.log("unchecked");
                let oldselectedjobs = selectedjobs.filter((sjob) => sjob._id !== name)
                setselectedjobs(oldselectedjobs)
            }
        }
    };
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

                const updatedjobs = response.data.data.jobs.map((job) => ({ ...job, isChecked: false }))
                setalljobs(updatedjobs)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [token])
    return (
        <div className='bscontainer'>
            <div className='row'>
                <div className='col-12 border'>
                    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                        <header className="px-5 py-4">
                            <h2 className="font-semibold text-slate-800">All Jobs <span className="text-slate-400 font-medium">{alljobs.length}</span></h2>
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
                                                        <input name="allSelect" checked={!alljobs.some((job) => !job.isChecked)} onChange={handleChange} className="form-checkbox" type="checkbox" />
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
                                        {alljobs.map((job, i) => {
                                            return (
                                                <tr key={job._id}>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                                        <div className="flex items-center">
                                                            <label className="inline-flex">
                                                                <span className="sr-only">Select</span>
                                                                <input id={job._id} onChange={handleChange} name={job._id} checked={job?.isChecked || false} className="form-checkbox" type="checkbox" />
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <div className="text-left">{job.job_title}</div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <div className="text-left">{job.salary}</div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <div className="text-left">{job.description}</div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                                        <div className="text-left">{job.jobtype}</div>
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

export default Jobs