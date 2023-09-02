import { ImageBackground, Text } from "react-native";
import { landingStyles } from "../styles/Landing";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export function Landing(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!auth.isAuthenticating && !auth.isAuthenticated) {
    //   setTimeout(() => {
        navigation.navigate("Login");
    //   }, 1000);
    }
  }, [auth.isAuthenticated, auth.isAuthenticating]);

  return (
    <ImageBackground
      source={require("../assets/crash.jpg")}
      style={[landingStyles.container, landingStyles.landingBG, { width: "100%", height: "100%" }]}
    >
      <Text style={[landingStyles.heading, landingStyles.pl30, landingStyles.pr30]}>Welcome to gameo!</Text>
      <Text
        style={[
          landingStyles.paragraph,
          landingStyles.font20,
          landingStyles.mb20,
          landingStyles.mt30,
          landingStyles.pl30,
          landingStyles.pr30,
        ]}
      >
        For those serious about the business of gaming, we understand that having a gaming laptop or computer is not
        enough.
      </Text>
    </ImageBackground>
  );
}
