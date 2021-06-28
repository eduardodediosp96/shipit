import { auth } from 'firebase';
import  { useState, useEffect } from 'react'
import firebase from '../firebase';

const useAuth = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((usuario) => {
            if(usuario) {
                setAuthenticatedUser(usuario);
            } else {
                setAuthenticatedUser(null);
            }
        });

        return () => unsubscribe();
    }, [])
    
    return authenticatedUser;
}

export default useAuth;