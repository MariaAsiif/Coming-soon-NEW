import React from 'react'
import comming_soonvideo from "../../assets/videos/comming-soon.mp4"
import Countdown from '../CountDownTimer/CountDownTimer'
import TopForm from '../TopForm/TopForm'
import sabadelLogo from "../../assets/images/sabadel.png"
import worldBankLogo from "../../assets/images/wbbbb.png"
import MobileCountdown from '../MobileCountDownTimer/CountDownTimer'
import './style.css'
const CommingSoon = () => {
    return (
        <>
            <section className="showcase">

                <video src={comming_soonvideo} autoPlay muted loop />
                <div className="overlay" />
                <div className="text_wrapper ">
                    <div className='text '>
                        <h2>Coming </h2>
                        <h3>THERAPEUTIC</h3>
                        <h4>Something Awesome is Coming</h4>
                        <h5>The life saved may be your own</h5>
                        <p>
                            The University Of Chicago Medical Center (UChicago Medicine)
                            conducted the study of a similar plant base therapeutic usage in
                            patients is significantly correlated with a reduction in COVID-19
                            positivity and considered to be one Of the most positive Inhibits
                            SARS-CoV-2 that's far examined my scientific inquisitors. The
                            product our platform focuses on is specifically cultivated wellness
                            and has a compounding biological effect on the aforementioned
                            discovery, truth through science. Please join us an alert allow us to
                            alert you the mornent The Centers for Disease Control (CDC) and
                            The European Center for Disease Prevention and Control releases
                            further information in this area in their quest to save lives and heal
                            families devastated by the hurnan health consequences and
                            mental health issues exacerbated by this recent pandemic
                        </p>

                        <div className="couter_data">
                            <Countdown date="September 30 2022 12:44 GMT+2" />
                        </div>

                        <div className="form_data">
                            <TopForm />
                        </div>

                        <div className="info_text">
                            <span  > The web portal is under construction. Will be here soon with our awesome website!
                                Subscribe to be notified!
                            </span>
                        </div>

                        <div className="company_info_name text-red-400">
                            <span>A Fairman Company</span>
                        </div>

                    </div>
                    <div className="bottom_block flex justify-between relative mt-5 ">
                        <div className="bottom_block_left">
                            <div className="logo_first text-center text-1xl text-red-600 font-samibold">
                                <img className=' w-[140px]' src={sabadelLogo} alt="sabadel" />
                                <span  >sponser</span>

                            </div>
                        </div>

                        <div className="bottom_block_center ">
                            <div className="company_detail">
                                <h5>A Public Service Company</h5>
                                <span>COPYRIGHT © 2022 HPORx LTD</span>

                            </div>
                        </div>

                        <div className="bottom_block_right">
                            <div className="world_logo text-center text-1xl text-red-600 font-samibold">
                                <img className='w-[160px] ' src={worldBankLogo} alt="world bank" />
                                <span >sponser</span>

                            </div>
                        </div>

                    </div>

                </div>

            </section>



        </>
    )
}

export default CommingSoon