import { createContext, useEffect, useState } from "react";
import app from "./firebase.cofig";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import PropTypes from 'prop-types'; // ES6

const auth=getAuth(app)
export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)
    useEffect(()=>{
         const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setuser(currentuser)
            setloading(false)
        })
        return ()=>unsubscribe()
    },[])
    const createuser=(email,password)=>{
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
            
    }
    const signin=(email,password)=>{
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signout=()=>{
        setloading(true)
        return signOut(auth)
    }
    const authInfo={
        user,
        loading,
        createuser,
        signin,
        signout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
 AuthProvider.propTypes={
    children:PropTypes.node
 }
export default AuthProvider;