import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/StorageService";
import { getUserDetails, validateAccount } from "../services/ProfileService";

const initialState = { isAuthenticating: true, isAuthenticated: false, user: {} }
const url = "https://mmservice.smartechy.net/validateaccount";

export const AuthContext = createContext();
export function AuthContextProvider(props) {
    const [auth, setAuth] = useState(initialState);

    useEffect(() => {
        console.log("Auth Cox running")
        const userCheck = async () => {
            const { token } = await getUser()
            if (token != "") {
                const isValidate = await validateAccount(token)
                if (isValidate) {
                    const userData = await getUserDetails(token)
                    if (userData.error) {
                        setAuth({ isAuthenticating: false, isAuthenticated: false, user: {} });
                    } else {
                        setAuth({ isAuthenticating: false, isAuthenticated: true, user: userData.data })
                        // setErrorMessage(userData.error);
                    }
                } else {
                    setAuth({ isAuthenticated: false, isAuthenticating: false, user: {} })
                }
            } else {
                setAuth({ isAuthenticated: false, isAuthenticating: false, user: {} })
            }

        }
        setTimeout(() => {
            // getUser()
            //     .then(auth => {
            //         // console.log(auth)
            //         if (auth && auth.user) {
            //     }).catch(err => console.log("auth error"))
            userCheck()
        }, 3000);

    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}
