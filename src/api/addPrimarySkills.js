import { get } from "react-hook-form";
import secureAPI from "./secureAPI/secureAPI";
import getEmployee from "./getEmployeeDetails";

export default async function addPrimarySkills(data, user) {
  try {
    const currentSkills = await getEmployee("view", user);
    if (currentSkills.skillMatrix.length > 4)
      return {
        successFlag: false,
        message:
          "You've already added your top 5 skills. Please remove a skill to add a new one",
      };
  } catch (error) {
    return { successFlag: false, message: "Please try again" };
  }
  const proficiency = get(data, "Proficiency");
  const skillId = get(data, "Skill Name")?.id;
  const totalExperience = Number(get(data, "Total Experience")?.id);

  if (!proficiency || !skillId || isNaN(totalExperience)) {
    console.error("Invalid data for adding primary skills");
    return { successFlag: false, message: "Invalid data" };
  }

  const request = {
    skills: [
      {
        proficiency,
        skillId,
        totalExperience,
      },
    ],
  };

  const endpoint = `${process.env.REACT_APP_ADD_PRIMARY_SKILLS}${user}`;
  const response = await secureAPI("POST", endpoint, request);
  return response;
}
