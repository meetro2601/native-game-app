import { makeFetchCall, postFetchCall } from "./BaseService";
import { getUser } from "./StorageService";

const hostUrl = "https://mmservice.smartechy.net";

export async function getToken() {
  const user = await getUser();
  console.log(user);
  return user.token;
}

export async function getCurrentUserGamePoints() {
  const user = await getUser();
  console.log(JSON.stringify(user));
  if (user) {
    console.log("Found user in storagem");
    const token = user.token;
    console.log(user);
    const data = {
      mm_GameId: 0,
      mm_QuizId: 0,
      mm_UserName: user.user.name,
      //mm_UserName: "powergirl",
      mm_RecordCount: 10,
      //   mm_InstanceStart: "2022-01-01",
      //   mm_InstanceEnd: "2023-07-31",
    };
    const res = await postFetchCall(hostUrl + "/getgamepoints", "POST", token, data);
    return await res.json();
  }
}

export async function getAllUsersGamePoints(interval) {
  const user = await getUser();

  if (user) {
    const token = user.token;
    console.log(token, "token")
    const data = {
      mm_GameId: 0,
      mm_QuizId: 0,
      mm_UserName: "",
      mm_RecordCount: 20,
      mm_InstanceStart: interval.start,
      mm_InstanceEnd: interval.end,
    };
    const res = await postFetchCall(hostUrl + "/getgamepoints", "POST", token, data);
    return await res.json();
  } else {
    return { data: [] };
  }
}
