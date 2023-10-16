import { View, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/Home";
import { useNavigation} from "@react-navigation/native";
import { useContext } from "react";
import { MainStackNames } from "../utils/enum";
import HamBurger from "../svg/HamBurger";
import { GameContext } from "../context/GameContext";

export function Header(props) {
  return (
    // change the paddingTop to 2 while building an android app
    <View style={[{flexDirection: "column"}]}>
      <HeaderTopBar />
    </View>
  );
}

function HeaderTopBar(props) {
  const navigation = useNavigation();
  const [game] = useContext(GameContext);

  return (
    <View style={[{gap:20,padding: 0,marginHorizontal: 10, flexDirection: "row",justifyContent:'space-evenly',alignItems:"center"}]}>
      <View style={styles.headerLeft}>
        <ImageBackground
          style={[styles.iconWrap, { width: 120, height: 60 }]}
          source={require("./../assets/app-logo.png")}
        />
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={()=>navigation.navigate("Coins")} style={styles.coin}>
          <View style={styles.notify}>
            <Text style={[{ color: "#ffffff" }]}>{game.totalCoins}</Text>
          </View>
          <Image style={[styles.iconWrap, styles.iconCoin]} source={require("./../assets/coin.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Coins")} style={styles.coin}>
          <View style={[styles.notify]}>
            <Text style={[{ color: "#ffffff" }]}>{game.totalPoints}</Text>
          </View>
          <Image style={[styles.iconWrap, styles.iconCoin]} source={require("./../assets/cash.png")} />
        </TouchableOpacity>
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
