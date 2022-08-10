import React from 'react'
import FollowUs from '../socialIcons/Icons'

const Footer = () => {
    return (
        <footer className='bscontainer-fluid bg-light-red d-flex text-white text-xs text-center font-normal py-3 footer '>
            COPYRIGHTS © 2022 HPORX LTD, IRELAND. ALL RIGHTS RESERVED.
            <span className='footer_text'>
                |  <span className='hover:underline cursor-pointer'>PRIVACY POLICY </span>
                | <span className='hover:underline cursor-pointer' >+44 1223 298541 </span>
                | <span className='hover:underline cursor-pointer' > TERMS OF USE </span>
                | <span className='hover:underline cursor-pointer' > DIGITAL AGENCY SERVICES </span>
                | <span className='hover:underline cursor-pointer' >SITE DIRECTORY </span>
            </span>
            <div className='footer_social '>
                <FollowUs />
            </div>
        </footer>
    )
}

export default Footer