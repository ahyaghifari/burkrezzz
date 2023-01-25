import React, {useState, useEffect} from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import db, { storage } from '../../service/firebase';
import { v4 } from "uuid";
import { addDoc, collection, deleteDoc, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { stringify } from '@firebase/util';

const NewBurgers = () => {
    var navigate = useNavigate();
    const { id } = useParams();

    const [getBurger, setGetBurger] = useState([]);
    const [getIdBurger, setgetIdBurger] = useState([])
    const burgerRef = collection(db, "burgers");

    
    useEffect(() => {
        const gettheBurger = async (id) => {
            const getthedoc = doc(burgerRef, id);
            const docsnap = await getDoc(getthedoc);

            setGetBurger(docsnap.data());
            setgetIdBurger(docsnap.id);
        }
        
        gettheBurger(id);
        
    }, []);
    
    
    const [image, setImage] = useState("");
    let [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("")
    let [description, setDescription] = useState("");


    const handleUpdate = async () => {
        const docref = doc(burgerRef, id);

        if (name == "" || description == "") {
            var takename = document.getElementById('name-input').value;
            var takedesc = document.getElementById('desc-input').value;
            name = takename;
            description = takedesc;
        }

        if (!image) {
            await updateDoc(docref, {
                name: name,
                description: description
            });
            navigate("/burgers");

        } else {
            var takeimagepath = document.getElementById('pathImage').value;
            const imagepath = ref(storage, takeimagepath);
            deleteObject(imagepath).then(() => {

                const path = `images/${image.name + v4()}`;
                const refimage = ref(storage, path);
                const uploading = uploadBytesResumable(refimage, image);

                uploading.on('state_changed', (snapshot) => { }, (error) => { }, () => {
                    getDownloadURL(uploading.snapshot.ref).then((downloadURL) => {
                        updateDoc(docref, { name: name, image: downloadURL, description: description, pathImage: path});
                        navigate("/burgers");
                    });
                });
                
            })
                    
        }
    }

    const handleDelete = async () => {
        var alert = confirm("Are You Sure?");

        if (alert == true) {
            var takeimagepath = document.getElementById('pathImage').value;
            const imagepath = ref(storage, takeimagepath);
            deleteObject(imagepath).then(() => {
                deleteDoc(doc(db, "burgers", id));
                navigate("/burgers");
            })
        } else {
            return false;
        }

    }


    return (
        <div id='newburgers' className='pt-20 font-nunito px-3 bg-pnk md:pt-24 lg:pt-32 pb-20'>
            <h1 className='font-bowlby text-3xl text-yel p-1 bg-pur w-fit md:text-4xl '>EDIT BURGER</h1>
            <div id="form-burger" className='mt-5 w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-5/12'>
                <div className='flex flex-col'>
                    <label className='font-semibold text-yellow-100 text-xl'>Name</label>
                    <input type="text" id='name-input' defaultValue={getBurger.name} onChange={(event) => {setName(event.target.value)}} className='bg-pur rounded-md p-2 focus:outline-none focus:bg-yellow-100 text-yellow-100 focus:text-pur' placeholder='Name...' />
                </div>
                <div className="flex flex-col mt-5">
                    <label className='font-semibold text-yellow-100 text-xl'>Image</label>
                    <input type="file" className='w-fit' onChange={(event) => { setImage(event.target.files[0]) }} />
                    <input type="hidden" id="pathImage" defaultValue={getBurger.pathImage} />
                </div>
                <div className="flex flex-col mt-5">
                    <label className='font-semibold text-yellow-100 text-xl'>Description</label>
                    <textarea cols="30" rows="10" id='desc-input' onChange={(event) => { setDescription(event.target.value) }} className='bg-pur rounded-md p-2 focus:outline-none focus:bg-yellow-100 text-yellow-100 focus:text-pur' placeholder='Description' defaultValue={getBurger.description}></textarea>
                </div>
                <button onClick={() => { handleUpdate() }} className='mt-8 uppercase bg-pur p-2 rounded-md text-yel'>Update</button>
           
                <button onClick={() => { handleDelete() }} className='block mt-10 border border-pur text-yel p-2 rounded-md'>DELETE</button>
            </div> 
        </div>
    );
}

export default NewBurgers;
