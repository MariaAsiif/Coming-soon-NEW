import React, { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const PopUp = ({ permition ,Toggle}) => {

  const [show, setShow] = useState(permition);

  const handleClose = () => Toggle(false);
  const handleShow = () => setShow(true);
  console.log("per" , permition)

  return (
    <>
      <Modal open={show} onClose={handleClose} center>
        <div className='p-2' >
         <h1> Please Select File </h1> 
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit ipsa dolores facere perferendis odit? Esse veritatis repellat voluptas facilis tenetur? Harum sint consequuntur quas at, repellendus sit optio aliquid ullam?
        </div>
      </Modal>
    </>
  )
}

export default PopUp