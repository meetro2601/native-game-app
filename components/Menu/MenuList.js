import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import MenuItem from "./MenuItem";
import Group11 from "../../assets/Group11.png";
import Group10 from "../../assets/Frame11863.png";
import Group12 from "../../assets/Group12.png";
import Group13 from "../../assets/Group13.png";
import Group14 from "../../assets/Group14.png";
import Group15 from "../../assets/Group15.png";
import Group17 from "../../assets/Group17.png";
import Group18 from "../../assets/Group18.png";

const MENU_ITEMS = [
  {
    title: "Earnings & Rewards",
    subItems: [
      { title: "Cash Balance", icon: Group10 },
      { title: "Coins", icon: Group12 },
      { title: "Refer & Earn", icon: Group13 },
      { title: "Other Rewards", icon: Group14 },
    ],
    img: Group11,
    id: "earn",
  },
  {
    title: "Help",
    subItems: [],
    img: Group15,
    id: "help",
  },
  {
    title: "About",
    subItems: [],
    img: Group17,
    id: "about",
  },
  {
    title: "Logout",
    subItems: [],
    img: Group18,
    id: "logout",
  },
];

const MenuList = () => {
  return (
    <SafeAreaView style={{ marginTop: 24 }}>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem listItem={item} />}
      />
    </SafeAreaView>
  );
};

export default MenuList;
