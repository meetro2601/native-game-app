import { SafeAreaView, ScrollView, View } from "react-native";
import { LaunchGame } from "./Home";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/StorageService";
import RaymanGame from "../assets/games/Rayman.jpg";
import ZombieGame from "../assets/games/zombie.png";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { Header } from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import { gamesList } from "../utils/gamesList";
import { GameContext } from "../context/GameContext";

export function AllGames(props) {
    const [game,setGame,gamesList] = useContext(GameContext);
    const tabs = ["Single User", "Multi User"];
    // const tabs = ["Single User", "Multi User", "USER 1", "USER 2", "USER 3", "USER 4", "USER 5"];
    const [selectedTab, setSelectedTab] = useState("Single User")
    const [list, setlist] = useState([])
    const [data, setData] = useState({ token: "" });

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser()
            if (user.token != "") {
                setData({ token: user.token })
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        if (selectedTab == "Single User") {
            setlist(gamesList)
        } else {
            setlist([])
        }
    }, [selectedTab, gamesList])

    return <MadMoneyApp>
        {/* <Header/> */}
        <FilterTabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <View
            style={{
                // display: "flex",
                margin: 12,
                // paddingVertical: 8,
                // paddingHorizontal: 12,
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: -5,
                marginBottom: 30,
            }}
        >
            {
                list.length > 0 && gamesList.map((item, index) => {
                    return <LaunchGame key={item.gmM_Id}
                        gameUrl={item.gameURL + data.token}
                        imageUrl={item.gameImage}
                    />
                })
            }

            {list.length > 0 && <> 
            <LaunchGame
                gameUrl={"https://mmweb.smartechy.net/games/5?ptoken=" + data.token}
                imageUrl="https://mmweb.smartechy.net//Imgs/gm_5.png"
            />
                <LaunchGame
                    last
                    gameUrl={"https://mmweb.smartechy.net/games/3?ptoken=" + data.token}
                    imageUrl="https://mmweb.smartechy.net//Imgs/gm_3.png"
                />
            </>}
        </View>
    </MadMoneyApp>
}