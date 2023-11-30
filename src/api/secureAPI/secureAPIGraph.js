import axios from "axios";

export default async function secureAPIGraph(endpoint) {
  const fullEndpoint = `${endpoint}`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Application-token")}`,
    "Content-Type": "application/json",
  };
  const config = {
    method: "GET",
    url: fullEndpoint,
    headers: headers,
  };

  try {
    const apiResponse = await axios(config);

    if (apiResponse.status === 200) {
      return {
        successFlag: true,
        message: apiResponse.data.message,
        data: apiResponse.data,
      };
    } else {
      return {
        successFlag: true,
        message: apiResponse.data.message || "An error occurred",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      successFlag: false,
      message: error.message || "Please try again",
    };
  }
}
