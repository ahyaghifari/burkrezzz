import React from 'react';
import { NavLink } from 'react-router-dom'
import AnimatedPages from './AnimatedPages';

const Home = () => {
    return (

        <div id='home' className='bg-pur font-nunito'>
            <section id='welcome' className='bg-yel h-screen relative p-5 flex flex-col justify-center items-center'>
                <h1 className='font-bowlby text-5xl bg-pur text-yel p-3 translate-y-2 -rotate-2 lg:text-7xl rounded-md'>Burkrezzz</h1>
                
                <img id='burkrezzz-image' src="/images/burkrezzz.png" className='w-9/12 sm:w-8/12 md:w-7/12 z-10  md:right-0 lg:w-5/12 xl:w-4/12' alt="burkrezzz" />

                <p className='text-whi uppercase font-semibold text-center pt-10 md:text-xl lg:text-3xl z-10'>Delicious, Krezzz, Full</p>
                <div className='w-full bg-pur h-3/6 absolute bottom-0'></div>
            </section>

            <section id='intro' className='border-t border-yel p-2 overflow-hidden md:overflow-x-hidden relative md:overflow-visible md:h-screen flex flex-col justify-center md:items-start xl:overflow-hidden'>
                <h1 className='bg-pur font-bowlby text-4xl mt-10 text-whi text-center md:w-1/2 md:text-left md:text-5xl lg:text-6xl xl:text-7xl'>You got <span className='text-yel -rotate-5'> krezzz </span> every bite</h1>

                <img src="/images/burkrezzz.png" id='intro-image' className='mt-10 w-9/12 mx-auto sm:w-8/12 md:absolute md:w-6/12 md:right-0 lg:w-4/12 xl:w-5/12' alt="" />

                <h3 className='mt-24 p-2 text-center text-whi font-semibold text-sm md:text-xl md:w-1/2 md:text-left md:font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque commodi quibusdam exercitationem, optio iusto eligendi! Voluptas labore aliquid quam obcaecati?</h3>
            </section>

            <section id="burgers" className='bg-yel p-2 pb-20 flex flex-col relative overflow-hidden'>
                <h1 className='text-3xl md:text-4xl font-bowlby text-pur uppercase mt-20 md:w-7/12  lg:text-5xl'>Of course we have another, not just <span className='bg-pur text-yel'>krezzz</span> sandwich</h1>
                <img src="/images/burger.png" className='mt-16 w-8/12 mx-auto z-10 md:w-7/12 lg:w-5/12' alt="" />
                
                <NavLink to='/burgers' className={'mt-10 text-pur uppercase text-center border border-pur font-semibold p-2 transition ease-in-out hover:bg-pur hover:text-yel md:text-2xl w-fit self-end'}>Explore Burgers</NavLink>
                
            </section>

        </div>


        );
}

export default Home;
