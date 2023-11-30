import React from 'react'
import facebook from "./assets/facebook.svg"
import instagram from "./assets/instagram.svg"
import Twitter from './assets/Twitter.svg'
function Footer() {
  return (
    <div className='h-56 bg-slate-200 flex'>
       <div>
        <div>
            <p className='font-serif mx-32 text-xl pt-10'>SwiftCart</p>
        </div>
        <div className='flex mx-32 space-x-2'>
            <div><img src={facebook} className='h-5  mt-2' alt="" /></div>
            <div><img src={instagram} alt="" className='h-5  mt-2'  /></div>
            <div><img src={Twitter} alt="" className='h-5  mt-2'  /></div>
        </div>
       </div>
       <div>
        <div>
            <p className='pt-10 text-lg  font-serif font-medium'>SHOP</p>
        </div>
        <div className='font-serif text-md'>
            <p>Product</p>
            <p>Overview</p>
            <p>Releases</p>
            <p>Pricing</p>
        </div>
       </div>
       <div></div>
       <div></div>
    </div>
  )
}

export default Footer