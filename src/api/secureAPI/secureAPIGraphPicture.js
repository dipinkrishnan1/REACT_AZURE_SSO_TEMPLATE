import axios from "axios";

export default async function secureAPIGraphPicture(endpoint) {
  const fullEndpoint = `${endpoint}`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Application-token")}`,
  };
  const config = {
    method: "GET",
    url: fullEndpoint,
    headers: headers,
    responseType: "blob",
  };

  try {
    const apiResponse = await axios(config);
    const imageblob = new Blob([apiResponse.data], { type: "image/jpeg" }); // Adjust the 'type' based on the image format
    const imageUrl = URL.createObjectURL(imageblob);
    return {
      successFlag: true,
      imageUrl: imageUrl,
    };
  } catch (error) {
    return {
      successFlag: false,
      message: error.message || "Please try again",
    };
  }
}
