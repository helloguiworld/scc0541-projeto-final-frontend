import { createContext, useState, useContext } from 'react';

const UserContext = createContext();
const SetUserContext = createContext();

export const useSetUser = () => {
    return useContext(SetUserContext);
}

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <SetUserContext.Provider value={setUser}>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </SetUserContext.Provider>
    );

}