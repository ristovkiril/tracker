import React, {useEffect, useState} from "react";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../config/firebase";
import {CreateMovie} from "../components/CreateMovie";

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [editMovie, setEditMovie] = useState(null);

    const movieCollectionRef = collection(db, "movies")

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        try {
            const data = await getDocs(movieCollectionRef);
            const filtered = data?.docs?.map(doc => {
                return {...doc?.data(), id: doc.id};
            })
            console.log(filtered)
            setMovies(filtered);
        } catch (err) {
            console.error(err);
        }
    }

    const deleteMovie = async (movie) => {
        try {
            const data = await doc(db, "movies", movie?.id);
            await deleteDoc(data, movie);
            getMovies();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <CreateMovie editMovie={editMovie} setEditMovie={setEditMovie} refresh={getMovies} />
            {
                movies?.map(movie => <div style={{border: '1px solid black', display: "inline-block", margin: "10px", padding: "15px"}} key={movie?.id}>
                    <img src={movie?.image} width={200} height={"auto"} alt={"movie"} />
                    <h3 style={{ color: movie?.hasOscar ? "#bea524" : "#111" }}>{movie?.title}</h3>
                    <p>{movie?.releaseYear}</p>
                    <button onClick={() => deleteMovie(movie)}>
                        Delete
                    </button>
                    <button onClick={() => setEditMovie(movie)}>
                        Edit
                    </button>
                </div>)
            }
        </div>
    )
}