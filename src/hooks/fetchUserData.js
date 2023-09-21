const BASE_URL = "http://localhost:9212/user";
export async function fetchUserData() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}
