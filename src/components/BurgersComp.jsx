import React from 'react';
import { Link } from 'react-router-dom';

const BurgersComp = ({ idburger, image, name, slug }) => {
    return (
        <div key={idburger} className="burgers w-5/12 md:w-4/12 lg:w-3/12 text-center my-2 cursor-pointer hover:scale-105 transition ease-in-out duration-500 hover:z-50 relative aspect-square">
            <Link to={"/burgers/" + idburger}>
                <img src={image} className="w-full object-contain h-3/4" alt="" />
                <p className='font-bowlby'>{ name }</p>
            </Link>
        </div>
    );
}

export default BurgersComp;
