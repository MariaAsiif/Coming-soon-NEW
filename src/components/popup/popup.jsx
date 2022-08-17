import React, { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const PopUp = ({ permition, Toggle, Firstname }) => {
  console.log("nae", Firstname)
  const [show] = useState(permition);

  const handleClose = () => Toggle(false);

  return (
    <>
      <Modal open={show} onClose={handleClose} center>
        <div className='p-2 thank_you_form ' >
          <h1 className='text-[30px] font-bold'> Thank You </h1>
          <p className='text-[20px] font-bold  '>{Firstname.fname} {Firstname.fmname} {Firstname.smname} </p>

          <p className='text-[15px] font-samibold mt-2'> Your submition has been recieved. </p>
          <p className='text-[15px] font-samibold '> We will be in touch and contact you soon!</p>
          <button onClick={handleClose} className='bg-blue-500 text-white'>Back to Site</button>
        </div>
      </Modal>
    </>
  )
}

export default PopUp