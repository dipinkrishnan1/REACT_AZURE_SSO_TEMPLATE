import secureAPI from "./secureAPI/secureAPI";

export default async function searchSkills(query) {
  try {
    const response = await secureAPI(
      "GET",
      `${process.env.REACT_APP_SEARCH_SKILLS}${query}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
