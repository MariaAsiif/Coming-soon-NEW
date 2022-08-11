import React from 'react'
import comming_soonvideo from "../../assets/videos/comming-soon.mp4"
import Countdown from '../CountDownTimer/CountDownTimer'
import TopForm from '../TopForm/TopForm'
import sabadelLogo from "../../assets/images/sabadel.png"
import worldBankLogo from "../../assets/images/world.png"
// import MobileCountdown from '../MobileCountDownTimer/CountDownTimer'
import ReadMore from '../readmore/readmore'
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
                        <h4>Something Awesome is Coming</h4>
                        <h3>THERAPEUTIC</h3>
                        <h5>The life saved may be your own!</h5>

                        <p>
                            <span className='truth_block text-blue-600'>TRUTH THROUGH SCIENCE</span>
                            <a href="https://www.science.org/doi/10.1126/sciadv.abi6110" target="_blank" rel="noopener noreferrer" className='text_link  mb-1 text-[20px] tracking-[1px]'>
                                “The University of Chicago Medical Center (UChicago Medicine) finds that Cannabidiol inhibits SARS-CoV-2
                                replication through induction of the host ER stress and innate immune responses”.
                            </a>
                            <br />
                            <ReadMore>

                                The University Of Chicago Medical Center (UChicago Medicine)
                                conducted the study of a similar species origins in the Cannabis sativa plant which
                                form the basis of therapeutic organic cultivars usage by patients who suffered from “severe acute respiratory syndrome"
                                cause by contracting coronavirus 2 (SARS-CoV-2) and effects of the current outbreak of coronavirus disease
                                (COVID-19) and it smells virulent variants variant B.1.1.7 (a.k.a 20I/501Y.V1) [17],
                                the South Africa variant B.1.351 (a.k.a 20H/501Y.V2) [18], the Brazilian variant P.1
                                (a.k.a 20J/501Y.V3) [19], and the India variant B.1.617 [20] have been circulating worldwide,
                                including the United States (US) and Spain. These variants contain mutations on the S
                                protein RBD and are widely speculated to make SARS-CoV-2 more infectious. Specifically,
                                all three variants involve RBD mutation N501Y, whereas the South Africa and Brazilian variants
                                also contain RBD mutations E484K and K417N. The Cannabis sativa cultivars have demonstrated
                                significantly correlated reduction in COVID-19 positivity and considered to be one Of the
                                most positive Inhibits SARS-CoV-2 that's they have far examined by scientific inquisitors.
                                The Cannabis sativa cultivars product available on the HPO Rx platform focuses specifically I'm clinical
                                outcomes using cultivated wellness, its products and services which demonstrates a compounding
                                positive biological effect as patients have consumed these cultivars. The aforementioned discovery,
                                covered by truth through science has shown promising in Academic science peer reviews,
                                you will discover by a plain language search on the topic across the Internet,
                                and continues to be examined by clinical organizations all over the world.
                                Please join us by registering for our alert below. The moment The Centers for Disease Control
                                (CDC) and The European Center for Disease Prevention and Control releases further information
                                in this area in their quest to save lives and heal families devastated by the Hunan health consequences
                                and mental health issues exacerbated by this recent pandemic.
                            </ReadMore>
                            <p>
                                The Cannabis sativa cultivar plant-based Cannabidiol therapeutic product's goods and services, will be readily available on the HPO Rx platform later this year, listed and available from a wide array of commercial sources, including a plethora of small, and medium size laboratories, license private labs and Suppliers, supplementing alternative Cannabidiol treatments available through national health Systems of sovereign government's purchase through and from licensed International pharmaceutical enterprises, not only targeted at bolstering the immune system protection against SARS-CoV-2 (COVID-19), but an expanding list of other medical conditions where this treatment has been shown to be broadly effective.

                                The Cannabidiol treatments available on the HPO Rx platform, will focus specifically on medical patients seeking a positive outcome for their medical condition.

                                The Cannabis sativa cultivar Cannabidiol they chose to use as the basis of their specific medical condition and treatment regime, especially treatment designed to protect their autoimmune system from the ravages of pathogen like SARS-CoV-2 (COVID-19), now rampant on our planet due to, some suspect, climate change and human impact effects on our climate.

                                Each patient must determine if the Cannabis sativa cultivar of their choice in use results in a positive clinical outcome in the treatment of their specific medical ailment and condition using cultivated wellness natural medical products derived from a Cannabis sativa cultivar, Rx products or services from which they derive a positive or compounding biological effect as patients in use of a Cannabidiol sourced from Cannabis sativa cultivars.

                                The aforementioned discovery via truth through science has shown promising in Academic science peer reviews, you will discover by a plain language search on the topic across the Internet,  and continues to be examined by clinical organizations all over the world.

                                The moment, The World Health Organization (WHO), and Government agencies, the Centers for Disease Control (CDC) and the European Center for Disease Prevention and Control releases further information in this area in their quest to save lives and heal families devastated by the Hunan health consequences and mental health issues exacerbated by this recent pandemic, the consequences of which has been the Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) and influenza A virus (IAV) represent two highly transmissible airborne pathogens with pandemic capabilities.

                            </p>

                            <p className='abstrct_text'>
                                We are the human stewards of this planet and each other, either we’re all safe or no one is safe. Please join us by registering for our medical alert below.
                                <br />
                                <span className='flex flex-col mt-3'></span>
                                Dr. De Mandeville.<br />
                                <small className="date_small">Circa August</small> 1, 2022
                            </p>

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

                        <div className="company_info_name text-red-600">
                            <span>A Fairman Company</span>
                        </div>

                    </div>
                    <div className="bottom_block flex justify-between item-center relative mt-5 ">
                        <div className="bottom_block_left">
                            <div className="logo_first text-center text-1xl text-red-600 font-samibold">
                                <img className=' w-[130px]' src={sabadelLogo} alt="sabadel" />
                                <span  >sponser</span>

                            </div>
                        </div>

                        <div className="bottom_block_center ">
                            <div className="company_detail">
                                <h5>A Public Service Company</h5>
                                <span>COPYRIGHT © 2022 HPORx LTD.</span>

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