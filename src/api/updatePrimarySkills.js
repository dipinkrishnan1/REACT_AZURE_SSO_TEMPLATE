import secureAPI from "./secureAPI/secureAPI";

export default async function updatePrimarySkills(data, user) {
  const request = {
    skills: [
      {
        proficiency: data?.Proficiency,
        skillId: data?.["Skill Name"]?.id,
        totalExperience: Number(data?.["Total Experience"]?.id || 0),
      },
    ],
  };

  const response = await secureAPI(
    "PUT",
    `${process.env.REACT_APP_UPDATE_PRIMARY_SKILLS}${user}`,
    request
  );
  return response;
}
