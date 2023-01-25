import React, {useState} from 'react';
import { auth } from '../../service/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Login = ({login, setLogin}) => {

    login ? <Navigate to={'/login'} /> : <Outlet />

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setLogin(true);
            navigate("/");
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div id='login' className='font-nunito flex justify-center items-center bg-yellow-100 h-screen'>
            <div id="login-comp" className='flex flex-col h-1/2 bg-pur py-3 px-2 w-8/12 rounded-md md:w-6/12 lg:w-4/12'>
                <h3 className='uppercase text-3xl text-center text-yellow-100 font-semibold'>Login</h3>
                <div className='flex flex-col mt-7 w-11/12 mx-auto'>
                    <label htmlFor="email" className='text-yellow-100'>Email</label>
                    <input type="email" id="email" onChange={(event) => { setLoginEmail(event.target.value) }}  className='focus:outline-none bg-pur p-2 border border-yellow-100 rounded-sm text-yellow-100 focus:bg-yellow-100 focus:text-pur transition duration-150 ease-in-out' placeholder='Email...' autoFocus />
                </div>
                
                <div className='flex flex-col mt-5 w-11/12 mx-auto'>
                    <label htmlFor="password" className='text-yellow-100'>Password</label>
                    <input type="password" id="password" onChange={(event) => { setLoginPassword(event.target.value) }}  className='focus:outline-none bg-pur p-2 border border-yellow-100 rounded-sm text-yellow-100 focus:bg-yellow-100 focus:text-pur transition duration-150 ease-in-out' placeholder='Password...' />
                </div>
                
                <button className='bg-yellow-100 w-fit px-5 py-1 rounded-md mt-10 self-center text-pur hover:bg-pur hover:border hover:border-yellow-100 hover:text-yellow-100' onClick={handleLogin}>Login</button>

            </div>
        </div>
    );
}

export default Login;
