import { View, Pressable, Text, Image, ImageBackground, TouchableHighlight, useWindowDimensions } from "react-native";
import { Header } from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import CrownSvgComponent from "../svg/CrownSvg";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { useContext, useEffect, useState } from "react";
import { getAllUsersGamePoints } from "../services/GameService";
import { AuthContext } from "../context/AuthContext";
import { Shadow } from "react-native-shadow-2";
import { leaderBoardStyles } from "../styles/LeaderBoard";
import FilterTabs from "../components/FilterTabs";
// import FilterTabs from "../components/FilterTabs";

export function LeaderBoard(props) {
  const tabs = ["Today", "Week", "Month"];
  const [selectedTab, setSelectedTab] = useState("Today")
  const [players, setPlayers] = useState([]);

  // const handleSelect = (value)=>{
  //   setSelectedTab(value)
  // }

  useEffect(() => {
    const interval = getInterval(selectedTab);

    getAllUsersGamePoints(interval).then((res) => {
      res.data?.sort((a, b) => b.sPoints - a.sPoints)
      // console.log(res.data)
      if (res.data) {
        const playersData = res.data.map((obj, index) => {
          obj["rank"] = index + 1
          return obj
        })
        setPlayers(playersData);
      }
    }).catch(err => console.log("leaderboard error" + err));
  }, [selectedTab]);


  return (
    <MadMoneyApp>
      {/* <Header /> */}
      <FilterTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      {/* <Tabs  /> */}
      <UserStage playersList={players} />
      <TopPlayers playersList={players} selectedTab={selectedTab} />
    </MadMoneyApp>
  );
}

// function Tabs(props) {
//   return (
//     <View style={leaderBoardStyles.tabs}>
//       {props.tabs.map((tab, index) => (
//         <Tab text={tab} selectedTab={props.selectedTab} setSelectedTab={props.setSelectedTab} key={index} />
//       ))}
//     </View>
//   );
// }

// function Tab(props) {
//   const s = props.text === props.selectedTab ? leaderBoardStyles.tabButtonActive : leaderBoardStyles.tabButton;

//   return (
//     <Pressable style={s} onPress={() => props.setSelectedTab(props.text)}>
//       <Text style={[leaderBoardStyles.tabButtonText, props.text === props.selectedTab && leaderBoardStyles.btnActive]}>{props.text}</Text>
//     </Pressable>
//   );
// }

function UserStage(props) {
  return (

    <View style={leaderBoardStyles.userStage}>

      <View style={leaderBoardStyles.userStageBlock2}>
        <View style={{ height: 220, alignItems: "center", justifyContent: "flex-end" }}>
          <Shadow distance={15} startColor={'#0F5E5840'} endColor={'#ffffff40'}>
            <Image
              style={[leaderBoardStyles.img2, leaderBoardStyles.img, leaderBoardStyles.backgroundRank2]}
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
              }}
            />
          </Shadow>
          <WinningRank rankStyle={leaderBoardStyles.winner2} rank={props.playersList[1]?.rank} />
        </View>
        <WinningUser nameStyle={{ top: 10 }} name={props.playersList[1]?.sUserName} />

      </View>
      <View style={leaderBoardStyles.userStageBlock}>

        {/* <View style={{}}> */}
        <ImageBackground resizeMode="cover" style={{ height: 220, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }} source={require("../assets/blast.png")}>

          <View style={leaderBoardStyles.crown}>
            <CrownSvgComponent />
          </View>
          <Shadow distance={20} startColor={'#E2298260'} endColor={'#ffffff60'}>

          <Image
            style={[leaderBoardStyles.img, leaderBoardStyles.img1, leaderBoardStyles.backgroundRank1]}
            source={{
              uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
            }}
            />
            </Shadow>
          <WinningRank rankStyle={leaderBoardStyles.winner1} rank={props.playersList[0]?.rank} />

          <WinningUser nameStyle={{ top: 20 }} name={props.playersList[0]?.sUserName} />
        </ImageBackground>
        {/* </View> */}
      </View>
      <View style={leaderBoardStyles.userStageBlock3}>
        <View style={{ height: 220, alignItems: "center", justifyContent: "flex-end" }}>
        <Shadow distance={12} startColor={'#040B4D40'} endColor={'#ffffff40'} >
          <Image
            style={[leaderBoardStyles.img, leaderBoardStyles.img3, leaderBoardStyles.backgroundRank3]}
            source={{
              uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
            }}
            />
            </Shadow>
          <WinningRank rankStyle={leaderBoardStyles.winner3} rank={props.playersList[2]?.rank} />
        </View>
        <WinningUser nameStyle={{ top: 15 }} name={props.playersList[2]?.sUserName} />
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

