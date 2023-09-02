import {ImageBackground} from "react-native";
import {landingStyles} from "../styles/Landing";

export function Loading(props) {
    return (
            <ImageBackground source={require("../assets/crash.jpg")} style={[landingStyles.container, landingStyles.landingBG, {width: '100%', height: '100%'}, ]} />
    )
}