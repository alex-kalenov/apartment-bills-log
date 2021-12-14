import { API_KEY, APP_PATH } from "./data";

export async function loginRequest(credentials) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        returnSecureToken: true
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Произошла ошибка.");
  }
  return data;
}

export async function getData(passDetails) {
  const response = await fetch(
    `${APP_PATH}${passDetails.userId}/${passDetails.category}.json?auth=${passDetails.token}`
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Произошла ошибка.");
  }

  const transformedData = [];

  for (const key in data) {
    const dataObj = {
      id: key,
      ...data[key]
    };

    transformedData.push(dataObj);
  }

  return transformedData;
}

export async function sendData(passDetails) {
  const response = await fetch(
    `${APP_PATH}${passDetails.userId}/${passDetails.category}.json?auth=${passDetails.token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().getTime() / 1000,
        paid: 0,
        value: 0
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Произошла ошибка.");
  }
  return null;
}
