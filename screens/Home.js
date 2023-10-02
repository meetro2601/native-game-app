import { SafeAreaView, ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, Button, StatusBar, BackHandler, useWindowDimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import { styles } from "../styles/Home";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../services/GameService";
import { Video, ResizeMode } from "expo-av";
import RaymanGame from "../assets/games/Rayman.jpg";
import ZombieGame from "../assets/games/zombie.png";
import { MadMoneyApp } from "../components/MadMoneyApp";

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
      navigation.isFocused() ? BackHandler.exitApp() :navigation.navigate("Home") 
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
              padding:25,
              marginBottom: 6,
              backgroundColor: "#ffffff",
              elevation: 12,
              borderRadius: 12, // actual 8
              flex:1,
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
                style={{ alignSelf: "center",height:170,width:"100%",borderRadius:15}}
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
        <View style={[{padding: 5, marginLeft: 2 }]}>
          <View style={[{ flexDirection: "column", marginTop: 4 }]}>
            <Text style={styles.popularGameTitle}>Popular Games</Text>
            <View
              style={{
                // display: "flex",
                margin: 10,
                paddingVertical: 18,
                paddingHorizontal:12,
                backgroundColor: "white",
                elevation: 12,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 34,
                // flex: 1,
                marginBottom: 28,
              }}
            >
              <View
                style={{ flex:1,flexDirection: "row",justifyContent:"center", gap: 8, marginTop: 0 }}
              >
                <LaunchGame
                  gameUrl={"https://mmweb.smartechy.net/games/5?ptoken=" + data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_5.png"
                />
                <LaunchGame
                  last
                  gameUrl={"https://mmweb.smartechy.net/games/3?ptoken="+ data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_3.png"
                />
              </View>
              <View
                style={{
                  flex:1,flexDirection: "row",justifyContent:"center", gap: 8, marginTop: 10 
                }}
              >
                <LaunchGame
                  gameUrl={"https://mmweb.smartechy.net/games/4?ptoken=" + data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_4.png"
                />
                <LaunchGame
                  last
                  gameUrl={"https://mmweb.smartechy.net/games/2?ptoken=" + data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_2.png"
                />
              </View>
              <View
                style={{
                  flex:1,flexDirection: "row",justifyContent:"center", gap: 8, marginTop: 10 
                }}
              >
                <LaunchGame
                  gameUrl={"https://mmweb.smartechy.net/games/99?ptoken=" + data.token}
                  imageUrl={ZombieGame}
                  isLocal
                />
                <LaunchGame last gameUrl="http://game.vcreation.xyz/game2" imageUrl={RaymanGame} isLocal />
              </View>
            </View>
          </View>
        </View>
    </MadMoneyApp>
  );
}
export function LaunchGame({ gameUrl, imageUrl, isLocal, last }) {
  const navigation = useNavigation();
  const width = useWindowDimensions().width

  const openGame = () => {
    navigation.navigate("Game", { gameUrl });
  };

  return (
    <TouchableOpacity
      accessibilityLabel="Launch game"
      accessibilityRole="button"
      style={[styles.bannerGame,{height:width*0.6}]}
      onPress={openGame}
    >
      <View
        style={{
          height: "100%",
          elevation: 12,
          width: "100%",
        }}
      >
        {isLocal ? (
          <Image style={{ height: "100%", borderRadius: 10, width: "100%" }} source={imageUrl} />
        ) : (
          <Image style={{ height: "100%", borderRadius: 10, width: "100%" }} source={{ uri: imageUrl }} />
        )}
      </View>
    </TouchableOpacity>
  );
}
