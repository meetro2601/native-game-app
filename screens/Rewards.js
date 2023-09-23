import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Back } from "../components/Back";
import { profileStyles } from "../styles/Profile";
import { MadMoneyApp } from "../components/MadMoneyApp";
import SeparationLineSVG from "../svg/SeparationLineSVG";
import { Ionicons } from '@expo/vector-icons';
import nike from "../assets/nike.png"
import adidas from "../assets/adidas.png"
import HM from "../assets/HM.png"
import snap from "../assets/snapchat.png"
import spotify from "../assets/spotify.png"
import lyft from "../assets/lyft.png"
import starbuck from "../assets/starbucks.png"
import { useEffect, useState } from "react";
import { loginStyles } from "../styles/Login";
import { BackSvg } from "../svg/BackSvg";
import { useNavigation } from "@react-navigation/native";

const rewardsList = [
    {
        text: "15% off Your Next Order",
        logo: nike,
        bgColor: "#269ee1"
    },
    {
        text: "15% off Your Next Order",
        logo: snap,
        bgColor: "#fffc00"
    },
    {
        text: "15% off Your Next Order",
        logo: adidas,
        bgColor: "#1e70b9"
    },
    {
        text: "15% off Your Next Order",
        logo: starbuck,
        bgColor: "#0e6206"
    },
    {
        text: "15% off Your Next Order",
        logo: lyft,
        bgColor: "#fc0cec"
    },
    {
        text: "15% off Your Next Order",
        logo: HM,
        bgColor: "#e00008"
    },
    {
        text: "15% off Your Next Order",
        logo: lyft,
        bgColor: "#fc0cec"
    },
    {
        text: "15% off Your Next Order",
        logo: spotify,
        bgColor: "#1cdb73"
    },
]

export function Rewards(props) {
    const [col1List, setcol1List] = useState([])
    const [col2List, setcol2List] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (rewardsList.length != 0) {
            const list1 = rewardsList.filter((item, index) => index % 2 == 0)
            setcol1List(list1)

            const list2 = rewardsList.filter((item, index) => index % 2 != 0)
            setcol2List(list2)
        }
    }, [rewardsList])


    return <>
        {/* <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}> */}

        <Header />
        <ScrollView contentContainerStyle={{ backgroundColor: "white", minHeight: "100%", flexDirection: "row", justifyContent: "space-between", gap: 12, paddingHorizontal: 20, paddingBottom: 70 }}>
            <View style={{ flex: 1, gap: 8, }}>
                {
                    col1List && col1List.map((item, index) => {
                        return <View key={index} style={styles.couponContainer}>
                            <View style={[styles.logoContainer, { backgroundColor: item.bgColor }]}>
                                <Image resizeMode="contain" style={{ height: "100%" }} source={item.logo} />
                                <SeparationLineSVG />
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={[styles.couponText]}>{item.text}</Text>
                                <View style={styles.actionContainer}>
                                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                        <Ionicons name="paper-plane-outline" size={24} color="#d9d9d9" />
                                        <Text style={{ color: "#aeaeae" }}>1.2 km</Text>
                                    </View>
                                    <Ionicons style={{}} name="heart-outline" size={32} color="#d9d9d9" />
                                </View>
                            </View>
                        </View>
                    })
                }
            </View>
            <View style={{ flex: 1, gap: 8, position: "relative", top: "-10%" }}>
                {
                    col2List && col2List.map((item, index) => {
                        return <View key={index} style={styles.couponContainer}>
                            <View style={[styles.logoContainer, { backgroundColor: item.bgColor }]}>
                                <Image resizeMode="contain" style={{ height: "100%", maxWidth: "100%" }} source={item.logo} />
                                <SeparationLineSVG />
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={[styles.couponText]}>{item.text}</Text>
                                <View style={styles.actionContainer}>
                                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                        <Ionicons name="paper-plane-outline" size={24} color="#d9d9d9" />
                                        <Text style={{ color: "#aeaeae" }}>1.2 km</Text>
                                    </View>
                                    <Ionicons style={{}} name="heart-outline" size={32} color="#d9d9d9" />
                                </View>
                            </View>
                        </View>
                    })
                }
            </View>
        </ScrollView>
    </>
    {/* </SafeAreaView> */ }
}

function Header(props) {
    const navigation = useNavigation()
    return (
        <View style={[{ zIndex: 50, backgroundColor: "white", paddingHorizontal: 20, height: 50, flexDirection: "row", alignItems: "center", gap: 15 }]}>
            <TouchableOpacity style={[loginStyles.headerLeft, loginStyles.HeaderLeftButton]}
                accessibilityLabel="Back"
                accessibilityRole="button"
                onPress={() => navigation.navigate("Home")}>
                <BackSvg />
            </TouchableOpacity>
            <Text style={[profileStyles.headerMid, profileStyles.font20]}>Coupon</Text>
            {/* <TouchableOpacity style={[profileStyles.headerRight]} /> */}
        </View>
    );
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
    couponText: {
        fontSize: 17,
        alignSelf: "center",
        fontWeight: 500,
        marginTop: 5,
    },
    couponContainer: {
        height: width * 0.6,
        // maxWidth:250,
        maxHeight: 280,
        elevation: 5,
        shadowColor: "grey",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#d3cfcf"
    },
    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // padding: 8,
    },
    textContainer: {
        flex: 1.25,
        alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 5,
        gap: 15,
    },
    actionContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 8
    }
});