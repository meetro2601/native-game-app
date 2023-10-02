import { AllGames } from "./screens/AllGames";
import { Earn } from "./screens/Earn";
import Coins from "./screens/Earnings&Rewards/Coins";
import { Game } from "./screens/Game";
import { Home } from "./screens/Home";
import { Landing } from "./screens/Landing";
import { LeaderBoard } from "./screens/LeaderBoard";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import ProfileMenu from "./screens/ProfileMenu";
import { Rewards } from "./screens/Rewards";
import { Signup } from "./screens/Signup";
import SocialLogin from "./screens/SocialLogin";
import EarnSvgComponent from "./svg/EarnSvg";
import { EarnWhiteSvg } from "./svg/EarnWhiteSVG";
import GamesSvgComponent from "./svg/GamesSvg";
import { GamesWhiteSvg } from "./svg/GamesWhiteSVG";
import HomeSvgComponent from "./svg/HomeSvg";
import { HomeWhiteSvg } from "./svg/HomeWhiteSVG";
import LeaderBoardSvgComponent from "./svg/LeaderboardSvg";
import { LeaderboardWhiteSvg } from "./svg/LeaderboardWhiteSvg";
import RewardSvgComponent from "./svg/RewardSvg";
import { RewardWhiteSvgComponent } from "./svg/RewardWhiteSVG";
import { BottomNames, MainStackNames, StackNames } from "./utils/enum";

export const BottomRoutes = [
  {
    name: BottomNames.Rewards,
    component: Rewards,
    options: {
      tabBarIcon: { activeIcon: RewardWhiteSvgComponent, inActiveIcon: RewardSvgComponent },
    },
  },
  {
    name: BottomNames.Earn,
    component: Earn,
    options: {
      tabBarIcon: { activeIcon: EarnWhiteSvg, inActiveIcon: EarnSvgComponent },
    },
  },
  {
    name: BottomNames.Home,
    component: Home,
    options: {
      tabBarIcon: { activeIcon: HomeWhiteSvg, inActiveIcon: HomeSvgComponent },
    },
  },
  {
    name: BottomNames.AllGames,
    component: AllGames,
    options: {
      tabBarIcon: { activeIcon: GamesWhiteSvg, inActiveIcon: GamesSvgComponent },
    },
  },
  {
    name: BottomNames.Leaderboard,
    component: LeaderBoard,
    options: {
      tabBarIcon: { activeIcon: LeaderboardWhiteSvg, inActiveIcon: LeaderBoardSvgComponent },
    },
  },
];

export const StackRoutes = [
  {
    name: StackNames.Landing,
    component: Landing,
  },
  {
    name: StackNames.Login,
    component: Login,
  },
  {
    name: StackNames.Signup,
    component: Signup,
  },
  {
    name: StackNames.SocialLogin,
    component: SocialLogin,
  },
];

export const MainStackRoutes = [
  {
    name: MainStackNames.Profile,
    component: Profile,
  },
  {
    name: MainStackNames.Game,
    component: Game,
  },
  {
    name: MainStackNames.ProfileMenu,
    component: ProfileMenu,
  },
  {
    name: MainStackNames.Coins,
    component: Coins,
  },
];
