const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok");
  return data;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export async function getParkAlerts() {
  const parkAlerts = await getJson("alerts?parkCode=yell");
  return parkAlerts.data; // get the whole array
}

export async function getVisitorCenterData() {
  const parkVisitorCenterData = await getJson("visitorcenters?parkCode=yell");
  return parkVisitorCenterData.data;
}

export async function getActivityData() {
  const parkActivityData = await getJson("activities?parkCode=yell");
  console.log(parkActivityData);
  return parkActivityData.data;
}