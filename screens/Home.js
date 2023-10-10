import { SafeAreaView, ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, Button, StatusBar, BackHandler, useWindowDimensions, FlatList } from "react-native";
import { useEffect, useState, useRef, useContext } from "react";
import { styles } from "../styles/Home";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../services/GameService";
import { Video, ResizeMode } from "expo-av";
import RaymanGame from "../assets/games/Rayman.jpg";
import ZombieGame from "../assets/games/zombie.png";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { gamesList } from "../utils/gamesList";
import { GameContext } from "../context/GameContext";

export function Home(props) {
  const [data, setData] = useState({ token: "" });
  const [status, setStatus] = useState({});
  const navigation = useNavigation()

  const video = useRef(null);

  useEffect(() => {
    getToken().then((res) => {
      console.log("get token");
      if (res !== undefined) {
        console.log(res);
        // console.log(res);
        setData({ token: res });
        // console.log(data);
      } else {
        console.log("set empty data");
        setData({ token: "" });
      }
    }).catch(err => console.log("home error"));
  }, []);


  useEffect(() => {
    const handleBackButton = () => {
      navigation.isFocused() ? BackHandler.exitApp() : navigation.navigate("Home")
      return true
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);


  return (
      <MadMoneyApp>
        {/* <Header /> */}
        <View
          style={[
            {
              marginTop: 10, // 10
              marginHorizontal: 18,
              padding: 25,
              marginBottom: 6,
              backgroundColor: "#ffffff",
              elevation: 12,
              borderRadius: 12, // actual 8
              flex: 1,
            },
          ]}
        >
          {/* <View
            style={[
              {
                flex: 1,
                // padding: 10,
                borderRadius: 12,
                backgroundColor: "plum",
                // alignItems: "center",
              },
            ]}
          > */}
          {/* <View style={videoStyles.container}> */}
          <TouchableOpacity
            activeOpacity={0.1}
            onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
          >
            <Video
              ref={video}
              style={{ alignSelf: "center", height: 170, width: "100%", borderRadius: 15 }}
              source={{
                uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              // useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping={false}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </TouchableOpacity>
          {/* </View> */}
          {/* </View> */}
        </View>
        <View style={[{ padding: 5, marginLeft: 2 }]}>
          <View style={[{ flexDirection: "column", marginTop: 4 }]}>
            <Text style={styles.popularGameTitle}>Popular Games</Text>

            <View
              style={{
                margin: 10,
                paddingVertical: 18,
                paddingHorizontal: 12,
                backgroundColor: "white",
                elevation: 12,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 34,
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 28,
                // gap:8
              }}
            >
              {
                gamesList.length > 0 && gamesList.map((item, index) => {
                  return <LaunchGame key={index} isLocal={index >= gamesList.length-2 ? true : false}
                    gameUrl={item.game + data.token}
                    imageUrl={item.img}
                  />
                })
              }
            </View>
          </View>
        </View>
      </MadMoneyApp>
  );
}
export function LaunchGame({ gameUrl, imageUrl, isLocal, last }) {
  const navigation = useNavigation();
  const [game,setGame] = useContext(GameContext);
  const width = useWindowDimensions().width

  const openGame = () => {
    navigation.navigate("Game", { gameUrl });
    setGame({...game,gameMode:true})
  };

  return (
    <View
      style={[styles.bannerGame, {
        height: width * 0.6,
        elevation: 12,
        shadowColor: "grey",
        borderRadius: 12,
        backgroundColor: "white"
      }]}
    >
      <TouchableOpacity
        accessibilityLabel="Launch game"
        accessibilityRole="button"
        onPress={openGame}
      >
        {isLocal ? (
          <Image style={{ height: "100%", borderRadius: 10, width: "100%" }} source={imageUrl} />
        ) : (
        <Image style={{ height: "100%", borderRadius: 10, width: "100%" }} source={{ uri: `${imageUrl}` }} />
         )}
      </TouchableOpacity>
    </View>
  );
}
