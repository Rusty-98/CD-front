import React from 'react'
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io'

const Footer = () => {
    const insta = "https://www.instagram.com/rustygenius_98/"
    const linkedin = "https://www.linkedin.com/in/sumit-singh-developer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"

    const handleclick = (link) => {
        window.open(link, '_blank')
    }


    return (
        <div className='w-full h-14 px-4 bg-black text-white flex items-center justify-between absolute bottom-0 left-0 z-20 border-2 border-x-0 border-b-0 border-t-white rounded-t-lg'>
            <div className='font-bold tracking-wide text-3xl select-none'>
                Rusty
            </div>
            <div className='flex items-center font-bold text-4xl gap-2'>
                <IoLogoInstagram className='cursor-pointer' onClick={() => handleclick(insta)} />
                <IoLogoLinkedin className='cursor-pointer' onClick={() => handleclick(linkedin)}/>
            </div>
        </div>
    )
}

export default Footer