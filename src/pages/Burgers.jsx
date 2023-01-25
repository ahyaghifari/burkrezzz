import React, {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import BurgersComp from '../components/BurgersComp';
import  db  from '../service/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProtectedComp from '../service/ProtectedComp';

const Burgers = ({ login }) => {
    
    const [burgers, setBurgers] = useState([]);

    useEffect(() => {

        const getBurgers = async () => {
            const data = await getDocs(collection(db, "burgers"));
            setBurgers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getBurgers();
       
    }, []);


    return (
        <div className='pt-20 px-3 bg-yel md:pt-24 lg:pt-32 pb-20'>
            <h1 className="font-bowlby text-4xl md:text-5xl text-center text-pur">BURGERS</h1>

            {login ? <NavLink to={'/burgers/new'} className='bg-pur px-3 py-1 rounded-md text-yel text-lg mt-10 text-right' >New+</NavLink> : false}
            
            <div id='burgers-container' className='mt-16 font-nunito font-semibold text-pur flex flex-wrap uppercase justify-evenly'>

                {burgers.map((burger) => (
                    <BurgersComp
                        idburger={burger.id}
                        key={burger.id}
                        name={burger.name}
                        image={burger.image}
                    />
                ))}
                
            </div>

        </div>
    );
}

export default Burgers;
