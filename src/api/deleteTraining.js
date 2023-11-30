import secureAPI from "./secureAPI/secureAPI";

export default async function deleteTraining(id, user) {
  const endpoint = `${process.env.REACT_APP_DELETE_TRAINING}?employeeName=${user}&trainingId=${id}`;

  const response = await secureAPI("DELETE", endpoint);
  return response;
}
