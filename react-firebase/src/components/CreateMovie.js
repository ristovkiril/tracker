import React, {useEffect, useRef, useState} from "react";
import {auth, db, storage} from "../config/firebase";
import {getDoc, addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes, uploadString, getDownloadURL} from "firebase/storage";

export const CreateMovie = ({ editMovie, setEditMovie, refresh }) => {
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState(0);
    const [hasOscar, setHasOscar] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);
    const inputFileRef = useRef(null);

    const movieCollectionRef = collection(db, "movies")

    useEffect(() => {
        if (editMovie) {
            setTitle(editMovie?.title);
            setReleaseYear(editMovie?.releaseYear || 0);
            setHasOscar(editMovie?.hasOscar || false);
        }
    }, [editMovie])

    const submitHandle = async () => {
        try {
            let image = editMovie?.imageUrl || null;
            if (fileUpload) {
                const fileFolderRef = ref(storage, `projectFiles/${fileUpload?.name}`)
                // const snapshot = await uploadString(fileFolderRef, uri, 'data_url')

                const imgRef = await uploadBytes(fileFolderRef, fileUpload);
                image = await getDownloadURL(imgRef.ref)
                console.log(image);
            }
            const data = {title, releaseYear, hasOscar, image};
            if (!editMovie) {
                data.createdBy = auth?.currentUser?.uid;
                data.updatedBy = null;

                await addDoc(movieCollectionRef, data);
                refresh();
            } else {
                data.updatedBy = auth?.currentUser?.uid;
                data.createdBy = editMovie?.createdBy;

                const movie = await doc(db, "movies", editMovie?.id);
                console.log(data);

                await updateDoc(movie, data);
                setEditMovie(null);
                refresh();
            }
            setTitle("");
            setReleaseYear(0);
            setHasOscar(false);
            setFileUpload(null);
            if (inputFileRef.current) {
                inputFileRef.current.value = null;
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <input
                placeholder={"Title..."}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type={"number"}
                value={releaseYear}
                placeholder={"Year..."}
                onChange={e => setReleaseYear(Number(e.target.value))}
            />
            <input
                type={"file"}
                onChange={e => setFileUpload(e.target.files[0])}
            />
            <input
                type={"checkbox"}
                checked={hasOscar}
                ref={inputFileRef}
                onFocus={e => e.target.value = null}
                onChange={e => setHasOscar(Number(e.target.checked))}
            />
            <label>Has oscar</label>
            <button onClick={submitHandle}>
                Save
            </button>
            {
                editMovie &&
                <button onClick={() => setEditMovie(null)}>
                    Cancel
                </button>
            }
        </div>
    )
}