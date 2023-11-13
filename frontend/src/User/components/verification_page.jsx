import React from 'react'
import sucess from "../components/assets/tick.png"
import { useNavigate } from 'react-router'
function VerificationPage() {
    const nav=useNavigate()
  return (
    <div>
        <div>
            <div className='flex justify-around'>
                <img src={sucess} className='h-24 mt-10' alt="" />

            </div>
            <div className='flex justify-around mt-3 text-lg'>
                <p className='font-serif'>Your Password has been reset successfully</p>
            </div>
            <div className='flex justify-around mt-3'>
                <p className='font-serif'>Now you can visit our website, Please checkout <span onClick={()=>nav("/")} className='text-green-600 underline'>Home page</span></p>
            </div>
        </div>
    </div>
  )
}

export default VerificationPage