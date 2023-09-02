import { View, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/Home";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { getCurrentUserGamePoints } from "../services/GameService";
import { MainStackNames } from "../utils/enum";
import HamBurger from "../svg/HamBurger";

export function Header(props) {
  return (
    // change the paddingTop to 2 while building an android app
    <View style={[{ flex: 1, flexDirection: "column", paddingHorizontal: 38, paddingBottom: 2, paddingTop: 32 }]}>
      <HeaderTopBar />
    </View>
  );
}

function HeaderTopBar(props) {
  const navigation = useNavigation();
  const [data, setData] = useState({ sPoints: 0, sCoins: 0, sUserName: "" });

  useFocusEffect(
    useCallback(() => {
      getCurrentUserGamePoints().then((res) => {
        const r = res.data[0];
        console.log("get game points start getting game data", res.data);
        if (r !== undefined) {
          setData(r);
        } else {
          console.log("set empty data");
          setData({ sPoints: 0, sCoins: 0, sUserName: "" });
        }
      });
    }, [])
  );

  return (
    <View style={[{ flex: 1, flexDirection: "row" }]}>
      <View style={styles.headerLeft}>
        <ImageBackground
          style={[styles.iconWrap, { width: 120, height: 59 }]}
          source={require("./../assets/app-logo.png")}
        />
      </View>
      <View style={styles.headerRight}>
        <View style={styles.coin}>
          <View style={styles.notify}>
            <Text style={[{ color: "#ffffff" }]}>{data.sCoins}</Text>
          </View>
          <Image style={[styles.iconWrap, styles.iconCoin]} source={require("./../assets/coin.png")} />
        </View>
        <View style={styles.coin}>
          <View style={[styles.notify, styles.cash]}>
            <Text style={[{ color: "#ffffff" }]}>{data.sPoints}</Text>
          </View>
          <Image style={[styles.iconWrap, styles.iconCoin]} source={require("./../assets/cash.png")} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainStackNames.ProfileMenu)}
          accessibilityLabel="Profile"
          accessibilityRole="button"
          style={{
            marginLeft: 16,
            marginRight: 8,
          }}
        >
          <HamBurger />
        </TouchableOpacity>
      </View>
    </View>
  );
}
