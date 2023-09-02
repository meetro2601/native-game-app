import { StyleSheet } from "react-native";

export const leaderBoardStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
    mb70: { marginBottom: 70 },
    p15: { padding: 15 },
    tabs: {
        //marginTop: 5,
        marginBottom: 30,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        rowGap:0,
        columnGap:20,
        padding:15,
        flex:1
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 10,
        height: 52,
        borderColor: '#CBCBCB',
        backgroundColor: '#ffffff',
        borderWidth:1,
        transition: 'all 0.2s ease-in-out',
        marginRight:5
    },
    tabButtonActive: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 10,
        height: 52,
        borderTopColor: '#157BF2',
        borderLeftColor: 'rgb(203, 203, 203)',
        borderRightColor: 'rgb(203, 203, 203)',
        borderBottomColor: 'rgb(203, 203, 203)',
        backgroundColor: '#ffffff',
        borderWidth:3,
        transition: 'all 0.2s ease-in-out',
        marginRight:5
    },
    tabButtonText: {
        fontFamily: "Mulish",
        fontSize: 20,
        fontWeight: 700,
        color: 'rgba(69, 71, 82, 0.7)',
    },
    userStage: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        //flexWrap: "wrap",
        marginTop: 100,
        marginBottom: 0,
        flex:1,
    },
    userStageBlock: {
        margin: 0,
        position: "relative",
        marginTop:-70
    },
    userStageBlock2: {
        zIndex:2,
        left:40,
        marginTop:-30,
        // alignItems:"center"
        textAlign:"center"
    },
    userStageBlock3: {
        zIndex:2,
        left:-40,
        marginTop:-30,
    },
    img: {
        borderColor: "#0F5E58",
        shadowColor: "rgba(15, 94, 88, 0.25)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 24,
        shadowOpacity: 12,
        height: 80,
        width: 80,
        borderRadius: 40,
        // borderSize: 5,
        // borderStyle: "solid",
    },
    backgroundRank2:{
        borderColor:'#0F5E58',
        borderWidth:6
    },
    backgroundRank3:{
        borderColor:'#040B4D',
        borderWidth:6
    },
    backgroundRank1:{
        borderColor:'#E22982',
        borderWidth:6
    },
    img1: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    font24: { fontSize: 24 },
    winner: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: -6,
        left: "50%",
        width: 30,
        height: 30,
        marginLeft: -15,
        lineHeight: 30,
        borderRadius: 15,
    },
    blast:{
        height:200,
        width:300,
        marginLeft:40,
        marginTop:-20,
    },
    crown: {
        marginLeft:-20,
        left:"50%",
        top:"-10%"
    },
    rankText: {
        fontWeight: 600,
        color: '#ffffff',
    },
    winner2: {
        backgroundColor: '#0F5E58',
    },
    winner1: {
        bottom: -15,
        backgroundColor: '#E22982',
        position: "absolute",
    },
    winner3: {
        backgroundColor: "#040B4D"
    },
    imgCaption: {
        // alignItems: "center",
        // justifyContent: "center",
        position: "absolute",
        bottom: -80,
        fontFamily: "Mulish",
        textAlign:"center",
        fontWeight: 400,
        fontSize:18
    },
    recentMatch: {
        fontFamily: "Mulish",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 4, height: 4 },
        //shadowRadius: 12,
        backgroundColor: "#ffffff",
        marginTop: 130,
        width:"100%",
        //marginLeft:10,
        //marginRight:20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    recentMatchHead: {
        //paddingLeft: 20,
        //paddingRight: 20,
        //background: "linear-gradient(90deg, #157BF2 0%, rgba(21, 123, 242, 0) 109.08%)",
        height: 90,
        width:"100%"
    },
    recentMatchHeadText: {
        color: "#ffffff",
        fontWeight: 600,
        fontSize: 32,
        lineHeight: 90,
        textAlign:"center"
    },
    gameResultItem: {
        padding: 5,
        position: "relative",
        flexDirection: "row",
        //alignItems: "center",
        justifyContent: "space-around",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#FAFAFF",
    },
    gameResultItemB: {
        // padding: 5,
        // position: "relative",
        // flexDirection: "row",
        // //alignItems: "center",
        // justifyContent: "space-around",
        // borderBottomColor: "#D9D9D9",
        // borderBottomWidth: 1,
        // borderStyle: "solid",
        backgroundColor: "#FAFAFF",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        color: "#000000",
        fontWeight: 700,
    },
    font14: { fontSize: 14 },
    pr5: { paddingRight: 5 },
    player: {
        width: 80,
        overflow: "hidden",
    },
    playerText: {
        color: "#000000",
        fontWeight: 600,
        fontSize: 14,
    },
    playerImg: {
        marginLeft: 5,
        marginRight: 5,
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    vs: {
        flexDirection: "row",
        alignItems: "center",
        color: "#000000",
        fontWeight: 600,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
    },
    vsText: {
        fontSize: 14,
        fontWeight: 600,
        color: "#000000",
    },
    bot: {
        flexDirection: "row",
        alignItems: "center",
        color: "#000000",
        fontWeight: 600,
    },
    botImg: {
        marginLeft: 5,
        marginRight: 5,
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    botPlayer: {
        width: 80,
        overflow: "hidden",
    },
    pl5: { paddingLeft: 5 },
    win: {
        padding: 3,
        backgroundColor: "#2FBF0A",
        borderRadius: 10,
        color: "#ffffff",
        width: 60,
        flexBasis: 60,
        overflow: "hidden",
    },
    winText: {
        color: "#ffffff",
    },
    loose: {
        backgroundColor: "#F52F13",
        borderRadius: 10,
        color: "#ffffff",
        width: 60,
        flexBasis: 60,
        overflow: "hidden",
    },
});
