import React from 'react';
import { Colors } from '../constant';
import './Styles/Navbar.css'

const Navbar = ({ user }) => {  // Destructure user here
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase()
    };

    return (
        <div className='w-full h-[70px] md:h-24 bg-gray-700 rounded-b-xl px-1 md:px-4 flex items-center justify-between'>
            <div className='bg-black text-white flex items-center justify-center border-2 border-white rounded-xl px-6 py-2 font-bold tracking-wide md:text-3xl cursor-pointer'>
                Code Discuss
            </div>
            <div className='w-[50%] flex items-center gap-2 justify-end'>
                {
                    user && user.map((name, index) => (
                        <div key={index} style={{ backgroundColor: Colors[index + 1] }} className={`nameLogo cursor-pointer font-bold relative text-white border-2 border-white w-7 h-7 md:w-12 md:h-12 text-lg md:text-2xl flex items-center justify-center rounded-full mx-1`}>
                            {capitalize(name)}
                            <div className='title w-fit bg-white text-[12px] text-black -bottom-7 px-2 py-0 rounded-md tracking-wide font-bold'>{name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Navbar;
