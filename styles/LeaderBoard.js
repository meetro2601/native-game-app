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
        marginBottom: 20,
        // marginHorizontal: 12,
        alignContent: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        gap:15,
        padding: 15,
        flexGrow:1
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // minWidth:80,
        borderRadius: 10,
        height: 45,
        borderColor: '#CBCBCB',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        transition: 'all 0.2s ease-in-out',
        // marginRight: 5
    },
    tabButtonActive: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        //  minWidth:80,
        borderRadius: 10,
        height: 45,
        borderTopColor: '#157BF2',
        borderColor: "#fff",
        backgroundColor:"#ffffff",
        borderTopWidth: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        transition: 'all 0.2s ease-in-out',
        // marginRight: 5
    },
    tabButtonText: {
        fontFamily: "Mulish",
        fontSize: 18,
        fontWeight: 500,
        color: '#454752B3',
    },
    btnActive: {
        color: "#157bf2"
    },
    userStage: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        //flexWrap: "wrap",
        // borderWidth: 2,
        marginBottom:20,
        // height: 220,
        // bottom:20,
        flex: 1,
    },
    userStageBlock: {
        // margin: 0,
        // position: "relative",
        marginVertical:20,
        flex: 2,
        // backgroundColor:"plum",/
        gap: 20,
        // alignContent:"center",
        // justifyContent:"center",
        // borderWidth:2,
        // backgroundColor:"plum",
        // height:"100%"
    },
    userStageBlock2: {
        zIndex: 2,
        flex: 1,
        gap: 20,
        left:10
        // height:"100%"
    },
    userStageBlock3: {
        zIndex: 2,
        flex: 1,
        gap: 20,
        left:-15
        // height:"100%"
    },
    img: {
        // borderColor: "#0F5E58",
        shadowColor: "rgba(15, 94, 88, 0.25)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 24,
        shadowOpacity: 12,
        // height: 80,
        // width: 80,
        // borderRadius: 40,
        // borderSize: 5,
        // borderStyle: "solid",
    },
    backgroundRank2: {
        borderColor: '#0F5E58',
        borderWidth: 6
    },
    backgroundRank3: {
        borderColor: '#040B4D',
        borderWidth: 6
    },
    backgroundRank1: {
        borderColor: '#E22982',
        borderWidth: 6
    },
    img1: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    img2: {
        height: 90,
        width: 90,
        borderRadius: 1000,
    },
    img3: {
        height: 75,
        width: 75,
        borderRadius: 1000,
    },
    font24: { fontSize: 24 },
    winner: {
        alignSelf: "center",
        justifyContent: "center",
        // position: "absolute",
        bottom: 20,
        // left: "50%",
        width: 30,
        height: 30,
        // marginLeft: -15,
        borderRadius: 15,
    },
    blast: {
        height: 200,
        width: 300,
        marginLeft: 40,
        marginTop: -20,
    },
    crown: {
        alignSelf: 'center',
        position: "relative",
        top: -25
    },
    rankText: {
        lineHeight: 30,
        fontWeight: 600,
        color: '#ffffff',
        textAlign: "center",
    },
    winner2: {
        backgroundColor: '#0F5E58',
        shadowColor: "#0F5E58",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        shadowOpacity: 0.4,
    },
    winner1: {
        backgroundColor: '#E22982',
        shadowColor: "#E22982",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        shadowOpacity: 0.4,
        // elevation:50
        // position: "absolute",
    },
    winner3: {
        backgroundColor: "#040B4D",
        shadowColor: "#040B4D",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        shadowOpacity: 0.4,
    },
    imgCaption: {
        // alignItems: "center",
        // justifyContent: "center",
        // position: "",
        // bottom: -80,
        // top:50,
        fontFamily: "Mulish",
        textAlign: "center",
        fontWeight: 400,
        fontSize: 18,
    },
    recentMatch: {
        fontFamily: "Mulish",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 12,
        // backgroundColor: "red",
        // marginTop: 20,
        marginBottom:40,
        // width: "100%",
        flex:1,
        // elevation:1,
        marginHorizontal:15,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        // paddingLeft: 20,
        // paddingRight: 20,
        // borderWidth:1,
    },
    recentMatchHead: {
        //paddingLeft: 20,
        //paddingRight: 20,
        //background: "linear-gradient(90deg, #157BF2 0%, rgba(21, 123, 242, 0) 109.08%)",
        height: 90,
        width: "100%"
    },
    recentMatchHeadText: {
        color: "#ffffff",
        fontWeight: 900,
        fontSize: 28,
        lineHeight: 90,
        textAlign: "center",
    },
    gameResultItem: {
        padding: 5,
        position: "relative",
        // flexDirection: "row",
        //alignItems: "center",
        // justifyContent: "space-around",
        borderBottomColor: "#D9D9D9",
        // borderBottomWidth: 1,
        // borderStyle: "solid",
        // backgroundColor: "#FAFAFF",
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
        // backgroundColor: "#FAFAFF",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        color: "#000000",
        fontWeight: 700,
    },
    playerRow:{
        flex: 1, flexDirection: "row", height: 40,
        backgroundColor:"#FAFAFF",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 0.85,
        borderStyle: "solid",
        alignItems:"center"
    },
    selectedRow:{
        flex: 1, flexDirection: "row", height: 40,
        backgroundColor:"#FAFAFF",
        borderColor: "#157bf2",
        borderWidth: 3,
        borderStyle: "solid",
        alignItems:"center"
    },
    scoreBox:{
        backgroundColor:"#2FBF0A",
        width:60,
        height:20,
        borderRadius:10,
        alignItems:"center",justifyContent:"center"
    },
    scoreText:{
        color: "#fff",
        fontWeight: 600,
        fontSize: 12,
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
