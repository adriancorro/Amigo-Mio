import React, {useState, useEffect, createContext} from 'react'

export const AppContext = createContext();

export const AppProvider = ({children})=> {
    const [userEmail, setUserEmail] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [buttonFavStatus, setButtonFavStatus] = useState(null);
    const [dataBooksFavorites, setDataBooksFavorites] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [buttonFavStatusDelete, setButtonFavStatusDelete] = useState(null);
    useEffect(()=> {
        setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }, []);
    return (
        <AppContext.Provider value={{
            userEmail,
            buttonFavStatus,
           currentUser,
           dataBooksFavorites,
           isAdmin,
           buttonFavStatusDelete,
           setIsAdmin,
           setCurrentUser,
           setButtonFavStatus,
          setDataBooksFavorites,
          setUserEmail,
          setButtonFavStatusDelete
         }}>
            {children}
        </AppContext.Provider>
    )



}

