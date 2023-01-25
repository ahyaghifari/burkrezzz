import React, {useState} from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import db, { storage } from '../../service/firebase';
import { v4 } from "uuid";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

const NewBurgers = () => {
    var navigate = useNavigate();
    const [image, setImage] = useState("");

    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("")
    const [description, setDescription] = useState("");
    const burgerRef = collection(db, "burgers");

    function handleUpload() {
        if (!image) {
            alert("FILL IMAGE FIRST");
        }

        const path = `images/${image.name + v4()}`;
        const refimage = ref(storage, path);
        const uploading = uploadBytesResumable(refimage, image);

        uploading.on('state_changed', (snapshot) => { }, (error) => { }, () => {
            getDownloadURL(uploading.snapshot.ref).then((downloadURL) => {
                addDoc(burgerRef, { name: name, image: downloadURL, description: description, pathImage: path, time: Timestamp.now() });
                navigate("/burgers");
            });
        });
    }

    return (
        <div id='newburgers' className='pt-20 h-screen lg:h-max font-nunito px-3 bg-yel md:pt-24 lg:pt-32 pb-20'>
            <h1 className='font-bowlby text-3xl text-yel p-1 bg-pur w-fit md:text-4xl '>NEW BURGER</h1>
            <div id="form-burger" className='mt-5 w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-5/12'>
                <div className='flex flex-col'>
                    <label className='font-semibold text-pur text-xl'>Name</label>
                    <input type="text" onChange={(event) => {setName(event.target.value)}} className='bg-pur rounded-md p-2 focus:outline-none focus:bg-yellow-100 text-yellow-100 focus:text-pur' placeholder='Name...' />
                </div>
                <div className="flex flex-col mt-5">
                    <label className='font-semibold text-pur text-xl'>Image</label>
                    <input type="file" className='w-fit' onChange={(event) => { setImage(event.target.files[0]) }} />
                </div>
                <div className="flex flex-col mt-5">
                    <label className='font-semibold text-pur text-xl'>Description</label>
                    <textarea cols="30" rows="10" onChange={(event) => {setDescription(event.target.value)}} className='bg-pur rounded-md p-2 focus:outline-none focus:bg-yellow-100 text-yellow-100 focus:text-pur' placeholder='Description'></textarea>
                </div>
                <button onClick={handleUpload} className='mt-8 uppercase bg-pur p-2 rounded-md text-yel'>Upload</button>
           </div> 
        </div>
    );
}

export default NewBurgers;
