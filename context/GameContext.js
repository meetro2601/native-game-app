import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAllgames, getCurrentUserGamePoints } from "../services/GameService";
import { allgamesList } from "../utils/gamesList";

export const GameContext = createContext()

export function GameContextProvider(props) {
    const [auth, setAuth] = useContext(AuthContext)
    const [gamesList, setgamesList] = useState([])
    const [game, setGame] = useState({ gameMode: false, totalCoins: 0, totalPoints: 0 });

    useEffect(() => {
        getAllgames().then(res => {
            if (res.data?.length > 0) {
                setgamesList(res.data)
            }
        })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log("game cox running")
        getCurrentUserGamePoints(auth.user.username).then((res) => {
            console.log(res.data);
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
    }, [auth.user.username])



    return (
        <GameContext.Provider value={[game, setGame, gamesList, setgamesList]}>
            {props.children}
        </GameContext.Provider>
    )
}