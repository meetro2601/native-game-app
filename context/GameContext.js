import { createContext, useState } from "react";

export const GameContext = createContext()

export function GameContextProvider(props) {
    const [game, setGame] = useState({gameMode: false, gameUrl: "http://game.vcreation.xyz"});
    return (
        <GameContext.Provider value={[game, setGame]}>
            {props.children}
        </GameContext.Provider>
    )
}