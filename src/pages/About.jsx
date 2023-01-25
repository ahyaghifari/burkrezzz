import React, {useState, useEffect} from 'react';
import db from '../service/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';

const About = ({login}) => {

    const [about, setAbout] = useState([]);

    useEffect(() => {
        
        const getAbout = async () => {
            const ref = doc(db, "about", "UyD5Zy3mF6cImAPbgjaQ");
            const get = await getDoc(ref);
            setAbout(get.data());
        }

        getAbout();

    }, []);


    return (
        <div id="about" className='px-3 bg-pnk h-screen flex flex-col justify-center items-center overflow-hidden relative'>
            <h1 className='text-5xl text-yel font-bowlby mt-10 bg-pur w-fit p-2 rounded-md md:text-6xl z-10'>ABOUT</h1>
            <p className='mt-10 text-whi text-center md:text-xl md:w-9/12 lg:w-8/12 font-semibold z-10'>{ about.text }</p>
            <img id="about-bg" className='w-1/2 object-contain absolute opacity-80' src={about.background} alt="" />
            
            {login ? <NavLink to={'/about/edit'} className='bg-pur text-yel z-10 mt-10 px-3 py-1 rounded-md '>Edit</NavLink> : false }


        </div>
    );
}

export default About;
