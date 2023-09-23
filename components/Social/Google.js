import * as authorize from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { loginStyles } from '../../styles/Login';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Buffer } from "buffer";
import { persistUser } from '../../services/StorageService';
import { getToken } from '../../services/GameService';

GoogleSignin.configure({
    webClientId: '520861881290-8eef9t9uc31gnjg1bjq581oou3md4c07.apps.googleusercontent.com',
});

export default function GoogleSignIn() {
    const [initializing, setInitializing] = useState(false);
    const [user, setUser] = useState();
    const [auth, setAuth] = useContext(AuthContext);

    const addUserinDatabase = async (userInfo) => {
        console.log(userInfo)
        const user = {
            name:userInfo.email,
            fullName: userInfo.displayName,
            email: userInfo.email,
            guid: userInfo.uid
        }
        const encodedToken = Buffer.from(user.guid, "utf-8").toString("base64")
        const credentials = user.email + ":" + user.fullName + ":" + user.guid
        const encodedCredentials = Buffer.from(credentials, "utf-8").toString("base64");
        const url = "https://mmservice.smartechy.net/socialsignupuser?pCredentials=";
        const headers = new Headers({
            "Content-Type": "application/json",
            mode: "no-cors",
        });
        const response = await fetch(url + encodedCredentials, {
            method: "POST",
            headers: headers,
        });
        const data = await response.json();
        if (data.message == "success" || data.mmError == "Login GUId already Exists") {
            persistUser(user, encodedToken).then((auth) =>
                setAuth({ isAuthenticating: false, isAuthenticated: true, user: user})
            ).catch(err => console.log("login error"));
            setInitializing(false)
        } else {
            setInitializing(false)
            setAuth({ isAuthenticating: false, isAuthenticated: false, user: {}})
        }
    }

    const handleGoogleSignin = async () => {
        setInitializing(true)
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const userInfo = await GoogleSignin.signIn();
            // console.log(user)

            // Create a Google credential with the token
            const googleCredential = authorize.firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
            // console.log(googleCredential)

            // Sign-in the user with the credential
            return authorize.firebase.auth().signInWithCredential(googleCredential).then(res => {
                addUserinDatabase(res.user)
            }).catch(err => console.log("Error while signing in"));
        } catch (error) {
            setInitializing(false)
            console.log("Initial Sign in cancelled")
        }

    }

    // useEffect(() => {
    //     const subscriber = authorize.firebase.auth().onAuthStateChanged(async (userInfo) => {
    //         // const storedToken = await getToken()
    //         // if (storedToken != "" && userInfo) {
    //         //     console.log("stored token", storedToken)
    //         //     setAuth({ isAuthenticating: false, isAuthenticated: true, user: user, isSocial: true })
    //         // }
    //         // else {
    //         //     console.log("user not logged in already")
    //         //     setAuth({ isAuthenticating: false, isAuthenticated: false, user: {}, isSocial: false });
    //         // }
    //         console.log("Google auth running")
    //     });

    //     // setTimeout(() => {
    //         return subscriber; // unsubscribe on unmount
    //     // }, 3000);
    // });

    return (
        <TouchableOpacity
            onPress={() => handleGoogleSignin()}
            style={[loginStyles.socialContainer]}>
            {
                initializing ? <ActivityIndicator size={30} style={{width:"100%"}} /> : <>
                    <View style={{ width: "20%" }}>
                        <Image style={{ width: 32, height: 32 }} source={require("../../assets/google.png")} />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 500 }}>Continue with Google</Text>
                </>
            }
        </TouchableOpacity>
    );
}