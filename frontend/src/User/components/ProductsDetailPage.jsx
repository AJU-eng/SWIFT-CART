import React from 'react'
import apple from "./product images/apple.jpg"
import image1 from "./product images/images.jpeg"
import pod from "./product images/pod.jpg"
import airpod from "./categoryImages/airpod.jpg"
import earbud from "./categoryImages/earbud.png"

function ProductsDetailPage() {
  return (
    <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-6'>
            <img src={apple} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
            <div className='flex flex-row justify-between h-16'>
               <img src={image1} alt="" className='w-16 h-16 rounded-md'  />
               <img src={pod} alt="" className='w-16 h-16 rounded-md' />
               <img src={airpod} alt="" className='w-16 h-16 rounded-md' />
               <img src={earbud} alt="" className='w-16 h-16 rounded-md' />
            </div>
        </div>
        <div className='flex flex-col'>
        <div>
            <span className='text-violet-600 font-medium'></span>
        </div>
        </div>
    </div>
  )
}

export default ProductsDetailPage