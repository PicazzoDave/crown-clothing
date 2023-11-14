import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: () => null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {

        const unsubscribe = onAuthStateChangedListener((user) => {
            
            //Only create a user docuemnt if a user comes through
            if (user) {
                createUserDocumentFromAuth(user);
            }
            //When null, the user is signed out. When user successfully authenticated, return user object.
            setCurrentUser(user);
        });

        //Clean up the Listner methoed
        return unsubscribe; 
    }, []);
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}