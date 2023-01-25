import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-yel fixed w-full z-50 p-2 flex justify-between items-center'>
            <p className='font-bowlby bg-pur p-1 text-lg text-yel -rotate-2 rounded-md'>Burkrezzz</p>
            <img src="https://img.icons8.com/ios-glyphs/90/5E227F/beefburger.png" className='cursor-pointer fixed bottom-4 w-[40px] p-1 rounded-full right-4 bg-whi  nav-toggle hover:bg-yel hover:scale-105 transition duration-300 md:w-[50px] lg:hidden' />

            <nav id='nav-header' className='fixed lg:static bg-pur uppercase bottom-0 h-2/6 left-0 w-full font-bowlby flex flex-col lg:flex-row p-3 justify-evenly text-left border-t text-yel text-3xl border-yel lg:text-pur lg:bg-transparent lg:top-0 lg:w-5/12 lg:text-lg'>
                
                <img src="https://img.icons8.com/ios-glyphs/40/F2F4FB/delete-sign.png" className='w-[25px] absolute top-2 right-2 nav-toggle cursor-pointer lg:hidden'/>

                <NavLink to={"/"} className="w-fit hover:text-whi navs">HOME</NavLink>
                <NavLink to={"/burgers"} className="w-fit hover:text-whi navs">BURGERS</NavLink>
                <NavLink to={"/about"} className="w-fit hover:text-whi navs">ABOUT</NavLink>            
            </nav>

        </header>
    );
}

export default Header;
