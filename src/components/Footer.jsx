import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../service/firebase';
import { signOut } from 'firebase/auth';

const Footer = ({ login, setLogin }) => {
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        signOut(auth).then(() => {
            setLogin(false);
            navigate("/");
        });
    }

    return (
        <footer className='bg-pur font-nunito py-20 px-3 md:flex md:flex-wrap md:justify-evenly'>
            <div id="nav" className="text-whi uppercase flex flex-col lg:text-xl">
                {login ? <button onClick={() => {handleLogout()}} className='w-fit my-1 uppercase underline'>Logout</button> : false}
                <NavLink to={'/'} className="w-fit my-1">Home</NavLink>
                <NavLink to={'/burgers'} className="w-fit my-1">Burgers</NavLink>
                <NavLink to={'/about'} className="w-fit my-1">About</NavLink>
                
            </div>

            <div id="media-sosial" className="mt-16 md:mt-0">
                <p className="text-lg text-whi">Kunjungi kami juga di</p>
                <div className="flex">
                <a href="https://facebook.com" target="_blank" className="mx-1"
                    ><img
                    src="https://img.icons8.com/material-sharp/35/f5f5f5/facebook.png"
                /></a>
                <a href="https://twitter.com" target="_blank" className="mx-1"
                    ><img src="https://img.icons8.com/material-sharp/35/f5f5f5/twitter.png"
                /></a>
                <a href="https://instagram.com" target="_blank" className="mx-1"
                    ><img
                    src="https://img.icons8.com/material-sharp/35/f5f5f5/instagram-new.png"
                /></a>
                <a href="https://tiktok.com" target="_blank" className="mx-1"
                    ><img src="https://img.icons8.com/material-sharp/35/f5f5f5/tiktok.png"
                /></a>
                <a href="https://youtube.com" target="_blank" className="mx-1"
                    ><img
                    src="https://img.icons8.com/material-sharp/35/f5f5f5/youtube-play.png"
                /></a>
                </div>
            </div>

            <div id="copyright" className="text-whi text-sm mt-20 py-1 md:mt-0">
                <p>Copyright2022 | Privacy Policy | Terms Of Use</p>
                <p>Burkrezzz | a React project by <a href="http://ahyaghifari.github.io" className="underline" target="_blank">ahyaghifari</a></p>
            </div>
        </footer>
    );
}

export default Footer;
