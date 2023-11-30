import secureAPI from "./secureAPI/secureAPI";

export default async function updateEmployee(about, user) {
  if (about?.trim().length > 999) {
    return {
      successFlag: false,
      message: "Character limit exceeded. Maximum 1000 characters allowed.",
    };
  }
  const request = {
    employee: {
      employeeName: user,
      about: about?.trim(),
    },
  };

  const response = await secureAPI(
    "PUT",
    process.env.REACT_APP_UPDATE_EMPLOYEE,
    request
  );

  return response;
}
