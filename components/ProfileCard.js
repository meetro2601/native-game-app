import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainStackNames } from "../utils/enum";
import { MaterialIcons } from '@expo/vector-icons';
import PencilSvg from "../svg/PencilSvg";

const ProfileCard = ({ imageSource,name, memberId,kyc }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.card}>
      <View style={[styles.imageContainer, kyc && styles.imgVerified]}>
        <Image  source={imageSource} style={[styles.image]} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberId}>Member ID: {memberId}</Text>
        <View style={styles.kycCompleted}>
        <MaterialIcons name="verified" size={18} color={kyc ? "138808": "grey"} />
          <Text style={styles.kyc}>{kyc ? "KYC Completed": "KYC Pending"}</Text>
        </View>
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
    height:125,
    // borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#157BF2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
    // borderWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  imageContainer: {
    width: 80,
    height: 80,
    // overflow: "hidden",
    marginRight: 16,
    borderWidth:6,
    borderColor:"#157bf2",
    borderRadius:50
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    transform:[{scale:1.25},{translateY:0}],
    left:-0.3,
    top:2.75
  },
  imgVerified:{
    borderColor:"#138808"
  },
  detailsContainer: {
    flex: 1, // Take remaining space
    gap:4,
    justifyContent:"center"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 4,
  },
  memberId: {
    fontSize: 14,
    // marginBottom: 4,
    color: "#959595",
  },
  kycCompleted: {
    flexDirection:"row",
    gap:5,
    alignItems:"center"
  },
  kyc: {
    fontSize: 16,
    fontWeight: 600,
    // marginBottom: 4,
  },
});
