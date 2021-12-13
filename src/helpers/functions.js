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
