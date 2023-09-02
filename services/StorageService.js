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
    return JSON.parse(value);
  } catch (e) {
    return null;
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

export async function persistUser(user, token) {
  await setItem("auth", { user: user, token: token });
}
export async function getUser() {
  //return {user: {name: "powergirl"}, token: 'YWRtaW46YXNk'}
  return await getItem("auth");
}

export async function removeUser() {
  return await removeItem("auth");
}
