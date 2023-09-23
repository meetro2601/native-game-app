import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ImageBackground, Button } from "react-native";
import { loginStyles } from "../styles/Login";
import { useNavigation } from "@react-navigation/native";
import { Buffer } from "buffer";
import { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import EmailSvgComponent from "../svg/EmailSvg";
import PasswordSvgComponent from "../svg/PasswordSvg";
import { AuthContext } from "../context/AuthContext";
import { Back } from "../components/Back";
import { persistUser } from "../services/StorageService";
import { profileStyles } from "../styles/Profile";

export function Signup(props) {
  return (
    <SafeAreaView style={[loginStyles.container]}>
      <ScrollView style={[loginStyles.container, loginStyles.p15]}>
        <Header />
        <Form />
      </ScrollView>
    </SafeAreaView>
  );
}

function Header(props) {
  return (
    <View style={[loginStyles.header]}>
      <Back />
      <View style={[loginStyles.headerMid]} />
      <TouchableOpacity style={[loginStyles.headerRight]} />
    </View>
  );
}

function Form(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    const url = "https://mmservice.smartechy.net/signupuser?pCredentials=";
    const username = email;
    const passwordis = password;
    const credentials = username + ":" + passwordis;
    const encodedCredentials = Buffer.from(credentials, "utf-8").toString("base64");
    console.log(encodedCredentials);
    console.log("ready to register");

    const headers = new Headers({
      "Content-Type": "application/json",
      mode: "no-cors",
    });

    try {
      setLoading(true);
      const response = await fetch(url + encodedCredentials, {
        method: "POST",
        headers: headers,
      });
      const data = await response.json();
      console.log(data);
      if ("message" in data && data["message"] == "success") {
        console.log("response is:");
        console.log(data);
        setLoading(false);
        console.log("success");
        const user = { name: email };
        persistUser(user, encodedCredentials).then((auth) =>
          setAuth({ isAuthenticating: false, isAuthenticated: true, user: user })
        );
      } else {
        setErrorMessage(data["mmError"]);
        setAuth({ isAuthenticating: false, isAuthenticated: false, user: {} });
      }
    } catch (error) {
      setErrorMessage("Sorry, unable to register. Please try later");
      console.error("Error:", error);
      setAuth({ isAuthenticating: false, isAuthenticated: false, user: {} });
    }
  };

  // const continueWithGoogle = () => {
  //   console.log("Sign In With Google");
  // };

  return (
    <View style={[loginStyles.form, { marginTop: 20 }]}>
      <ImageBackground style={loginStyles.formLogo} source={require("./../assets/app-logo.png")} />
      <Text style={loginStyles.formTitle}>Create an account</Text>
      {errorMessage ? <Text style={{ color: "red" }}>{errorMessage}</Text> : null}
      <View style={[loginStyles.formLabel, loginStyles.formLabelIcon]}>
        <TextInput
          style={[loginStyles.formInput]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          mode="outlined"
          theme={{ roundness: 10 }}
          left={<TextInput.Icon icon={() => <EmailSvgComponent />} onPress={() => {}} />}
        />
      </View>
      <View style={[loginStyles.formLabel, loginStyles.formLabelIcon]}>
        <TextInput
          style={[loginStyles.formInput]}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          mode="outlined"
          theme={{ roundness: 10 }}
          left={<TextInput.Icon icon={() => <PasswordSvgComponent />} onPress={() => {}} />}
        />
      </View>
      <TouchableOpacity
        onPress={handleSignup}
        style={[loginStyles.font20, loginStyles.button, loginStyles.buttonPrimary,profileStyles.submitBtn]}
        accessibilityRole="button"
      >
        <Text style={[profileStyles.submitBtnText]}>Sign up</Text>
      </TouchableOpacity>
      {/* <Button title="Sign In With Google" onPress={continueWithGoogle} /> */}
      <View style={[{ flexDirection: "row",alignItems:"center" }]}>
        <Text style={[loginStyles.font18, loginStyles.signup, loginStyles.mt30]}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[loginStyles.signin,loginStyles.font18, loginStyles.mt30]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
