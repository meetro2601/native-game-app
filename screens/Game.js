import { useContext, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";
import { GameContext } from "../context/GameContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Back } from "../components/Back";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUserGamePoints } from "../services/GameService";

// export function OldGame(props) {
//   const [game, setGame] = useContext(GameContext);

//   useEffect(() => {
//     const handleBackButton = () => {
//       if (game.gameMode) {
//         setGame({ ...game, gameMode: false });
//         return true;
//       }
//       return false;
//     };

//     BackHandler.addEventListener("hardwareBackPress", handleBackButton);
//     return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
//   }, []);

//   return <WebView source={{ uri: game.gameUrl }} style={{ flex: 1 }} />;
// }
export function Game(props) {
  const [auth] = useContext(AuthContext)
  const [game, setGame] = useContext(GameContext);
  const route = useRoute();
  const navigation = useNavigation();

    useEffect(() => {
    const handleBackButton = () => {
      getCurrentUserGamePoints(auth.user.username).then((res) => {
        // console.log("Back Button")
        const userData = res?.data?.find((item) => item.sUserName == auth.user.fullName)
        if (userData !== undefined) {
          setGame({ ...game, totalCoins: userData.sCoins, totalPoints: userData.sPoints })
        } else {
          setGame(game)
          console.log("set empty data");
        }
      }).catch(err => console.log("Back button error"));
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  const getPoints = () => {
    // if(game.gameMode){
    getCurrentUserGamePoints(auth.user.username).then((res) => {
      // console.log("Back Arrow")
      const userData = res?.data?.find((item) => item.sUserName == auth.user.fullName)
      if (userData !== undefined) {
        setGame({ ...game, totalCoins: userData.sCoins, totalPoints: userData.sPoints })
      } else {
        setGame(game)
        console.log("set empty data");
      }
    }).catch(err => console.log("Back button error"));
    // } 
    navigation.navigate("Home")
  }


  return [<Back key={1} getPoints={getPoints} />, <WebView source={{ uri: route.params.gameUrl }} style={{ flex: 1 }} key={2} />];
}
