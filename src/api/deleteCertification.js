import secureAPI from "./secureAPI/secureAPI";

export default async function deleteCertification(id, user) {
  const endpoint = `${process.env.REACT_APP_DELETE_CERTIFICATION}?employeeName=${user}&certNameId=${id}`;
  const response = await secureAPI("DELETE", endpoint);
  return response;
}
