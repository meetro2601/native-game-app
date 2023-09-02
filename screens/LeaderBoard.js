import { View, Pressable, Text, Image } from "react-native";
import { Header } from "../components/Header";
import { leaderBoardStyles } from "../styles/LeaderBoard";
import { LinearGradient } from "expo-linear-gradient";
import BlastSvgComponent from "../svg/BlastSvg";
import CrownSvgComponent from "../svg/CrownSvg";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { useEffect, useState } from "react";
import { getAllUsersGamePoints } from "../services/GameService";

export function LeaderBoard(props) {
  const tabs = ["Today", "Week", "Month"];
  const [selectedTab, setSelectedTab] = useState("Today");

  return (
    <MadMoneyApp>
      <Header />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
      <UserStage />
      <TopPlayers selectedTab={selectedTab} />
    </MadMoneyApp>
  );
}

function Tabs(props) {
  return (
    <View style={leaderBoardStyles.tabs}>
      {props.tabs.map((tab, index) => (
        <Tab text={tab} selectedTab={props.selectedTab} setSelectedTab={props.setSelectedTab} key={index} />
      ))}
    </View>
  );
}

function Tab(props) {
  const s = props.text === props.selectedTab ? leaderBoardStyles.tabButtonActive : leaderBoardStyles.tabButton;

  return (
    <Pressable style={s} onPress={() => props.setSelectedTab(props.text)}>
      <Text style={leaderBoardStyles.tabButtonText}>{props.text}</Text>
    </Pressable>
  );
}

function UserStage(props) {
  return (
    <View style={leaderBoardStyles.userStage}>
      <View style={leaderBoardStyles.userStageBlock2}>
        <Image
          style={[leaderBoardStyles.img, leaderBoardStyles.backgroundRank2]}
          source={{
            uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
          }}
        />
        <WinningRank rankStyle={leaderBoardStyles.winner2} rank={2} />
        <WinningUser name="Rais Pinjari" />
      </View>
      <View style={leaderBoardStyles.userStageBlock}>
        <View style={{ zIndex: -1, marginTop: -15 }}>
          <BlastSvgComponent />
        </View>
        <View style={leaderBoardStyles.crown}>
          <CrownSvgComponent />
        </View>
        <Image
          style={[leaderBoardStyles.img, leaderBoardStyles.img1, leaderBoardStyles.backgroundRank1]}
          source={{
            uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
          }}
        />
        <WinningRank rankStyle={leaderBoardStyles.winner1} rank={1} />

        <WinningUser name="Kamlesh Kelji" />
      </View>
      <View style={leaderBoardStyles.userStageBlock3}>
        <Image
          style={[leaderBoardStyles.img, leaderBoardStyles.backgroundRank3]}
          source={{
            uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
          }}
        />
        <WinningRank rankStyle={leaderBoardStyles.winner3} rank={3} />
        <WinningUser name="Ankit Adulkar" />
      </View>
    </View>
  );
}

function WinningUser(props) {
  //return null;
  return <Text style={[leaderBoardStyles.imgCaption]}>{props.name}</Text>;
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
      start: d.toISOString().slice(0, 10),
      end: d.toISOString().slice(0, 10),
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
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const interval = getInterval(props.selectedTab);

    getAllUsersGamePoints(interval).then((res) => {
      if (res.data) {
        setPlayers(res.data);
      }
    });
  }, [props.selectedTab]);

  return (
    <View style={leaderBoardStyles.recentMatch}>
      <View style={leaderBoardStyles.recentMatchHead}>
        <LinearGradient
          colors={["#157BF2", "rgba(21, 123, 242, 0)"]}
          locations={[0, 1]}
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        >
          <Text style={leaderBoardStyles.recentMatchHeadText}>Top Players</Text>
        </LinearGradient>
      </View>
      <Players players={players} />
    </View>
  );
}

function Players(props) {
  return (
    <View>
      {props.players.map((player, index) => (
        <Player player={player} key={index} />
      ))}
    </View>
  );
}

function Player(props) {
  
  return (
    <View style={leaderBoardStyles.gameResultItem}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg" }}
        style={leaderBoardStyles.playerImg}
      />
      <View style={[leaderBoardStyles.pr5, leaderBoardStyles.player, { width: 50 }]}>
        <Text style={leaderBoardStyles.playerText}>{props.player.sUserName}</Text>
      </View>
      <View style={[leaderBoardStyles.pr5, leaderBoardStyles.player, { width: 50 }]}>
        <Text style={leaderBoardStyles.playerText}>{props.player.sPoints}</Text>
      </View>
    </View>
  );
}
