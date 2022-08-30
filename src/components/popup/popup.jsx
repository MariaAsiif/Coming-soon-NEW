import React, { useState, useEffect, useRef } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { callApi, callPublicApi } from '../../utils/CallApi';

const PopUp = ({ permition, Toggle, Firstname, type, isVerify, email }) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otps, setOtps] = useState("");
  const [activeOtp, setActiveOtp] = useState(0);


  const optRef = useRef(null)



  const handleChange = (e, index) => {
    const { value } = e.target
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    if (!value) setActiveOtp(index - 1)
    else setActiveOtp(index + 1)
    let Otp = newOtp.join('')
    setOtps(Otp)
    setOtp(newOtp)
  }

  const handleKeyDown = (key, index) => {
    if (key === "Backspace") setActiveOtp(index - 1)

  }



  const handleClose = () => {
    Toggle(false)

  }


  const Verification = async (e) => {
    e.preventDefault()
    try {
      let payload = {
        email: email,
        emailverificationcode: otps
      }
      const response = await callPublicApi("/verifications/verifyemailCode", "post", payload)
      if (response.status === "Success") {
        isVerify(true)
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)

      }

    } catch (error) {

    }
  }





  useEffect(() => {
    optRef.current?.focus()
  }, [activeOtp])


  return (
    <>
      <Modal open={permition} onClose={handleClose} center>
        {type === "verification" ?
          <div>
            <div className="max-w-sm mx-auto md:max-w-lg">
              <div className="w-full">
                <div className="bg-white h-64 py-3 rounded text-center">
                  <h1 className="text-2xl font-bold">Email Verification</h1>
                  <div className="flex flex-col mt-4">
                    <span>we have sent you a code on your email please verify</span>
                  </div>

                  {otp.map((_, index) => {
                    return (
                      <React.Fragment key={index} >
                        <input
                          ref={index === activeOtp ? optRef : null}
                          className="m-2 mt-10 border h-10 w-10 text-center form-control rounded"
                          type="number"
                          value={otp[index]}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          id="first" maxlength="1" />
                        {/* <input
                          type="number"
                          className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                        /> */}
                        {index === otp.length - 1 ? null : (
                          <span className="w-2 py-0.5 bg-gray-400" />
                        )}
                      </React.Fragment>
                    );
                  })}

                  <div className="flex justify-center text-center mt-5">
                    <button className="btn bg-red-500 hover:bg-green-600 text-white" onClick={Verification}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :

          <div className='p-2 thank_you_form ' >
            <h1 className='text-[30px] font-bold'> Thank You </h1>
            <p className='text-[20px] font-bold  '>{Firstname?.fname} {Firstname?.fmname} {Firstname?.smname} </p>

            <p className='text-[15px] font-samibold mt-2'> Your submition has been recieved. </p>
            <p className='text-[15px] font-samibold '> We will be in touch and contact you soon!</p>
            <button onClick={handleClose} className='bg-blue-500 text-white'>Back to Site</button>
          </div>
        }
      </Modal>
    </>
  )
}

export default PopUp