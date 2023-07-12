import {Register} from "./pages/Register";
import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth, db} from "./config/firebase";
import {getDocs, collection} from "firebase/firestore";
import {Movies} from "./pages/Movies";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setIsAuth(true)
        }
    })

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            {
                isAuth ?
                    <>
                        <button onClick={logout}>Logout</button>

                        <Movies />
                    </>
                    :
                    <Register/>
            }
        </div>
    );
}

export default App;
