import React from 'react'
import leafLogo2 from "../../assets/images/Logo-leaf-Top-red-V2.png"
import usFlaglogo from "../../assets/images/usflag_logo_v2.png"
const TopBar = () => {
    return (
        <div className='lg:my-10 my-5 lg:px-28 md:px-5 px-6'>
            <div className='row  justify-center items-center'>
                <div className='col-4'>
                    <figure>
                        <img src={leafLogo2} className="md:w-16 w-11 " alt="leafLogo" />
                        <figcaption className='text-left md:-ml-6 -ml-3 mt-1 text-xs text-red-600 font-semibold '>
                            Cultivated Wellness
                        </figcaption>
                    </figure>
                </div>
                <div className='col-4 text-center lg:text-6xl md:text-6xl text-3xl font-medium flex items-center justify-center'>
                    <p>RECRUIT</p>
                </div>
                <div className='col-4 '>
                    <figure className='flex flex-col justify-center  '>
                        <img src={usFlaglogo} className=" ml-auto  md:w-16 w-11 " alt="leafLogo" />
                        <figcaption className='caption justify-center md:mr-1 mx-5 relative mt-1 text-xs text-red-600 font-semibold  '>
                            <div className="flex justify-center">
                                Language
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                </svg>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default TopBar