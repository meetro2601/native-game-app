import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import MenuItem from "./MenuItem";
import Group11 from "../../assets/Group11.png";
import money from "../../assets/money.png";
import coins from "../../assets/coins.png";
import customer from "../../assets/customer.png";
import trophy from "../../assets/trophy.png";
import Group15 from "../../assets/Group15.png";
import Group17 from "../../assets/Group17.png";
import Group18 from "../../assets/Group18.png";

const MENU_ITEMS = [
  {
    title: "Earnings & Rewards",
    subItems: [
      { title: "Cash Balance", icon: money },
      { title: "Coins", icon: coins },
      { title: "Refer & Earn", icon: customer },
      { title: "Other Rewards", icon: trophy },
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

const MenuList = ({handleLayer}) => {
  return (
    <SafeAreaView style={{ marginTop: 24 }}>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if(item.id == "logout"){
            return <MenuItem handleLayer={handleLayer} listItem={item} />
          } else{
            return <MenuItem listItem={item} />
          }   
          }}
      />
    </SafeAreaView>
  );
};

export default MenuList;
