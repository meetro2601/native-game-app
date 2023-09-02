import { SafeAreaView, ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useEffect, useState, useRef } from "react";
import { styles } from "../styles/Home";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../services/GameService";
import { Video, ResizeMode } from "expo-av";
import RaymanGame from "../assets/games/Rayman.jpg";
import ZombieGame from "../assets/games/zombie.png";

export function Home(props) {
  const [data, setData] = useState({ token: "" });
  const [status, setStatus] = useState({});

  const video = useRef(null);

  useEffect(() => {
    getToken().then((res) => {
      console.log("get token");
      console.log(res);
      if (res !== undefined) {
        console.log(res);
        setData({ token: res });
        console.log(data);
      } else {
        console.log("set empty data");
        setData({ token: "" });
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Header />
        <View
          style={[
            {
              marginTop: 10, // 10
              marginHorizontal: 18,
              paddingTop: 14, // 2
              paddingHorizontal: 16,
              paddingBottom: 6,
              marginBottom: 6,
              backgroundColor: "#ffffff",
              elevation: 12,
              borderRadius: 12, // actual 8
            },
          ]}
        >
          <View
            style={[
              {
                flex: 5,
                padding: 10,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                alignItems: "center",
                paddingBottom: 20,
              },
            ]}
          >
            {/* <View style={videoStyles.container}> */}
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
            >
              <Video
                ref={video}
                style={{ alignSelf: "center", width: 320, height: 160, borderRadius: 22 }}
                source={{
                  uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                // useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
        <View style={[{ padding: 5, marginLeft: 2 }]}>
          <View style={[{ flexDirection: "column", marginTop: 4 }]}>
            <Text style={styles.popularGameTitle}>Popular Games</Text>
            <View
              style={{
                display: "flex",
                margin: 10,
                paddingVertical: 18,
                paddingLeft: 6,
                paddingRight: 12,
                backgroundColor: "#ffffff",
                elevation: 12,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 34,
                flex: 1,
                marginBottom: 22,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 3,
                  gap: 4,
                  marginBottom: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LaunchGame
                  gameUrl={"https://mmweb.smartechy.net/games/99?ptoken=" + data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_5.png"
                />
                <LaunchGame
                  last
                  gameUrl="http://game.vcreation.xyz/game3"
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_3.png"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 3,
                  gap: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <LaunchGame
                  gameUrl={"https://mmweb.smartechy.net/games/99?ptoken=" + data.token}
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_4.png"
                />
                <LaunchGame
                  last
                  gameUrl="http://game.vcreation.xyz/game2"
                  imageUrl="https://mmweb.smartechy.net//Imgs/gm_2.png"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 3,
                  gap: 4,
                  justifyContent: "center",
                  alignItems: "center",
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
      </ScrollView>
    </SafeAreaView>
  );
}
function LaunchGame({ gameUrl, imageUrl, isLocal, last }) {
  const navigation = useNavigation();

  const openGame = () => {
    navigation.navigate("Game", { gameUrl });
  };

  return (
    <TouchableOpacity
      accessibilityLabel="Launch game"
      accessibilityRole="button"
      style={styles.bannerGame}
      onPress={openGame}
    >
      <View
        style={{
          height: 214,
          width: 167,
          borderRadius: 10,
          elevation: 12,
          maxWidth: "100%",
          alignSelf: last ? "flex-start" : "flex-end",
        }}
      >
        {isLocal ? (
          <Image style={{ height: 214, width: 167, borderRadius: 10, maxWidth: "100%" }} source={imageUrl} />
        ) : (
          <Image style={{ height: 214, width: 167, borderRadius: 10, maxWidth: "100%" }} source={{ uri: imageUrl }} />
        )}
      </View>
    </TouchableOpacity>
  );
}
