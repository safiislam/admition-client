/* eslint-disable react/prop-types */
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from './../firebase/firebase.config';
import { createContext } from 'react'
import { useState, useEffect } from 'react';

const googleProvider = new GoogleAuthProvider()
const fbprovider = new FacebookAuthProvider()
export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const registers = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const resetPassword = (email) => {
        setLoader(true)
        return sendPasswordResetEmail(auth, email)
    }
    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }
    const fbSignin = ()=>{
        setLoader(true)
        return signInWithPopup(auth,fbprovider)
    }
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }
    const setNameAndPhoto = ({ name, url }) => {
        setLoader(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
    }

    const authInfo = {
        user,
        registers,
        loader,
        login,
        googleLogin,
        setNameAndPhoto,
        logOut,
        resetPassword,
        fbSignin

    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            setLoader(false)
            setUser(currentUser)
            console.log(currentUser)
            // if(currentUser?.email){
            //     fetch('http://localhost:5000/jwt',{
            //         method:'POST',
            //         headers:{
            //             'Content-Type':'application/json'
            //         },
            //         body: JSON.stringify({email : currentUser?.email})
            //     })
            //     .then(res=>res.json())
            //     .then(data => localStorage.setItem('access-token',data?.token))
            // }
            // else{
            //     localStorage.removeItem('access-token')
            // }
            

        })
        return () => {
            return unsubcribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;