const BASE_URL = "http://localhost:9212/user/";
export async function postUserData(userData) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Response) {
      // Log the server response for more information
      console.error("Server Response:", await error.text());
    }
  }
}
