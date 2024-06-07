import React, { useState } from 'react';
import { Colors } from '../constant';
import './Styles/Navbar.css'

const Navbar = ({ user }) => {


    const [open, setOpen] = useState(false);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase()
    };

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className='w-full h-[70px] md:h-[90px] bg-gray-700 rounded-b-xl px-1 md:px-4 flex items-center justify-between absolute top-0 left-0 z-20 select-none'>
            <div className='bg-black text-white flex items-center justify-center border-2 border-white rounded-xl px-6 py-2 font-bold tracking-wide md:text-3xl cursor-pointer'>
                Code Discuss
            </div>
            <div className='w-[50%] hidden md:flex items-center gap-2 justify-end'>
                {
                    user && user.map((name, index) => (
                        <div key={index} style={{ backgroundColor: Colors[index + 1] }} className={`nameLogo cursor-pointer font-bold relative text-white border-2 border-white w-7 h-7 md:w-12 md:h-12 text-lg md:text-2xl flex items-center justify-center rounded-full mx-1 select-none`}>
                            {capitalize(name)}
                            <div className='title w-fit bg-white text-[14px] text-black -bottom-7 px-2 py-0 rounded-md tracking-wide font-bold select-none'>{name}</div>
                        </div>
                    ))
                }
            </div>
            <div className='w-[50%] flex flex-col items-end md:hidden md:items-center gap-2 justify-end'>
                <div className={`bg-black text-xl font-bold tracking-wider py-1 px-2 rounded-md text-white`} onClick={handleOpen}>
                    Users ⮛
                </div>
                <div className={`bg-[#ffffff3b] backdrop-blur-lg border-2 border-white absolute flex flex-wrap justify-start items-start top-[57px] right-1 p-2 rounded-md text-white ${open ? 'open' : 'close'}`}>
                    {
                        user && user.map((name, index) => (
                            <div key={index} style={{ backgroundColor: Colors[index + 1] }} className={`nameLogo cursor-pointer font-bold relative text-white border-2 border-white w-7 h-7 md:w-12 md:h-12 text-lg md:text-2xl flex items-center justify-center rounded-full mx-1 select-none ${open ? '' : 'NameClose'}`}>
                                {capitalize(name)}
                                <div className='title w-fit bg-white text-[10px] md:text-[14px] text-black -bottom-7 px-2 py-0 rounded-md tracking-wide font-bold select-none'>{name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
