import secureAPI from "./secureAPI/secureAPI";

export default async function searchCertifications(query) {
  try {
    const response = await secureAPI(
      "GET",
      `${process.env.REACT_APP_SEARCH_CERTIFICATIONS}${query}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
