import { getUser } from "./StorageService";
import { postFetchCall } from "./BaseService";

const hostUrl = "https://mmservice.smartechy.net";

export async function updateProfile(body) {
  const user = await getUser();

  if (user) {
    const token = user.token;
    const username = user.user.name;
    const data = {
      usr_id: 0,
      usr_UserName: username,
      usr_Name: body.fullName,
      usr_MobileNo: body.phoneNumber,
      usr_EmailId: body.email,
    };
    // const res = await postFetchCall(hostUrl + "/updateProfile", "POST", token, data);
    // console.log(res)
    // return await res.json();
    console.log(res);
  } else {
    return { data: [] };
  }
}
