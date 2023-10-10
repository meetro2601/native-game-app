import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { loginStyles } from '../../styles/Login'
import { FontAwesome5 } from '@expo/vector-icons';
import * as authorize from '@react-native-firebase/auth';
import { Buffer } from "buffer";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AuthContext } from '../../context/AuthContext';
import { persistUser } from '../../services/StorageService';
import { getUserDetails } from '../../services/ProfileService';

const FacebookSignIn = () => {
    const [initializing, setInitializing] = useState(false);
    const [auth,setAuth] = useContext(AuthContext);

    const addUserinDatabase = async (userInfo) => {
        // console.log(userInfo)
        const user = {
            name:userInfo.email,
            fullName: userInfo.name,
            email: userInfo.email,
            guid: userInfo.id
        }
        const encodedToken = Buffer.from(user.guid, "utf-8").toString("base64")
        const credentials = user.email + ":" + user.fullName + ":" + user.guid
        const encodedCredentials = Buffer.from(credentials, "utf-8").toString("base64");
        // console.log(encodedCredentials)
        // console.log(encodedToken)
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
        // console.log(data)
        if (data.message == "success" || data.mmError == "Login GUId already Exists") {
            const userData = await getUserDetails(encodedToken)
            if(userData.error){
                console.log("get userdetails error")
            }else{
                persistUser(encodedToken).then((auth) =>
                    setAuth({ isAuthenticating: false, isAuthenticated: true, user: {...userData.data,socialId:userInfo.uid,socialProvider:"facebook"}})
                ).catch(err => console.log("login error",err));
            }
            setInitializing(false)
        } else {
            setInitializing(false)
            setAuth({ isAuthenticating: false, isAuthenticated: false, user: {}})
        }
    }

    const onFacebookButtonPress = async () => {
        // Attempt login with permissions
        try {
            LoginManager.logOut()
            
            // await auth().signOut()
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            // console.log(result)
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = authorize.firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return authorize.firebase.auth().signInWithCredential(facebookCredential).then(res => {
                // console.log(res)
                addUserinDatabase(res.additionalUserInfo.profile)
            }).catch(err => console.log("Error while signing in"));;
        } catch (error) {
            console.log(error,"err")
        }
    }

    return (
        <TouchableOpacity onPress={() => onFacebookButtonPress()} style={[loginStyles.socialContainer]}>
            <View style={{ width: "20%" }}>
                <FontAwesome5 name="facebook" size={35} color="#157bf2" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Continue with facebook</Text>
        </TouchableOpacity>
    )
}

export default FacebookSignIn