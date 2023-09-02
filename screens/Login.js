import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { loginStyles } from "../styles/Login";
import { BackSvg } from "../svg/BackSvg";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Buffer } from "buffer";
import { TextInput } from "react-native-paper";
import EmailSvgComponent from "../svg/EmailSvg";
import PasswordSvgComponent from "../svg/PasswordSvg";
import { persistUser } from "../services/StorageService";
import { profileStyles } from "../styles/Profile";

export function Login(props) {
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
      <TouchableOpacity style={[loginStyles.headerLeft, loginStyles.HeaderLeftButton]}>
        <BackSvg />
      </TouchableOpacity>
      <View style={[loginStyles.headerMid]} />
      <TouchableOpacity style={[loginStyles.headerRight]} />
    </View>
  );
}
function Form(props) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputIdentifier) => setFocusedInput(inputIdentifier);
  const handleBlur = () => setFocusedInput(null);

  const handleLogin = async () => {
    setErrorMessage("");
    const url = "https://mmservice.smartechy.net/validateaccount";
    const payload = {
      userId: email,
      Pwd: password,
    };
    const username = email;
    const passwordis = password;
    const credentials = username + ":" + passwordis;
    console.log(credentials);
    const encodedCredentials = Buffer.from(credentials, "utf-8").toString("base64");
    console.log(encodedCredentials);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedCredentials,
      mode: "no-cors",
    });

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data["message"]);
      if (data["message"] == "Success") {
        console.log("response is:");
        console.log(data);
        setLoading(false);
        console.log("success");
        const user = { name: email };
        persistUser(user, encodedCredentials).then((auth) =>
          setAuth({ isAuthenticating: false, isAuthenticated: true, user: user })
        );
      } else {
        setErrorMessage(data["message"]);
        setLoading(false);
        setAuth({ isAuthenticating: false, isAuthenticated: false, user: {} });
      }
    } catch (error) {
      setErrorMessage("Sorry, unable to login. Please check your email and password");
      console.error("Error:", error);
      setLoading(false);
      setAuth({ isAuthenticating: false, isAuthenticated: false, user: {} });
    }
  };

  return (
    <View style={[loginStyles.form, { marginTop: 20 }]}>
      <ImageBackground style={loginStyles.formLogo} source={require("./../assets/app-logo.png")} />
      <Text style={loginStyles.formTitle}>Login to Your Account</Text>

      {errorMessage ? <Text style={{ color: "red" }}>{errorMessage}</Text> : null}
      <View style={[loginStyles.formLabel, loginStyles.formLabelIcon]}>
        <TextInput
          style={[loginStyles.formInput]}
          value={email}
          onChangeText={setEmail}
          theme={{ roundness: 10 }}
          mode="outlined"
          placeholder="Email"
          outlineStyle={{
            borderWidth: 2,
            borderColor: focusedInput === "input1" ? "rgb(28, 126, 241)" : "#D3CFCF",
          }}
          onFocus={() => handleFocus("input1")}
          onBlur={handleBlur}
          left={<TextInput.Icon icon={() => <EmailSvgComponent />} onPress={() => {}} />}
        />
      </View>
      <View style={[loginStyles.formLabel, loginStyles.formLabelIcon]}>
        <TextInput
          style={[loginStyles.formInput]}
          value={password}
          mode="outlined"
          onChangeText={setPassword}
          theme={{ roundness: 10 }}
          left={<TextInput.Icon icon={() => <PasswordSvgComponent />} onPress={() => {}} />}
          outlineStyle={{
            borderWidth: 2,
            borderColor: focusedInput === "input2" ? "rgb(28, 126, 241)" : "#D3CFCF",
          }}
          onFocus={() => handleFocus("input2")}
          onBlur={handleBlur}
          placeholder="Password"
          secureTextEntry
        />
        <ImageBackground style={[loginStyles.iconEmail]} />
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={[loginStyles.font20, loginStyles.button, loginStyles.buttonPrimary, profileStyles.submitBtn]}
        accessibilityRole="button"
      >
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <Text style={[profileStyles.submitBtnText]}>Sign in</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[loginStyles.font20, loginStyles.button, loginStyles.mt20, loginStyles.buttonWithoutBG]}>
        <Text style={loginStyles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={[{ flexDirection: "row" }]}>
        <Text style={[loginStyles.font18, loginStyles.signup, loginStyles.mt30]}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[loginStyles.signin, loginStyles.mt30]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
