import secureAPI from "./secureAPI/secureAPI";

export default async function addEmployee(user) {
  const request = {
    employee: {
      employeeName: user,
      about: "",
      userRole: {
        role: "",
      },
    },
  };

  const response = await secureAPI(
    "POST",
    process.env.REACT_APP_ADD_EMPLOYEE,
    request
  );
  return response;
}
