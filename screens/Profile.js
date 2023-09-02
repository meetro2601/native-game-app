import { useState } from "react";
import { View, TouchableOpacity, TextInput, Text, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { MadMoneyApp } from "../components/MadMoneyApp";
import { Back } from "../components/Back";
import { profileStyles } from "../styles/Profile";
import { updateProfile } from "../services/ProfileService";

export function Profile(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeNameHandler = (name) => {
    setFullName(name);
  };

  const changeNicknameHandler = (name) => {
    setNickname(name);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const changeEmailHandler = (name) => {
    setEmailError("");
    setEmail(name);
  };

  const changeNumberHandler = (number) => {
    setPhoneNumber(number);
  };

  const formSubmitHandler = async () => {
    setIsSubmitting(true);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      try {
        const res = await updateProfile({ fullName, email, phoneNumber });
        console.log(res);
      } catch (err) {
        console.log(err);
        setIsSubmitting(false);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <MadMoneyApp>
      <View style={[{ padding: 48 }]}>
        <Header />
        <SafeAreaView style={[{ flex: 1, gap: 24 }]}>
          <View style={profileStyles.defaultImg}>
            <Image source={require("./../assets/user.jpg")} />
          </View>
          <View style={profileStyles.fromControl}>
            <TextInput
              style={profileStyles.input}
              placeholder="Full Name"
              underlineColorAndroid="transparent"
              value={fullName}
              onChangeText={changeNameHandler}
            />
          </View>
          <View style={profileStyles.fromControl}>
            <TextInput
              style={profileStyles.input}
              placeholder="Nickname"
              underlineColorAndroid="transparent"
              value={nickname}
              onChangeText={changeNicknameHandler}
            />
          </View>
          <View style={profileStyles.fromControl}>
            <TextInput
              style={profileStyles.input}
              placeholder="Email"
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={changeEmailHandler}
            />
            {emailError && <Text style={profileStyles.errorText}>{emailError}</Text>}
          </View>
          <View style={profileStyles.fromControl}>
            <TextInput
              style={profileStyles.input}
              onChangeText={changeNumberHandler}
              value={phoneNumber}
              keyboardType="numeric"
              placeholder="Phone Number"
              dataDetectorTypes="phoneNumber"
              underlineColorAndroid="transparent"
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={profileStyles.submitBtn} activeOpacity={0.5} onPress={formSubmitHandler}>
            {isSubmitting ? <ActivityIndicator /> : <Text style={profileStyles.submitBtnText}>Continue</Text>}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </MadMoneyApp>
  );
}

function Header(props) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", gap: 15 }]}>
      <Back />
      <Text style={[profileStyles.headerMid, profileStyles.font20]}>Fill Your Profile</Text>
      <TouchableOpacity style={[profileStyles.headerRight]} />
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
