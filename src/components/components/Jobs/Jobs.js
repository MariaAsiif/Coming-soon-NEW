import React from 'react'
import ReactCountryFlag from 'react-country-flag';

import Business_pic from "../../assets/images/sales (2).jpg"
import Sales_pic from "../../assets/images/sales representatives.jpg"
import Administrator_pic from "../../assets/images/adminstrator.jpg"
import Agriculture_pic from "../../assets/images/agriculture scientist.jpg"
import Botanist_pic from "../../assets/images/Botanist.jpg"
import Customer_pic from "../../assets/images/Customer service.jpg"
import Doctor_pic from "../../assets/images/Doctors.jpg"
import Lawyer1_pic from "../../assets/images/Lawyers 1.1.jpg"
import lawyer2_pic from "../../assets/images/Lawyers.jpg"
import Manufacture_pic from "../../assets/images/manufacturers.jpg"
import Pharamcist_pic from "../../assets/images/Pharmacist.jpg"
import Sales2_pic from "../../assets/images/sales (2).jpg"
import Perscriptive_pic from "../../assets/images/SALES -Prescriptive Care.jpg"
import Vendor_pic from "../../assets/images/vendor 1.jpg"
import Whole_pic from "../../assets/images/whole seller.jpg"
const Jobs = (props) => {
    return (
        <>
            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>BUSINESS DEVELOPMENT</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4 '>
                        <img src={Business_pic} alt="Business_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Sales_pic} className="w-full" alt="Sales_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>SALES REPRESENTATIVES</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>SALES -PRESCRIPTIVE CARE</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Perscriptive_pic} alt="Perscriptive_pic" />
                    </div>
                </div>
            </section>
            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Doctor_pic} className="h-full object-none" alt="Doctor_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12  lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>DOCTORS</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4 '>LAWYERS</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={lawyer2_pic} alt="lawyer2_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Pharamcist_pic} alt="Pharamcist_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>CHEMIST / PHARMACIST</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>BOTANY & PLANT SCIENCES SPECIALIST</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Botanist_pic} alt="Botanist_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Agriculture_pic} alt="Agriculture_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>AGRICULTURE SCIENTIST</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>ADMINISTRATOR</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Administrator_pic} alt="Administrator_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Vendor_pic} alt="Vendor_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>VENDOR</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>MANUFACTURER</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Manufacture_pic} alt="Manufacture_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Whole_pic} alt="Whole_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>WHOLESALER</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>CUSTOMER SUPPORT</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Customer_pic} className="h-full  " alt="Customer_pic" />
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first  lg:mb-0 mb-4'>
                        <img src={Sales2_pic} alt="Business_pic" />
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <h1 className='text-4xl font-medium mb-4'>VENTURE CAPITALIST</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='my-14' >
                <div className='row'>
                    <div className='col-lg-6 col-md-12 lg:order-first order-last'>
                        <h1 className='text-4xl font-medium mb-4'>MARKETING SPECIALIST</h1>
                        <p className='font-semibold text-xs leading-6 text-justify mb-4'>The significant global impact of the Coronavirus Disease SARS-CoV-2 which impact off the world in 2019. We understand
                            that you would prefer to work at a distance, from home preferably all the protective bubble that home represents for the
                            safety of your family, colleagues, neighbors, and friends. Our company offers you a rare example to work in the open at
                            your pace and not your schedule with unlimited earning potential for more information on this opportunity, please
                            contact our human resources department by filling out the form above adding your recent work experience in a resume
                            summary of experience (CV) and we will respond after reviewing your submission. We thank you for considering our
                            company as an opportunity for employment.</p>
                        <div>
                            <button onClick={props.handleScroll} className='mb-2 mr-4 text-white text-lg font-medium py-1 px-10  bg-light-red hover:bg-green-600 transition-all'>APPLY</button>
                            <span className='block md:inline'>
                                <ReactCountryFlag className='mr-1' countryCode="ES" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="DE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="GB" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="US" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="IE" svg style={{ width: '1.5em', height: '1.5em', }} />
                                <ReactCountryFlag className='mx-1' countryCode="CA" svg style={{ width: '1.5em', height: '1.5em', }} />
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 lg:order-last order-first lg:mb-0 mb-4'>
                        <img src={Lawyer1_pic} alt="Lawyer1_pic" />
                    </div>
                </div>
            </section>

            <section className='mb-4'>
                <div className="accordion" id="accordionExample">
                    <div className=" bg-white   border rounded-none border-gray-900 mb-3   ">
                        <h2 className="accordion-header mb-0" id="headingTwo">
                            <button className=" text-black font-medium px-2 py-1  text-sm    accordion-button collapsed relative flex items-center w-full    text-left bg-white     transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <p> HOW WE SUPPORT WORKING  <span className='sami_filed'>MOTHERS</span> AND THEIR FAMILIES</p>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body py-4 px-5">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default,
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white   border rounded-none border-gray-900  ">
                        <h2 className="accordion-header mb-0" id="headthree">
                            <button className=" text-black font-medium px-2 py-1  text-sm   accordion-button collapsed relative flex items-center w-full    text-left bg-white     transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <p> HOW WE SUPPORT WORKING  <span className='sami_filed'>FATHERS</span> AND THEIR FAMILIES</p>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headthree" data-bs-parent="#accordionExample">
                            <div className="accordion-body py-4 px-5">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default,
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Jobs