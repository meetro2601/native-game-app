export const makeFetchCall = async (url, accessToken) => {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + accessToken
        },
    });
    return response;
}

export const postFetchCall = async (url, method, accessToken, data) => {
    // console.log("Data in postFetchCall: " + JSON.stringify(data))
    let response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + accessToken,
        },
        body: JSON.stringify(data)
    });
    return response;
}
