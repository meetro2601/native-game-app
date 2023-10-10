import { TouchableOpacity } from "react-native";
import { BackSvg } from "../svg/BackSvg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { getCurrentUserGamePoints } from "../services/GameService";

export function Back(props) {
    const [auth] = useContext(AuthContext)
    // const [game,setGame] = useContext(GameContext);
    const navigation = useNavigation();
    const route = useRoute()

    const handleBack = ()=>{
        // if(game.gameMode){
        //     getCurrentUserGamePoints(auth.user.username).then((res) => {
        //     const userData = res?.data?.find((item)=>item.sUserName == auth.user.username )
        //         if (userData !== undefined) {
        //             setGame({...game,totalCoins:userData.sCoins,totalPoints:userData.sPoints})
        //         } else {
        //             setGame(game)
        //             console.log("set empty data");
        //         }
        //     }).catch(err => console.log("Back button error"));
        // }
       route.name == "Rewards" ? navigation.navigate("Home"): navigation.goBack()
    }


    return (
        <TouchableOpacity 
        accessibilityLabel="Back"
        accessibilityRole="button"
        onPress={props?.getPoints ? props.getPoints: handleBack}
        >
            <BackSvg />
        </TouchableOpacity>
    )
}