import { getUser } from "./StorageService";
import { postFetchCall } from "./BaseService";

const hostUrl = "https://mmservice.smartechy.net";

export async function updateProfile(body) {
  const user = await getUser();


  if (user) {
    const token = user.token;
    const username = user.user.name;
    const data = {
      "usr_Id": 0,
      "usr_UserName": username,
      "usr_Name": body.fullName,
      "usr_MobileNo": body.phoneNumber.num,
      "usr_EmailId": body.email,
      "prf_Gender": body.gender,
      "usr_DOB": body.birthDate
    };
    // console.log(data)
    const res = await postFetchCall(hostUrl + "/updateProfile", "POST", token, data);
    return await res.json();
  } else {
    return { data: [] };
  }
}

export async function getUserDetails(body) {

  const user = await getUser();
  if (user) {
    const token = user.token;
    // console.log(data)
    const response = await fetch(hostUrl+"/getuserdetail", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + token
      }
    });
    // const res = await postFetchCall(hostUrl + "/updateProfile", "POST", token, data);
    return await response.json();
  } else {
    return { data: [] };
  }
}
