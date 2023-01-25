import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import db, { storage } from '../../service/firebase';
import { v4 } from 'uuid';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const EditAbout = () => {

    const navigate = useNavigate();

    const [getAbout, setGetAbout] = useState([]);
    let [text, setText] = useState("");
    const [background, setBackground] = useState("");
    const aboutref = collection(db, "about");
    
    useEffect(() => {
        
        const getAbout = async () => {
            const getthedoc = doc(aboutref, "UyD5Zy3mF6cImAPbgjaQ");
            const docsnap = await getDoc(getthedoc);
            setGetAbout(docsnap.data());
        }
        
        getAbout();

    }, []);


    const handleUpdate = async () => {
        const docref = doc(db, "about", "UyD5Zy3mF6cImAPbgjaQ");

        if (text == "") {
            var taketext = document.getElementById('text-about').value;
            text = taketext;
        }

        if (!background) {
            await updateDoc(docref, {
                text: text
            });
            navigate("/about");
        } else {
            var path = document.getElementById('pathBackground').value;
            const imagepath = ref(storage, path);
            deleteObject(imagepath).then(() => {
                const path = `about/${background.name + v4()}`;
                const refimage = ref(storage, path);

                const upload = uploadBytesResumable(refimage, background);

                upload.on('state_changed', (snapshot) => { }, (error) => { }, () => {
                    getDownloadURL(upload.snapshot.ref).then((downloadurl) => {
                        updateDoc(docref, {
                            text: text,
                            background: downloadurl,
                            pathBackground: path
                        });
                        navigate("/about");
                    })
                })

            });
        }

        
    }

    return (
        <div id='edit-about' className='pt-20 px-3 font-nunito pb-10'>
            <h1 className='bg-pur text-yellow-100 font-bowlby w-fit  text-3xl p-2 rounded-md'>EDIT ABOUT</h1>
            <div id='about-form' className='mt-10 flex flex-col w-11/12 sm:w-9/12 md:w-7/12'>
                <div className='flex flex-col'>
                    <label className='text-xl text-pur mb-3' htmlFor="text">Text :</label>
                    <textarea id='text-about' defaultValue={getAbout.text} onChange={(event) => {setText(event.target.value)}} className='border border-pur p-2 text-pur rounded-md focus:outline-none focus:border-2' cols="30" rows="10"></textarea>
                </div>
                <div className='flex flex-col mt-10'>
                    <label className='text-xl text-pur mb-3' htmlFor="background">Background : </label>
                    <input type="file" name="" id="background" className='border border-pur rounded-md text-pur w-fit' onChange={(event) => { setBackground(event.target.files[0]) }} />
                    <input type="hidden" id='pathBackground' defaultValue={getAbout.pathBackground} />
                </div>
                <button onClick={() => {handleUpdate()}} className='w-fit mt-10 bg-pur text-yellow-100 p-2 rounded-md'>UPDATE</button>
            </div>
        </div>
    );
}

export default EditAbout;
