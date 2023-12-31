import { makeFetchCall, postFetchCall } from "./BaseService";
import { getUser } from "./StorageService";

const hostUrl = "https://mmservice.smartechy.net";

export async function getToken() {
  const user = await getUser();
  // console.log(user);
  return user.token;
}

export async function getAllgames(){
  const {token} = await getUser();
  if (token) {
    const res = await postFetchCall(hostUrl + "/getgames", "POST", token,{});
    return await res.json();
  }
}

export async function getCurrentUserGamePoints(username) {
  const {token} = await getUser();
  // console.log(JSON.stringify(user));
  if (token) {
    // console.log("Found personal user in storage");
    // console.log(username);
    const data = {
      mm_GameId: 0,
      mm_QuizId: 0,
      mm_UserName: username,
      //mm_UserName: "powergirl",
      mm_RecordCount: 20,
      //   mm_InstanceStart: "2022-01-01",
      //   mm_InstanceEnd: "2023-07-31",
    };
    const res = await postFetchCall(hostUrl + "/getgamepoints", "POST", token, data);
    return await res.json();
  }
}

export async function getUserGameWisePoints(username) {
  const {token} = await getUser();
  // console.log(JSON.stringify(user));
  if (token) {
    // console.log("Found personal user in storage");
    // console.log(username);
    const data = {
      mm_GameId: 0,
      mm_QuizId: 0,
      mm_UserName: username,
      //mm_UserName: "powergirl",
      mm_RecordCount: 20,
      //   mm_InstanceStart: "2022-01-01",
      //   mm_InstanceEnd: "2023-07-31",
    };
    const res = await postFetchCall(hostUrl + "/getgamewisepoints", "POST", token, data);
    return await res.json();
  }
}

export async function getAllUsersGamePoints(interval) {
  const user = await getUser();
  // console.log(interval)

  if (user) {
    const token = user.token;
    // console.log(token, "token")
    const data = {
      mm_GameId: 0,
      mm_QuizId: 0,
      mm_UserName: "",
      mm_RecordCount: 20,
      mm_InstanceStart: interval.start,
      mm_InstanceEnd: interval.end,
    };
    const res = await postFetchCall(hostUrl + "/getgamepoints", "POST", token, data);
    // const resp = await res.json()
    // console.log(resp)
    return await res.json();
  } else {
    return { data: [] };
  }
}
