import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUserGamePoints } from "../services/GameService";

export const GameContext = createContext()

export function GameContextProvider(props) {
    const [auth,setAuth] = useContext(AuthContext)
    const [game, setGame] = useState({gameMode: false, totalCoins:0,totalPoints:0});

    useEffect(() => {
        console.log(auth.user)
        getCurrentUserGamePoints(auth.user.username).then((res) => {
            console.log(res.data);
            const userData = res?.data?.find((item)=>{
                if(item.sUserName == auth.user.fullName) return item
            })
            console.log(userData)
            if (userData !== undefined) {
                setGame({...game,totalCoins:userData.sCoins,totalPoints:userData.sPoints})
            //   setData(r);
            } else {
            //   console.log("set empty data");
              setGame({gameMode: false, totalCoins:0,totalPoints:0})
            //   setData({ sPoints: 0, sCoins: 0, sUserName: "" });
            }
          }).catch(err => console.log("header error"));
    }, [auth.user.username])
    

    return (
        <GameContext.Provider value={[game, setGame]}>
            {props.children}
        </GameContext.Provider>
    )
}