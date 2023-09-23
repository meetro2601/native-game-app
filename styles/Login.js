import { StyleSheet } from "react-native";
import { baseStyles } from "./Base";

export const loginStyles = StyleSheet.create({
    ...baseStyles,
    p15: {padding: 15},
    header: {
        alignItems: "center",
        width: "100%",
        flexDirection: "row"
    },
    headerLeft: {
        //borderRadius: "50%",
        padding: 0,
    },
    headerRight: {
        //borderRadius: "50%",
        padding: 0,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    headerLeftButton: {width: 30, height:30},
    iconBack: {width: 20, height:20, },
    headerMid: {
        fontWeight: 500,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: "center"
    },
    formLogo: {
        width: 180,
        height: 99,
        marginBottom: 30,
        cursor: 'pointer'
    },
    form: {
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Roboto",
    },
    formTitle: {
        paddingBottom: 20,
        fontSize: 28,
        fontWeight: 500
    },
    formLabel: {
        marginBottom: 20,
        alignItems: "center",
        width: "100%",
        height: 50,
        position: "relative"
    },
    formLabelIcon: {
        flexDirection: "row-reverse",
        position: "relative",
        height: 60
    },
    formInput: {
        borderWidth: 0,
        opacity: 1,
        borderRadius: 30,
        //borderWidth:1,
        backgroundColor: '#FAFCFF',
        width: "100%"
    },
    iconEmail: {
        width: 20,
        height: 16,
        marginTop: -8
    },
    font20: {fontSize: 20},
    button: {
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 20,
        fontFamily: "Roboto",
        alignItems: "center",
        width: "100%",
        height: 60,
        fontWeight: 400
    },
    buttonPrimary: {
        color: '#ffffff',
        backgroundColor: '#157BF2',
        borderRadius: 30,
        justifyContent: "center",
        shadowColor: 'rgba(21, 123, 242, 0.25)',
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
    },
    buttonWithoutBG: {
        justifyContent: "center",
        color: '#157BF2',
        height: 'auto'
    },
    mt20: {marginTop:20},
    font18: {fontSize: 18},
    mt30: {marginTop: 30},
    mb30: {marginBottom: 30},
    signup: {
        color: '#AEAEAE',
        fontWeight: 500
    },
    signin: {
        color: '#157BF2',
    },
    forgotPassword: {
        color: '#157BF2',
        fontSize:16
    },
    socialTitle: {
        paddingBottom: 20,
        fontSize: 40,
        fontWeight: 600
    },
    socialContainer:{
        backgroundColor:"#fafcff",
        // flex:1,
        // width:"100%",
        flexDirection:"row",
        alignItems:"center",
        // justifyContent:"space-between",
        gap:10,
        borderWidth:0.5,
        height:65,
        marginHorizontal:20,
        // paddingVertical:12,
        paddingHorizontal:40,
        borderColor:"#d3cfcf",
        borderRadius:20
    }
});