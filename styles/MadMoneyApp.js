import { Platform, StatusBar, StyleSheet } from "react-native";
import { baseStyles } from "./Base";

export const MadMoneyAppStyles = StyleSheet.create({
    ...baseStyles,
    safeAreaContainer:{
        ...baseStyles.container,
        paddingTop:Platform.OS == "android" ? StatusBar.currentHeight : 0
    }
})