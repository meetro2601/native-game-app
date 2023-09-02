import {createContext, useEffect, useState} from "react";
import { getUser } from "../services/StorageService";

const initialState = {isAuthenticating: true, isAuthenticated: false, user: {}}

export const AuthContext = createContext();
export function AuthContextProvider(props) {
    const [auth, setAuth] = useState(initialState);
    useEffect(() => {
        getUser()
        .then(auth => {
            if (auth && auth.user) {
                setAuth({isAuthenticated: true, isAuthenticating: false, user: auth.user})
            } else {
                setAuth({isAuthenticated: false, isAuthenticating: false, user: {}})
            }
        })
    })
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}
