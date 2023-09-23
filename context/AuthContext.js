import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/StorageService";

const initialState = { isAuthenticating: true, isAuthenticated: false, user: {} }
const url = "https://mmservice.smartechy.net/validateaccount";

export const AuthContext = createContext();
export function AuthContextProvider(props) {
    const [auth, setAuth] = useState(initialState);
    
    useEffect(() => {
        // console.log("Auth Cox running")
        const validateUser = async () => {
            const { user, token } = await getUser()
            if(token != "" && user != ""){
                const headers = new Headers({
                    "Content-Type": "application/json",
                Authorization: "Basic " + token,
                mode: "no-cors",
            });
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                // body: JSON.stringify(payload),
            });
            console.log("auth", response.status)
            const data = await response.json();
            // console.log(data)
            if (response.status == 200) {
                setAuth({ isAuthenticated: true, isAuthenticating: false, user: user })
            } else {
                setAuth({ isAuthenticated: false, isAuthenticating: false, user: {}})
            }
        }else{
            setAuth({ isAuthenticated: false, isAuthenticating: false, user: {}})
        }

        }
        setTimeout(() => {
            // getUser()
            //     .then(auth => {
            //         // console.log(auth)
            //         if (auth && auth.user) {
            //     }).catch(err => console.log("auth error"))
            validateUser()
        }, 3000);

    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}
