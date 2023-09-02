import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainStackNames } from "../utils/enum";
import Menu from "../svg/Menu";
import PencilSvg from "../svg/PencilSvg";

const ProfileCard = ({ imageSource, imageSource1, name, memberId }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberId}>Member ID: {memberId}</Text>
        <Text style={styles.kycCompleted}>
          <Image source={imageSource1} style={{ width: 17, height: 17 }}></Image>
          <Text style={styles.kyc}>KYC Completed</Text>
        </Text>
      </View>
      <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate(MainStackNames.Profile)}>
        <PencilSvg />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#157BF2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: "hidden",
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1, // Take remaining space
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  memberId: {
    fontSize: 14,
    marginBottom: 4,
    color: "#959595",
  },
  kycCompleted: {
    fontSize: 14,
  },
  kyc: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
