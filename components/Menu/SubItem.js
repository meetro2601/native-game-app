import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";

const SubItem = ({ subItem }) => {
  return (
    <View style={styles.subItem}>
      <Image source={subItem.icon} />
      <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode="tail">{subItem.title}</Text>
    </View>
  );
};

export default SubItem;

const styles = StyleSheet.create({
  subItem: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
});
