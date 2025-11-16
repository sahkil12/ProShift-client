import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    // providers    
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleCreate = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const userInfo = {
        createUser,
        googleCreate,
        loginUser,
        logOutUser,
        user,
        loading,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;