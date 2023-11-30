import secureAPI from "./secureAPI/secureAPI";

export default async function searchEmployees(query) {
  const response = await secureAPI(
    "GET",
    `${process.env.REACT_APP_SEARCH_EMPLOYEE}${query}`
  );
  return response;
}