function WinningUser(props) {
  //return null;
  return <Text style={[leaderBoardStyles.imgCaption, props.nameStyle]}>{props.name}</Text>;
}

function WinningRank(props) {
  return (
    <View style={[leaderBoardStyles.winner, props.rankStyle]}>
      <Text style={[leaderBoardStyles.rankText, leaderBoardStyles.font24]}>{props.rank}</Text>
    </View>
  );
}

function getInterval(tab) {
  const d = new Date();
  if (tab === "Today") {

    return {
      start: new Date(d.setDate(d.getDate() - 1)).toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
    };
  }

  if (tab === "Week") {
    return {
      start: new Date(d.setDate(d.getDate() - 7)).toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
    };
  }

  if (tab === "Month") {
    return {
      start: new Date(d.setMonth(d.getMonth() - 1)).toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
    };
  }
}

function TopPlayers(props) {
  const [auth] = useContext(AuthContext)
  const [rankingList, setrankingList] = useState([]);

  useEffect(() => {
    const userScore = props?.playersList?.find((obj) => {
      // const user = await getUser()
      return obj?.sUserName == auth.user.fullName && obj?.rank > 3
    })

    if (userScore == undefined) {
      setrankingList(props.playersList)
    } else {
      const otherPlayers = props?.playersList?.filter((obj) => {
        return obj?.sUserName != auth.user.fullName && obj?.rank != userScore.rank
      })
      // console.log([userScore, ...otherPlayers])
      setrankingList(prevState => [userScore, ...otherPlayers])
    }
  }, [props.playersList])

  return (
    <View style={leaderBoardStyles.recentMatch}>
      <Shadow distance={4} style={leaderBoardStyles.recentMatchHead}>

      {/* <View style={leaderBoardStyles.recentMatchHead}> */}
        <LinearGradient
          colors={["#157BF2", "rgba(21, 123, 242, 0)"]}
          locations={[0, 1]}
          start={{ x: 0.2, y: 0.0 }} end={{ x: 1, y: 1.5 }}
          style={{ borderTopLeftRadius: 40, height: "100%", borderTopRightRadius: 40 }}
          >
          <Text style={leaderBoardStyles.recentMatchHeadText}>Recent Match</Text>
        </LinearGradient>
      {/* </View> */}
      
          </Shadow>
      <Players ranking={rankingList} />
    </View>
  );
}

function Players(props) {
  const [selected, setselected] = useState(1);
  return (
    <>
      <View style={[leaderBoardStyles.playerRow, { height: 50 }]}>
        <View style={[leaderBoardStyles.gameResultItem, { flex: 1, alignItems: "center" }]}>
          <Text style={leaderBoardStyles.playerText}>Rank</Text>
        </View>
        <View style={[leaderBoardStyles.gameResultItem, { flex: 3, alignItems: "center" }]}>
          <Text style={leaderBoardStyles.playerText}>Name</Text>
        </View>
        <View style={[leaderBoardStyles.gameResultItem, { flex: 1, alignItems: "center" }]}>
          <Text style={leaderBoardStyles.playerText}>Score</Text>
        </View>
      </View>
      {props.ranking?.map((player, index) => (
        <Player setselected={() => setselected(player?.rank)} selected={selected == player?.rank} player={player} key={index} />
      ))}
    </>
  );
}

function Player(props) {

  return (
    <TouchableHighlight onPress={props.setselected} activeOpacity={0.95} >
      <Shadow disabled={!props.selected} distance={3} offset={[0,-2]} startColor={'#157bf230'} endColor={'#ffffff30'} style={[props.selected ? leaderBoardStyles.selectedRow : leaderBoardStyles.playerRow]}>
      {/* <View > */}

        <View style={[leaderBoardStyles.gameResultItem, { flex: 1, alignItems: "center" }]}>
          {/* <Image
          source={{ uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg" }}
          style={leaderBoardStyles.playerImg}
        /> */}
          <Text style={leaderBoardStyles.playerText}>#{props.player.rank}</Text>
        </View>
        <View style={[leaderBoardStyles.gameResultItem, { flex: 3, alignItems: "center" }]}>
          <Text style={leaderBoardStyles.playerText}>{props.player.sUserName}</Text>
        </View>
        <View style={[leaderBoardStyles.gameResultItem, { flex: 1, alignItems: "center" }]}>
          <View style={[leaderBoardStyles.scoreBox]}>
            <Text style={leaderBoardStyles.scoreText}>{props.player.sPoints}</Text>
          </View>
        </View>
      {/* </View> */}
        </Shadow>
    </TouchableHighlight>
  );
}
