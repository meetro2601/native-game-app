import { useContext, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";
import { GameContext } from "../context/GameContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Back } from "../components/Back";

export function OldGame(props) {
  const [game, setGame] = useContext(GameContext);

  useEffect(() => {
    const handleBackButton = () => {
      if (game.gameMode) {
        setGame({ ...game, gameMode: false });
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  return <WebView source={{ uri: game.gameUrl }} style={{ flex: 1 }} />;
}
export function Game(props) {
  const navigation = useNavigation();
  const route = useRoute();
  
  return [<Back key={1} />, <WebView source={{ uri: route.params.gameUrl }} style={{ flex: 1 }} key={2} />];
}
