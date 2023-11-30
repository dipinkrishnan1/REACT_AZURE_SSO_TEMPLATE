import axios from "axios";

export default async function secureAPIGetFile(endpoint, user) {
  const fullEndpoint = `${process.env.REACT_APP_BACKEND}${endpoint}${user}`;

  try {
    const response = await axios.get(fullEndpoint, {
      responseType: "blob",
    });

    if (response.status === 200) {
      return { successFlag: true, message: "Done", file: response.data };
    } else if (response.status === 404) {
      return { successFlag: false, message: "No Resume Found" };
    } else {
      console.error("Error downloading file. Status code:", response.status);
    }
  } catch (error) {
    if (error.response.status === 404) {
      return { successFlag: false, message: "No Resume Found" };
    }
  }

  return { successFlag: false, message: "Get Resume failed" };
}
