import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { profileStyles } from '../../styles/Profile';
import { Back } from '../../components/Back';
import { AuthContext } from '../../context/AuthContext';
import { getUserGameWisePoints } from '../../services/GameService';

const ledger = [
  // {
  //   game: "Game 1",
  //   coins: "1000"
  // },
  {
    game: "Game 2",
    coins: "0"
  },
  {
    game: "Game 3",
    coins: "0"
  },
  {
    game: "Game 4",
    coins: "0"
  },
  {
    game: "Game 5",
    coins: "0"
  },
]

function Header(props) {
  return (
    <View style={[{ paddingHorizontal: 20, height: 50, flexDirection: "row", alignItems: "center", gap: 15 }]}>
      <Back />
      <Text style={[profileStyles.headerMid, profileStyles.font20]}>Coins Ledger</Text>
      {/* <TouchableOpacity style={[profileStyles.headerRight]} /> */}
    </View>
  );
}

const Coins = () => {
  const [data, setData] = useState([]);
  const [totalCoins, settotalCoins] = useState(0);
  const [auth,setAuth] = useContext(AuthContext)

  useEffect(() => {
    getUserGameWisePoints(auth.user.username).then((res) => {
      if(res.data.length > 0){
        const total = res.data.reduce((sum,game)=>sum+game.sCoins,0)
        setData(res.data)
        settotalCoins(total)
      }
      // // console.log("get game points start getting game data", res.data);
      // if (r !== undefined) {
      //   setData(r);
      // } else {
      //   console.log("set empty data");
      //   setData({ sPoints: 0, sCoins: 0, sUserName: "" });
      // }
    }).catch(err => console.log("header error"));
  }, [auth.user.username])
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <ScrollView contentContainerStyle={[{ justifyContent: "space-evenly", gap: 24, padding: 20, paddingTop: 5 }]}>
        <View style={{}}>
          <Image resizeMode='contain' style={{ left: -5 }} source={require("../../assets/coins-bag.png")} />
          <Text style={styles.coinText}>{totalCoins}</Text>
          <Text style={styles.coinSubText}>Total coin balance</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.coinText}>{totalCoins}</Text>
            <Text style={styles.coinSubText}>Lifetime earnings</Text>
          </View>
          <View>
            <Text style={styles.coinText}>0</Text>
            <Text style={styles.coinSubText}>Lifetime redeemded</Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={[styles.coinText, { textTransform: "uppercase",  }]}>Coin Ledger</Text>
          <View style={styles.tableBox}>
            <View style={[styles.tableRow, { marginBottom: 20 }]}>
              <Text style={styles.tableHeading}>Games</Text>
              <View style={{alignItems:"flex-start"}}>
              <Text style={[styles.tableHeading]}>Coins
              </Text>
                <Text style={[styles.tableHeading]}>Earned</Text>
              </View>
            </View>
            {/* <View style={[styles.tableRow]}>
                  <Text style={styles.tableText}>Game 1</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                    <Image resizeMode='contain' style={{ width: 45, aspectRatio: 1 }} source={require("../../assets/coins-bag.png")} />
                    <Text style={styles.tableText}>{data.sCoins}</Text>
                  </View>
                </View> */}
            {
              data.length > 0 && data.map(item => {
                return <View key={item.gamename} style={[styles.tableRow]}>
                  <Text style={styles.tableText}>{item.gamename}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                    <Image resizeMode='contain' style={{ width: 45, aspectRatio: 1 }} source={require("../../assets/coins-bag.png")} />
                    <Text style={styles.tableText}>{item.sCoins}</Text>
                  </View>
                </View>
              })
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Coins

const styles = StyleSheet.create({
  coinText: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: 500,
    marginBottom: 5
  },
  coinSubText: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: 500
  },
  tableBox: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    marginVertical:10,
    borderColor: "#d9d9d9",
    borderRadius: 12,
    padding: 25,
    gap: 12
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // gap:140,
    justifyContent: 'space-between',
    height: 50
  },
  tableHeading: {
    fontSize: 20,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    color: "#454752",
    fontWeight: 600,
    // width: 100,
    alignSelf: "flex-start"
  },
  tableText: {
    fontSize: 20,
    fontWeight: 400,
    fontFamily: "Roboto",
    color: "#000000"
  }
})