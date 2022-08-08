import React, { useState } from 'react'
import uk from "../../assets/images/u_k.png"
import ReactFlagsSelect from 'react-flags-select';
import './topform.css'
const TopForm = () => {

    const [select, setSelect] = useState("SE");
    const onSelect = (code) => setSelect(code);
    console.log("SELECT", select);
    return (
        <section className='row mb-1'>
            <div className="col-12">
                <div className='text-center mt-5 relative form_input '>
                    {/* <img src={uk} className="w-14 absolute left-[32%]" /> */}
                    <ReactFlagsSelect
                        selected={select}
                        onSelect={onSelect}
                        showSelectedLabel={false}
                        showOptionLabel={false}
                    />
                    <div className='flex justify-end form-field'>
                        <input type="text " className=" focus:outline-none border-0 w-[64%]  placeholder:font-Poppins placeholder:font-medium p-2" placeholder="Your Name?" />
                        <button className='bg-light-red border-red-600 w-1/5 h-[40px] text-white font-Poppins font-medium'>Enter</button>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default TopForm