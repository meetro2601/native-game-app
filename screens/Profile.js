import { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, Text, Image, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, ScrollView, Alert, Button } from "react-native";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { Back } from "../components/Back";
import { profileStyles } from "../styles/Profile";
import { updateProfile } from "../services/ProfileService";
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { getUserDetails } from "../services/ProfileService";
import React from "react";
import { AuthContext } from "../context/AuthContext";

const data = [
  { label: 'Male', value: 'false' },
  { label: 'Female', value: 'true' },
  { label: 'Other', value: 'other' },
]

const local_data = [
  {
    value: '+91',
    lable: "+91",
    image: require("../assets/flag.png")
  },
  {
    value: '+92',
    lable: '+92',
    image: {
      uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    },
  },
  {
    value: '+934',
    lable: '+934',
    image: require("../assets/flag.png")
  },
];


export function Profile(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dob, setdob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({
    code: "+91", num: ""
  });
  const [gender, setgender] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setdobError] = useState("");
  const [nickNameError, setnickNameError] = useState("");
  const [isEditable, setisEditable] = useState(true)
  const [auth, setAuth] = useContext(AuthContext)

  const nav = useNavigation()

  useEffect(() => {
      if (auth.user) {
        if (auth.user.username != "") {
          setisEditable(false)
        }
        setNickname(auth.user.username)
        setFullName(auth.user.fullName)
        setEmail(auth.user.email)
        setPhoneNumber({ ...phoneNumber, num: auth.user.phone })
        setgender(auth.user.gender)
        const birth = moment(auth.user.dob).format("DD/MM/YYYY")
        if(birth != "Invalid date"){
          setdob(birth)
        }
      }
  }, [auth.user])


  const changeNameHandler = (name) => {
    setFullName(name);
  };

  const changeNicknameHandler = (name) => {
    setnickNameError("")
    setNickname(name);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateDOB = (value) => {
    return String(value)
      .match(
        /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/
      );
  };

  const changeEmailHandler = (name) => {
    setEmailError("");
    setEmail(name);
  };

  const changeNumberHandler = (number) => {
    setPhoneNumber({ ...phoneNumber, num: number });
  };

  const changeDOBHandler = (value) => {
    setdob(value)
    setdobError("")
  };

  const formSubmitHandler = async () => {
    setIsSubmitting(true);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
    }
    if (!validateDOB(dob)) {
      setdobError("Please enter in DD/MM/YYYY format")
      setIsSubmitting(false);
    }

    if (nickname === "") {
      setnickNameError("Nick name is required")
      setIsSubmitting(false);
    }
    
    let birthDate = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD")
    try {
      if (fullName && nickname && birthDate && email) {
        let Profile = { fullName, nickname, birthDate, email, phoneNumber, gender }
        const res = await updateProfile(Profile);
        // console.log(res)
        if (res.message == "success") {
          const updatedData = await getUserDetails()
          if(!updatedData.error && !auth.user.socialId){
            setAuth({ isAuthenticating: false, isAuthenticated: true, user: updatedData.data})
            showAlert()
          }
          else {
            setAuth({ isAuthenticating: false, isAuthenticated: true, user: {...updatedData.data,socialId:auth.user.socialId,socialProvider:auth.user.socialProvider}})
          }
        }
        setIsSubmitting(false);
        // console.log(res);
      }
    }
    catch (err) {
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const showAlert = ()=>{
    Alert.alert('Success', 'Profile Updated Successfully!', [
      {text: 'OK', onPress: () => nav.navigate("Main")},
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <ScrollView contentContainerStyle={[{ justifyContent: "space-evenly", gap: 24, paddingHorizontal: 48 }]}>
        <View style={profileStyles.defaultImg}>
          <Image source={require("./../assets/user.jpg")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={profileStyles.fromControl}>
          <TextInput
            style={profileStyles.input}
            placeholder="Full Name"
            placeholderTextColor={"#d4d4d4"}
            underlineColorAndroid="transparent"
            value={fullName}
            onChangeText={changeNameHandler}
          />
        </View>
        <View style={profileStyles.fromControl}>
          <TextInput
            style={profileStyles.input}
            placeholder="Nickname"
            editable={isEditable}
            placeholderTextColor={"#d4d4d4"}
            underlineColorAndroid="transparent"
            value={nickname}
            onChangeText={changeNicknameHandler}
          />
          {nickNameError && <Text style={profileStyles.errorText}>{nickNameError}</Text>}
        </View>
        <View style={profileStyles.fromControl}>
          <TextInput
            style={profileStyles.input}
            placeholder="Date of Birth"
            placeholderTextColor={"#d4d4d4"}
            underlineColorAndroid="transparent"
            value={dob}
            onChangeText={changeDOBHandler}
          />
          {dobError && <Text style={profileStyles.errorText}>{dobError}</Text>}
        </View>
        <View style={profileStyles.fromControl}>
          <TextInput
            style={profileStyles.input}
            placeholder="Email"
            placeholderTextColor={"#d4d4d4"}
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={changeEmailHandler}
          />
          {emailError && <Text style={profileStyles.errorText}>{emailError}</Text>}
        </View>
        <View style={[profileStyles.input, { flexDirection: "row", zIndex: 1000 }]}>
          <SelectCountry style={{ width: "20%" }}
            data={local_data}
            // mode="modal"
            labelField={"lablel"}
            valueField={"value"}
            imageField="image"
            imageStyle={{ paddingStart: 5, width: 20, left: 8 }}
            iconColor="#d4d4d4"
            autoScroll={false}
            maxHeight={60}
            value={phoneNumber.code}
            selectedTextStyle={[profileStyles.dropdownText]}
            onChange={e => {
              setPhoneNumber({ ...phoneNumber, code: e.value });
            }}
          />
          <Text style={[profileStyles.dropdownText, { alignSelf: "center", paddingHorizontal: 5 }]}>{phoneNumber.code}</Text>
          <TextInput
            style={[profileStyles.dropdownText]}
            placeholderTextColor={"#d4d4d4"}
            onChangeText={changeNumberHandler}
            value={phoneNumber.num}
            keyboardType="numeric"
            placeholder="Phone Number"
            dataDetectorTypes="phoneNumber"
            underlineColorAndroid="transparent"
            maxLength={10}
          />
        </View>
        <View style={[profileStyles.fromControl]}>
          <Dropdown mode="modal" style={profileStyles.input} data={data} labelField="label"
            valueField="value" onChange={item => {
              setgender(item.value);
            }}
            value={{ value: gender?.toString() }}
            itemTextStyle={profileStyles.dropdownText}
            containerStyle={{ borderRadius: 15 }}
            placeholder="Gender"
            placeholderStyle={{ color: "#d4d4d4" }}
            backgroundColor="#0006"
            selectedTextStyle={profileStyles.dropdownText}
            iconColor="#d4d4d4"
          />
        </View>
        <TouchableOpacity style={profileStyles.submitBtn} activeOpacity={0.5} onPress={formSubmitHandler}>
          {isSubmitting ? <ActivityIndicator color={"white"} size={"large"} /> : <Text style={profileStyles.submitBtnText}>Continue</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header(props) {
  return (
    <View style={[{ paddingHorizontal: 20, height: 50, flexDirection: "row", alignItems: "center", gap: 15 }]}>
      <Back />
      <Text style={[profileStyles.headerMid, profileStyles.font20]}>Fill Your Profile</Text>
      {/* <TouchableOpacity style={[profileStyles.headerRight]} /> */}
    </View>
  );
}

function ProfileForm(props) {
  return (
    <View style={[profileStyles.form, { marginTop: 20 }]}>
      <View style={profileStyles.defaultImg}>
        <Image source={require("./../assets/user.jpg")} />
      </View>
      <FormControl placeHolder="Full Name" />
      <FormControl placeHolder="Nickname" />
      <FormControl placeHolder="Email" />
      <FormControl placeHolder="+919999999999" />
      <TouchableOpacity
        style={[profileStyles.font20, profileStyles.button, profileStyles.buttonPrimary]}
        accessibilityRole="button"
      >
        <Text style={[{ color: "#ffffff" }]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormControl(props) {
  return (
    <View style={[profileStyles.formLabel, profileStyles.formLabelIcon]}>
      <TextInput style={[profileStyles.formInput]} mode="outlined" placeholder={props.placeHolder} />
    </View>
  );
}
