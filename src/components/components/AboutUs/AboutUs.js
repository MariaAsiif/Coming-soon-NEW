import React, { useState } from 'react'
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
const AboutUs = () => {
    const dropItem = ["ABOUT RECRUIT", "HOW TO APPLY", " WHAT'S NEXT"]
    const [activeIndex, setActiveIndex] = useState(null)
    const handleDropdown = (index) => {
        if (index === activeIndex) {
            setActiveIndex(null)
        }
        else {
            setActiveIndex(index)

        }
    }
    return (
        <section className='row mb-8'>
            <div className='col-12 bg-light-red mb-8'  >
                <div className='row justify-center text-white lg:text-lg text-xs font-semibold gap-0'>
                    {dropItem.map((item, index) => (
                        <div key={index} className=' dropdowns col-lg-2 col-4 cursor-pointer flex py-1 text-center md:text-center md:d-flex md-justify-center  hover:bg-red-600 transition-all' onClick={() => handleDropdown(index)} >
                            <p className=' links   py-1  '>{item} </p>  {index === activeIndex ?
                                <IoChevronUpOutline className=' arrow_icon inline lg:text-4xl text-sm ' />
                                :
                                <IoChevronDownOutline className=' arrow_icon inline lg:text-4xl text-sm' />}

                        </div>
                    ))}
                </div>
            </div>
            <div className='col-12'>
                <div className='bscontainer'>
                    {activeIndex === 2 ?
                        <div className=" mb-8" >
                            <div className="block p-6 rounded-lg shadow-lg bg-white">
                                Whats Next content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                        : activeIndex === 0 ?
                            <div className=" mb-8" >
                                <div className="block p-6 rounded-lg shadow-lg bg-white">
                                    About Recurit content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                                </div>
                            </div>
                            : activeIndex === 1 ?
                                <div className=" mb-8" id="HowToApply">
                                    <div className="block p-6 rounded-lg shadow-lg bg-white">
                                        How To Apply content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                                    </div>
                                </div>
                                : null
                    }
                </div>
            </div>
        </section>
    )
}

export default AboutUs