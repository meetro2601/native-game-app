import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";

const SubItem = ({ subItem }) => {
  return (
    <View style={styles.subItem}>
      <View style={styles.imgContainer}>
      <Image resizeMode="center" style={{width:"100%",height:"100%"}} source={subItem.icon} />
      </View>
      <View style={{flex:3}}>
      <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode="tail">{subItem.title}</Text>
      </View>
    </View>
  );
};

export default SubItem;

const styles = StyleSheet.create({
  subItem: {
    flexDirection: "row",
    flex: 1,
    margin:8
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginStart:10,
    // flex: 1,
    flexWrap: "wrap",
  },
  imgContainer:{
    borderWidth:1,
    borderColor:"#d3cfcf",
    borderRadius:5,
    backgroundColor:"#fafcff",
    // flex:1,
    alignItems:"center",
    justifyContent:"center",
    height:50,
    width:50,
    // width:30,
  //  aspectRatio:1,
   padding:8
  }
});
