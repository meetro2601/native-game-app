import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { MadMoneyApp } from '../components/MadMoneyApp'
import { loginStyles } from '../styles/Login'
import { FontAwesome5 } from '@expo/vector-icons';
import { profileStyles } from '../styles/Profile';
import { useNavigation } from '@react-navigation/native';
import GoogleSignIn from '../components/Social/Google';
import { ScrollView } from 'react-native-gesture-handler';
import FacebookSignIn from '../components/Social/Facebook';

function SocialLogin() {
    const navigation = useNavigation();

    return (
        // <MadMoneyApp>
        <SafeAreaView style={{backgroundColor:"white",flex:1}}>
            <ScrollView contentContainerStyle={[loginStyles.p15, { alignItems: "center",backgroundColor:"white" }]}>
                <Image source={require("../assets/social.png")} />
                <Text style={[loginStyles.socialTitle]}>Let’s you in</Text>
                <View style={{ flex: 1, gap: 20, marginBottom: 20 }}>
                    <FacebookSignIn/>
                    <GoogleSignIn/>
                    <TouchableOpacity style={[loginStyles.socialContainer]}>
                        <View style={{ width: "20%" }}>
                            <FontAwesome5 name="apple" size={35} color="black" />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>Continue with Apple</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>or</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("Login")}
                    style={[loginStyles.font20, loginStyles.button, loginStyles.buttonPrimary, profileStyles.submitBtn]}
                    accessibilityRole="button"
                >
                    <Text style={[profileStyles.submitBtnText]}>Sign in with password</Text>
                </TouchableOpacity>
                <View style={[{ flexDirection: "row", alignItems: "center",marginVertical:10 }]}>
                    <Text style={[loginStyles.font18, loginStyles.signup]}>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                        <Text style={[loginStyles.signin, loginStyles.font18]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </SafeAreaView>
        // </MadMoneyApp>
    )
}

export default SocialLogin