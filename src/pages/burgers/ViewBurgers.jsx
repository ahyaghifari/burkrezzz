import React, {useState, useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import db from '../../service/firebase';
import { getDoc, doc} from "firebase/firestore";

const ViewBurgers = ({login}) => {
    let {id} = useParams();
    const [burger, setBurger] = useState([]);
    

    useEffect(() => {
    
        const getBurger = async (d) => {
            const ref = doc(db, "burgers", d);
            const get = await getDoc(ref);
            setBurger(get.data());
        }

        getBurger(id);
        
    }, []);
    
    return (
        <div className='pt-12 bg-pur h-screen flex flex-col md:flex-row'>
            <div id="view-burger-image" className='h-1/2 cursor-pointer flex items-center justify-center relative group bg-yellow-100 md:h-full md:w-1/2'>
                <img src={burger.image} className='h-3/4 md:h-fit md:w-10/12 z-10 group-hover:z-0 group-hover:scale-75 transition ease-in-out duration-200' alt="" />
                <h1 className="absolute top-5 break-all font-bowlby right-5 font-semibold w-1/2 text-6xl wrap text-pur text-right group-hover:scale-105 transition ease-in-out duration-200 sm:w-5/12 sm:text-7xl lg:text-8xl">{ burger.name }</h1>
            </div>
            <div id="view-burger-description" className='bg-pur p-2 lg:pt-20 md:w-4/6'>
                <h3 className='text-yel uppercase text-xl border-b border-yellow-100 py-3 font-bowlby md:text-3xl lg:text-4xl'>{ burger.name}</h3>
                <p className='mt-8 text-sm md:text-base h-max text-yellow-100 p-1 text-justify lg:w-8/12 mb-10'>{ burger.description }</p>
                
                {login ? <NavLink to={`/burgers/edit/${id}`} className='mt-10 text-yellow-100 border border-yellow-100 rounded-md p-1 '>Edit</NavLink> : false}
                
            </div>
        </div>
    );
}

export default ViewBurgers;
