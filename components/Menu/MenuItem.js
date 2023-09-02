import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { removeUser } from "../../services/StorageService";
import SubItem from "./SubItem";
import CloseMenuIcon from "../../assets/closed_menu_item.png";
import OpenMenuIcon from "../../assets/Vector.png";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const toggleAnimation = (duration) => {
  return {
    duration: duration,
    update: {
      property: LayoutAnimation.Properties.scaleXY,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };
};

const MenuItem = ({ listItem }) => {
  const [IsSubItemOpened, setIsSubItemOpened] = useState(false);

  const animationController = useRef(new Animated.Value(0)).current;

  // const arrowTransform = animationController.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "90deg"],
  // });

  const isLogout = listItem.id === "logout";

  const openMenuHandler = () => {
    if (isLogout) {
      removeUser();
      return;
    }

    setIsSubItemOpened((prevState) => !prevState);

    const duration = 350;
    const config = {
      duration: duration,
      toValue: IsSubItemOpened ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation(duration));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={openMenuHandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={listItem.img} style={{ width: 65, height: 65 }} />
          <Text style={styles.textTitle}>{listItem.title}</Text>
        </View>
        {!isLogout && (
          <View>
            <Image source={IsSubItemOpened ? OpenMenuIcon : CloseMenuIcon} style={styles.icon} />
          </View>
        )}
      </TouchableOpacity>
      {IsSubItemOpened && (
        <FlatList
          key={"_"}
          numColumns={2}
          data={listItem.subItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <SubItem subItem={item} />}
          style={styles.subItemContainer}
        />
      )}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "E3EDFB",
    marginHorizontal: 10,
    borderRadius: 14,
    overflow: "hidden",
    paddingHorizontal: 12,
  },
  titleContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  contentContainer: {
    width: "100%",
  },
  content: {
    padding: 20,
    backgroundColor: "#D6E1F0",
  },
  textContent: {
    fontSize: 14,
    color: "black",
  },
  icon: {
    height: 10,
    width: 10,
  },
  subItemContainer: {
    margin: 12,
    marginTop: 4,
    marginBottom: 20,
    elevation: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
});
