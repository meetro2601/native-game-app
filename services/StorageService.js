import AsyncStorage from "@react-native-async-storage/async-storage";

async function setItem(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}

async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value){
      return JSON.parse(value);
    }
    return {token:""};
  } catch (e) {
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function persistUser(token) {
  await setItem("auth", { token: token });
}
export async function getUser() {
  //return {user: {name: "powergirl"}, token: 'YWRtaW46YXNk'}
  return await getItem("auth");
}

export async function removeUser() {
  return await removeItem("auth");
}
