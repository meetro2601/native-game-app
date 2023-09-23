import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
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
  return (
    <SafeAreaView style={styles.container}>
      <ProfileCard
        imageSource={require("../assets/Group19.png")}
        imageSource1={require("../assets/mditickdecagram.png")}
        name={auth.user.fullName}
        memberId="A1234Y"
        memberId1="123456"
      />
      <MenuList />
    </SafeAreaView>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
