import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProfileCard from "../components/ProfileCard";
import Frame11863 from "../assets/Frame11863.png";
import Group12 from "../assets/Group12.png";
import Group13 from "../assets/Group13.png";
import Group14 from "../assets/trophy.png";
import MenuList from "../components/Menu/MenuList";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";

const cardData = [
  { title: "Cash Balance", img: Frame11863 },
  { title: "Coins", img: Group12 },
  { title: "Refer & Earn", img: Group13 },
  { title: "Other Rewards", img: Group14 },
];

const ProfileMenu = () => {
const [auth,setAuth] = useContext(AuthContext)
const [showLayer, setshowLayer] = useState(false)

const handleLayer = ()=>{
  setshowLayer(!showLayer)
}

  return (
    <SafeAreaView style={styles.container}>

      {showLayer && <View style={styles.layer}>
        <Text style={{color:"white", fontSize:30,fontWeight:"600"}}>Logging Out...</Text>
      </View>}
      <ProfileCard
        imageSource={require("../assets/user1.png")}
        imageSource1={require("../assets/mditickdecagram.png")}
        name={auth.user.fullName}
        memberId={auth.user.memberId}
        memberId1="123456"
        kyc={auth.user.kycDone}
        />
      <MenuList handleLayer={handleLayer}/>
    </SafeAreaView>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  layer:{
    backgroundColor:"#0000005a",
    position:"absolute",
    zIndex:100,
    top:0,
    bottom:0,
    right:0,
    left:0,
    justifyContent:"center",
    alignItems:"center"
  }
});
