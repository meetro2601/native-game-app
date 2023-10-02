import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, View, TouchableOpacity, StyleSheet, Animated, useWindowDimensions} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNames, MainStackNames, StackNames } from "../utils/enum";
import { BottomRoutes, MainStackRoutes, StackRoutes } from "../routes";
import TabShape from "../svg/TabShape";


const styles = StyleSheet.create({
  animationIcon: {
    transform: [{ translateX: 0 }, { translateY: -41 }],
    transitionDelay: "0.2s, 350ms",
    justifyContent: "center",
    alignItems: "center",
  },
  slidingTabContainer: {
    // width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.yellow,
    alignItems: "center",
  },
  slidingTab: {
    width: 52,
    height: 52,
    borderRadius: 99,
    position: "absolute",
    backgroundColor: "#157BF2",
    bottom: -13,
    // left: 4,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  tabBar: {
    // flexDirection: "row",
    // flex:1,
    // width: width,
    bottom: 0,
    // height: 52,
    alignSelf: "center",
    position: "absolute",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
});

const Stack = createNativeStackNavigator();
export function Navigation(props) {
  return (
    <Stack.Navigator initialRouteName={StackNames.Landing} screenOptions={{ headerShown: false }}>
      {StackRoutes.map((route) => (
        <Stack.Screen key={route.name} {...route} />
      ))}
    </Stack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();
export function MainNavigation(props) {
  return (
    <MainStack.Navigator initialRouteName={MainStackNames.Main} screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={MainStackNames.Main} component={BottomNavigation} />
      {MainStackRoutes.map((route) => (
        <MainStack.Screen key={route.name} {...route} />
      ))}
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export function BottomNavigation(props) {
  return (
    <Tab.Navigator
      initialRouteName={BottomNames.Home}
      screenOptions={{ headerShown: false }}
      style={{ justifyContent: "space-between" }}
      tabBar={(props) => <MyTabBar {...props} />}
      backBehavior="Home"
    >
      {BottomRoutes.map((route) => (
        <Tab.Screen key={route.name} {...route} />
      ))}
    </Tab.Navigator>
  );
}

const alignIconCenter = (name) => {
  if (name === BottomNames.Rewards) {
    return { bottom: -3, left: 0.5 };
  } else if (name === BottomNames.Earn) {
    return { bottom: -2, left: -0.5 };
  } else if (name === BottomNames.Home) {
    return { bottom: -0.5, left: -0.5 };
  } else if (name === BottomNames.AllGames) {
    return { bottom: -3, left: 0 };
  } else if (name === BottomNames.Leaderboard) {
    return { bottom: -2.5, left: 0 };
  }
};

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const width = useWindowDimensions().width
  const TAB_WIDTH = width / BottomRoutes.length;

  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH - TAB_WIDTH*2,
      useNativeDriver: true,
      duration: 2000,
    }).start();
    Animated.spring(translateY, {
      toValue: -55,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  return (
    <View style={[styles.tabBar,{width:width}]}>
      {/* <View style={styles.slidingTabContainer}> */}
      <TabShape x={translateX} tab={state.index}></TabShape>
      <Animated.View style={[styles.slidingTabContainer, { transform: [{ translateX }, { translateY }] }]} >
        <View style={styles.slidingTab}>

        </View>
      </Animated.View>
      {/* </View> */}
      <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: "row", justifyContent: "space-evenly" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const BarIcon = options.tabBarIcon.activeIcon;
          const InActiveIcon = options.tabBarIcon.inActiveIcon;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={1}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                ...styles.tab,
                width: TAB_WIDTH,
                // backgroundColor: isFocused ? "transparent" : Colors.white,
              }}
              key={"tab" + index}
            >
              {isFocused && (
                <View style={[styles.animationIcon, alignIconCenter(route.name)]}>
                  <BarIcon />
                </View>
              )}
              {!isFocused && (
                <React.Fragment>
                  <InActiveIcon />
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      color: isFocused ? "#673ab7" : "#222",
                      fontSize: 10,
                    }}
                  >
                    {label}
                  </Text>
                </React.Fragment>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
