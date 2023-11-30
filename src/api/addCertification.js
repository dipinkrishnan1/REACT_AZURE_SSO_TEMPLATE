import { get } from "react-hook-form";
import secureAPI from "./secureAPI/secureAPI";

export default async function addCertification(data, user) {
  const certificationNameId = get(data, "Certification Name")?.id;

  if (!certificationNameId) {
    console.error("Certification Name ID is missing in data");
    return { successFlag: false, message: "Invalid data" };
  }

  const request = {
    employee: {
      employeeName: user,
      certifications: [
        {
          certNameId: certificationNameId,
        },
      ],
    },
  };

  const response = await secureAPI(
    "POST",
    process.env.REACT_APP_ADD_CERTIFICATION,
    request
  );
  return response;
}
