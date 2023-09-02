import { StyleSheet } from "react-native";
import { baseStyles } from "./Base"

export const landingStyles = StyleSheet.create({
    ...baseStyles,
    landingBG: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        backgroundColor: 'green',
    },
    pl30: {
        paddingLeft: 30,
    },
    pr30: {
        paddingRight: 30,
    },
    font20: { fontSize: 20 },
    mb20: { marginBottom: 20 },
    mt20: { marginTop: 20 },
    heading: {
        fontWeight: 600,
        fontSize: 32,
        color: '#ffffff',
        fontFamily: "Inika",
        lineHeight: 32,
        //animation: 'scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both',
    },
    paragraph: {
        fontWeight: 400,
        //animation: 'scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both',
        color: '#ffffff'
    }
});
