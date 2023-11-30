import axios from "axios";

export default async function secureAPICodeTable(endpoint) {
  if (endpoint === "H_NUMBER") {
    const data = [];
    for (let i = 0; i <= 25; i++) {
      data.push({
        id: i,
        name: i.toString(),
      });
    }
    return data;
  }
  const fullEndpoint = `${process.env.REACT_APP_BACKEND}${endpoint}`;

  try {
    const apiResponse = await axios.get(fullEndpoint);

    if (apiResponse.status === 200) {
      return apiResponse.data;
    }

    console.error(`Request failed with status code ${apiResponse.status}`);
  } catch (error) {
    console.error(error);
  }

  return [];
}
