import React, { useState, useRef, useContext } from "react";
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
import * as authorize from '@react-native-firebase/auth';
import { removeUser } from "../../services/StorageService";
import SubItem from "./SubItem";
import CloseMenuIcon from "../../assets/closed_menu_item.png";
import OpenMenuIcon from "../../assets/Vector.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthContext } from "../../context/AuthContext";

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
  const [auth, setAuth] = useContext(AuthContext)

  const animationController = useRef(new Animated.Value(0)).current;

  // const arrowTransform = animationController.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "90deg"],
  // });

  const isLogout = listItem.id === "logout";

  const signOut = async () => {
    console.log(auth.user.socialId)
    try {
      if (auth.user.socialId != undefined) {
        await GoogleSignin.signOut()
        await authorize.firebase.auth().signOut();
      } 
      removeUser()
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        console.log("Signed Out")
        setAuth({ isAuthenticated: false, isAuthenticating: false, user: {}})
      }, 2500);
    }
  };

  const openMenuHandler = () => {
    if (isLogout) {
      signOut()
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
        // <View style={styles.subItemContainer}>
        //   {
        //     (listItem.subItems).length > 0 && (listItem.subItems).map((item,index) => {
        //       return <SubItem key={index} subItem={item} />
        //     })
        //   }
        //   </View>
        // <View >

        <FlatList
          key={"_"}
          numColumns={2}
          data={listItem.subItems}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <SubItem subItem={item} />}
          style={styles.subItemContainer}
        />
        // </View>
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
    padding: 10,
    // shadowColor:"white",
    // flex:1,
    elevation: 10,
    borderRadius: 16,
    // borderWidth:0.2,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    // borderColor:"none"
    backgroundColor: "#FFF",
    // flexDirection:"row",
    // flexWrap:"wrap"
  },
});
