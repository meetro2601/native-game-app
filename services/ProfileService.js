import { getUser } from "./StorageService";
import { postFetchCall } from "./BaseService";

const hostUrl = "https://mmservice.smartechy.net";

export async function updateProfile(body) {
  const {token} = await getUser();

  if (token) {
    const data = {
      "usr_Id": 0,
      "usr_UserName": body.nickname,
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

export async function getUserDetails(usertoken) {
  try {
    const storedToken = await getUser();
    const token = usertoken ? usertoken : storedToken.token;
    // console.log(data)
    const response = await fetch(hostUrl + "/getuserdetail", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + token,
        mode: "no-cors",
      }
    });

    // const res = await postFetchCall(hostUrl + "/updateProfile", "POST", token, data);
    // if(response.status == 200){
    const userInfo = await response.json();
    const userData = {
      fullName: userInfo.usr_Name || "",
      username: userInfo.usr_UserName || "",
      email: userInfo.usr_EmailId || "",
      phone: userInfo.usr_MobileNo || "",
      dob: userInfo.DOB || "",
      gender: userInfo.prf_Gender || false,
      memberId: userInfo.uniqueid || "",
      kycDone: (userInfo.usr_PAN != "" || userInfo.usr_AadhaarNo != "") ? true : false
    }
    return { message: "success", data: userData };
    // }
    // return await response.json();

  } catch (error) {
    console.log(error)
    return { error: "Unable to get user data (Internal Error)" }
  }
}

export async function validateAccount(token) {

  try {
    // const user = await getUser();

    // const token = user.token;
    // console.log(data)
    const response = await fetch(hostUrl + "/validateaccount", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + token,
        mode: "no-cors",
      }
    });
    const res = await response.json();
    if (response.status == 200 && res.message == "Success") {
      return true
    } 
  } catch (error) {
    return false
  }
}
