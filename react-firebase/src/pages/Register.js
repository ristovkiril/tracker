import React, {useState} from "react";
import {auth, googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    }
    const googleSignUp = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <input
                placeholder={"Email..."}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder={"Password..."}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={signUp}>Sign up</button>
            <button onClick={googleSignUp}>Sign up with google</button>
        </div>
    )
}