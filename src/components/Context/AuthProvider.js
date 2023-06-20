import {auth} from '../../Firebase/firebaseConfig.js';
import {createContext, useEffect, useState} from 'react'


export const UserContext = createContext()


function AuthProvider({children}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) =>{
            if(user){
                const { displayName, email, uid, photoURL } = user
                setUser({ displayName, email, uid, photoURL });
            }
        })
        return () => unsubscribed()
    }, [])
    return ( 
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
     );
}

export default AuthProvider;