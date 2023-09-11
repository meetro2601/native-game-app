import { View } from "react-native";
import { LaunchGame } from "./Home";
import { useEffect, useState } from "react";
import { getUser } from "../services/StorageService";
import RaymanGame from "../assets/games/Rayman.jpg";
import ZombieGame from "../assets/games/zombie.png";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { Header } from "../components/Header";

export function AllGames(props) {
    const [data, setData] = useState({ token: "" });

    useEffect(()=>{
        const fetch = async ()=>{
            const user = await getUser()
            if(user.token != ""){
                setData({token:user.token})
            }
        }
        fetch()
    },[])

    return <MadMoneyApp>
        <Header/>
    <View
        style={{
            // display: "flex",
            margin: 12,
            paddingVertical: 8,
            // paddingHorizontal: 12,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            // flex: 1,
            marginBottom: 30,
        }}
    >
        <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 0 }}
        >
            <LaunchGame
                gameUrl={"https://mmweb.smartechy.net/games/5?ptoken=" + data.token}
                imageUrl="https://mmweb.smartechy.net//Imgs/gm_5.png"
            />
            <LaunchGame
                last
                gameUrl={"https://mmweb.smartechy.net/games/3?ptoken=" + data.token}
                imageUrl="https://mmweb.smartechy.net//Imgs/gm_3.png"
            />
        </View>
        <View
            style={{
                flex: 1, flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 12
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
                flex: 1, flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 12
            }}
        >
            <LaunchGame
                gameUrl={"https://mmweb.smartechy.net/games/99?ptoken=" + data.token}
                imageUrl={ZombieGame}
                isLocal
            />
            <LaunchGame last gameUrl="http://game.vcreation.xyz/game2" imageUrl={RaymanGame} isLocal />
        </View>
        <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 12 }}
        >
            <LaunchGame
                gameUrl={"https://mmweb.smartechy.net/games/5?ptoken=" + data.token}
                imageUrl="https://mmweb.smartechy.net//Imgs/gm_5.png"
            />
            <LaunchGame
                last
                gameUrl={"https://mmweb.smartechy.net/games/3?ptoken=" + data.token}
                imageUrl="https://mmweb.smartechy.net//Imgs/gm_3.png"
            />
        </View>
    </View>
    </MadMoneyApp>
}