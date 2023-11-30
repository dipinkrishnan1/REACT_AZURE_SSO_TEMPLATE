import secureAPI from "./secureAPI/secureAPI";

export default async function deletePrimarySkills(id, user) {
  const endpoint = `${process.env.REACT_APP_DELETE_PRIMARY_SKILLS}?employeeName=${user}&skillId=${id}`;
  const response = await secureAPI("DELETE", endpoint);
  return response;
}
