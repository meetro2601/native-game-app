import { SafeAreaView, ScrollView, Image, Text, View, TouchableOpacity, BackHandler, useWindowDimensions } from "react-native";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { styles } from "../styles/Home";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { getAllgames, getCurrentUserGamePoints, getToken } from "../services/GameService";
import { Video, ResizeMode } from "expo-av";
import { GameContext } from "../context/GameContext";
import { MadMoneyAppStyles } from "../styles/MadMoneyApp";
import { RefreshControl } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { allgamesList } from "../utils/gamesList";


export function Home(props) {
  const [data, setData] = useState({ token: "" });
  const [auth] = useContext(AuthContext)
  const [game, setGame, gamesList, setgamesList] = useContext(GameContext);
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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await getAllgames()
      if (res.data?.length > 0) {
        setgamesList(res.data)
      }
      getCurrentUserGamePoints(auth.user.username).then((res) => {
        const userData = res?.data?.find((item) => {
          if (item.yowzaUserName == auth.user.fullName) return item
        })
        console.log(userData)
        if (userData !== undefined) {
          setGame({ ...game, totalCoins: userData.sCoins, totalPoints: userData.sPoints })
          //   setData(r);
        } else {
          //   console.log("set empty data");
          setGame({ gameMode: false, totalCoins: 0, totalPoints: 0 })
          //   setData({ sPoints: 0, sCoins: 0, sUserName: "" });
        }
      }).catch(err => console.log("game cox error"));
    } catch (error) {
      console.log(error)
    }
    finally {
      setRefreshing(false);
    }
  }, []);


  return (
    <SafeAreaView style={MadMoneyAppStyles.container}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEnabled={true} nestedScrollEnabled={true} contentContainerStyle={[{ paddingBottom: 40 }]}>
        {props.children}
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
          {
            gamesList.length > 0 &&
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
                  gamesList.map((item, index) => {
                    return <LaunchGame key={item.gmM_Id}
                      gameUrl={item.gameURL + "?ptoken=" + data.token}
                      imageUrl={item.gameImage}
                    />
                  })
                }
              </View>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export function LaunchGame({ gameUrl, imageUrl, isLocal, last }) {
  const navigation = useNavigation();
  const [game, setGame] = useContext(GameContext);
  const width = useWindowDimensions().width

  const openGame = () => {
    navigation.navigate("Game", { gameUrl });
    setGame({ ...game, gameMode: true })
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
          <Image style={{ height: "100%", borderRadius: 10, width: "100%" }} source={{ uri: imageUrl }} />
        )}
      </TouchableOpacity>
    </View>
  );
}
