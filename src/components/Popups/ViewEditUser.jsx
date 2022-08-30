import React from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const ViewEditUser = (props) => {
    return (
        <Modal open={props.show} onClose={props.onClose} center classNames={{ modal: "w-11/12 p-0" }}>
            <div className='bscontainer'>
                <div className='row text-left'>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">NAME</label>
                        {props.mode === "view" ? (
                            <p>{props.data.first_name}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">First family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.first_family_name}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">Second Family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.second_family_name}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">Third Family name</label>
                        {props.mode === "view" ? (
                            <p>{props.data.third_family_name}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">email</label>
                        {props.mode === "view" ? (
                            <p>{props.data.email}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1 uppercase" htmlFor="description">phone number</label>
                        {props.mode === "view" ? (
                            <p>{props.data.phoneNumber}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">role</label>
                        {props.mode === "view" ? (
                            <p>{props.data.role}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">Country</label>
                        {props.mode === "view" ? (
                            <p>{props.data.country}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">City</label>
                        {props.mode === "view" ? (
                            <p>{props.data.city}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">State</label>
                        {props.mode === "view" ? (
                            <p>{props.data.state}</p>
                        ) : null}
                    </div>
                    <div className='col-lg-3 mb-4'>
                        <label className="block text-lg font-medium mb-1" htmlFor="description">Interest</label>
                        {props.mode === "view" ? (
                            <p>{props.data.interest.map((i) => <span key={i}>{i}</span>)}</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ViewEditUser