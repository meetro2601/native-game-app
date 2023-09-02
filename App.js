import { useFonts } from "expo-font";
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { MainNavigation } from './screens/Navigation';
import { Navigation } from "./screens/Navigation"
import { NavigationContainer } from '@react-navigation/native';
import { Game } from './screens/Game';
import { Loading } from "./screens/Loading";

import { useContext } from 'react';
import { GameContext, GameContextProvider } from './context/GameContext';
import { AuthContext, AuthContextProvider } from './context/AuthContext';


export default function App(props) {
  const [loaded] = useFonts({
    Inika: require("./assets/fonts/inika/Inika-Bold.ttf"),
    Roboto: require("./assets/fonts/roboto/Roboto-Bold.ttf"),
    Mulish: require("./assets/fonts/mulish/Mulish-Bold.ttf")
  });
  if (!loaded) {
    return (
      <Loading />
    )
  }
  return (
    <AuthContextProvider>
      <Boot />
    </AuthContextProvider>
  )
}
function Boot(props) {
  const [auth, setAuth]= useContext(AuthContext);

  return (
    <>
      {(auth.isAuthenticating || !auth.isAuthenticated) && <BootUnProtectedScreens />}
      {!auth.isAuthenticating && auth.isAuthenticated && <GameContextProvider>
        <BootProtectedScreens />
      </GameContextProvider>}</>
  )
}
function BootProtectedScreens() {
  const [game, setGame] = useContext(GameContext)
  //console.log(JSON.stringify(game))
  return (
    <>
      {!game.gameMode && <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>}
      {game.gameMode && <Game />}
    </>
  );
}
function BootUnProtectedScreens(props) {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
