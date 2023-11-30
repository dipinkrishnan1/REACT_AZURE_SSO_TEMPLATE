import axios from "axios";

export default async function secureAPI(method = "GET", endpoint, request) {
  const fullEndpoint = `${process.env.REACT_APP_BACKEND}${endpoint}`;
  const startTime = new Date().getTime();
  const minimumResponseTime = 150;
  try {
    let apiResponse;

    switch (method) {
      case "GET":
        apiResponse = await axios.get(fullEndpoint);
        break;
      case "POST":
        apiResponse = await axios.post(fullEndpoint, request);
        break;
      case "DELETE":
        apiResponse = await axios.delete(fullEndpoint, request);
        break;
      case "PUT":
        apiResponse = await axios.put(fullEndpoint, request);
        break;
      default:
        throw new Error("Invalid Method");
    }

    const endTime = new Date().getTime();
    const actualResponseTime = endTime - startTime;

    if (actualResponseTime < minimumResponseTime && method === "GET") {
      const delayTime = minimumResponseTime - actualResponseTime;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }

    if (apiResponse.status === 200) {
      if (apiResponse.data.isSuccess === "false") {
        return {
          successFlag: false,
          message: apiResponse.data.message,
        };
      }
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
