import React from 'react'
import SideBarDesign from './SideBarDesign'

function RootLayout({children}) {
  return (
    <div className='flex gap-5'>
        <SideBarDesign/>
        <main className='max-w-5xl flex-1 mx-auto py-4'>{children}</main>

    </div>
  )
}

export default RootLayout