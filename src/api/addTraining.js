import { get } from "react-hook-form";
import secureAPI from "./secureAPI/secureAPI";

export default async function addTraining(data, user) {
  const trainingNameId = get(data, "Training Name")?.id;

  if (!trainingNameId) {
    console.error("Training Name ID is missing in data");
    return { successFlag: false, message: "Invalid data" };
  }

  const request = {
    employee: {
      employeeName: user,
      trainings: [
        {
          trainingNameId,
        },
      ],
    },
  };

  const response = await secureAPI(
    "POST",
    process.env.REACT_APP_ADD_TRAINING,
    request
  );
  return response;
}
