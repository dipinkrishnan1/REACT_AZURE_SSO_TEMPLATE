import secureAPI from "./secureAPI/secureAPI";

export default async function getEmployee(type = "view", user) {
  const response = await secureAPI(
    "GET",
    `${process.env.REACT_APP_GET_EMPLOYEE}${user}`
  );
  const employee = {};

  if (response.message === "NOT_FOUND") {
    return prepareNotFoundEmployee();
  }

  if (response.successFlag === false) {
    throw new Error(response.message);
  }

  const employeeResponse = response?.data?.employeeDto;
  employee.isFound = true;
  employee.about = employeeResponse.about;
  employee.isResumeUploaded = employeeResponse.isResumeUploaded;
  employee.isAdmin = employeeResponse.userRole?.role === "admin";
  if (type.toUpperCase() === "ADMIN") {
    return employee;
  }
  if (type.toUpperCase() === "EDIT") {
    return prepareEmployeeForEdit(employee, employeeResponse);
  } else {
    return prepareEmployeeForView(employee, employeeResponse);
  }
}

function prepareNotFoundEmployee() {
  return {
    isFound: false,
  };
}

function prepareEmployeeForEdit(employee, employeeResponse) {
  employee.skillMatrix = mapSkills(employeeResponse.skills);
  employee.trainingMatrix = mapTrainings(employeeResponse.trainings);
  employee.certificationMatrix = mapCertifications(
    employeeResponse.certifications
  );

  return employee;
}

function prepareEmployeeForView(employee, employeeResponse) {
  employee.skillMatrix = mapSkillsForView(employeeResponse.skills);
  employee.trainingMatrix = mapTrainingsForView(employeeResponse.trainings);
  employee.certificationMatrix = mapCertificationsForView(
    employeeResponse.certifications
  );
  employee.skillMatrixLTD = formatLastUpdatedDate(employeeResponse.skills);
  employee.trainingMatrixLTD = formatLastUpdatedDate(
    employeeResponse.trainings
  );
  employee.certificationMatrixLTD = formatLastUpdatedDate(
    employeeResponse.certifications
  );
  return employee;
}

function mapSkills(skills) {
  return skills.map((obj, index) => {
    return {
      title: `Primary Skill #${index + 1}`,
      skillId: obj.skillId,
      list: [
        {
          id: "1",
          label: "Skill Name",
          value: {
            id: obj.skillId,
            name: obj.skillName,
          },
          type: "auto_select",
          codeTable: [],
          codeTableName: process.env.REACT_APP_CODE_TABLE_SKILLS,
          required: true,
          disabled: true,
        },
        {
          id: "2",
          label: "Proficiency",
          value: obj.proficiency,
          type: "select",
          codeTable: ["Beginner", "Intermediate", "Advanced"],
          required: true,
        },
        {
          id: "7",
          label: "Total Experience",
          type: "auto_select",
          codeTable: [],
          value: {
            id: obj.totalExperience ? obj.totalExperience : 0,
            name: obj.totalExperience ? obj.totalExperience : 0,
          },
          codeTableName: "H_NUMBER",
        },
      ],
    };
  });
}

function mapTrainings(trainings) {
  return trainings.map((obj, index) => {
    return {
      title: `Training #${index + 1}`,
      trainingNameId: obj.trainingNameId,
      list: [
        {
          id: "1",
          label: "Training Name",
          value: obj.trainingName,
          type: "readonly",
          codeTable: [],
          codeTableName: process.env.REACT_APP_CODE_TABLE_TRAININGS,
          required: true,
          disabled: true,
        },
      ],
    };
  });
}

function mapCertifications(certifications) {
  return certifications.map((obj, index) => {
    return {
      title: `Certification #${index + 1}`,
      certNameId: obj.certNameId,
      list: [
        {
          id: "1",
          label: "Certification Name",
          value: obj.certName,
          type: "readonly",
          codeTable: [],
          codeTableName: process.env.REACT_APP_CODE_TABLE_CERTIFICATIONS,
          required: true,
          disabled: true,
        },
      ],
    };
  });
}

function mapSkillsForView(skills) {
  const mappedSkills = skills?.map((obj, index) => {
    return {
      id: `${index}`,
      label: obj.skillName,
      value: `${
        obj.totalExperience
          ? ` ${obj.totalExperience} Year(s) of Experience |`
          : ""
      } ${obj.proficiency}`,
    };
  });

  // Reverse the array
  return mappedSkills?.reverse();
}

function mapTrainingsForView(trainings) {
  const mappedTrainings = trainings?.map((obj, index) => {
    return {
      id: `${index}`,
      trainingNameId: obj.trainingNameId,
      label: obj.trainingName,
    };
  });

  // Reverse the array
  return mappedTrainings?.reverse();
}

function mapCertificationsForView(certifications) {
  const mappedCertifications = certifications?.map((obj, index) => {
    return {
      id: `${index}`,
      label: obj.certName,
    };
  });

  // Reverse the array
  return mappedCertifications?.reverse();
}

function formatLastUpdatedDate(obj) {
  if (!obj || !Array.isArray(obj) || obj.length === 0) {
    return "";
  }

  let lastUpdatedDate = new Date(0); // Initialize with a date in the distant past

  for (const skill of obj) {
    const lastUpdatedDt = new Date(skill.lastUpdatedDt);

    if (lastUpdatedDt > lastUpdatedDate) {
      lastUpdatedDate = lastUpdatedDt;
    }
  }

  const day = lastUpdatedDate.getDate();
  const month = lastUpdatedDate.getMonth() + 1;
  const year = lastUpdatedDate.getFullYear();
  const hours = lastUpdatedDate.getHours();
  const minutes = lastUpdatedDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  const formattedDate = ` ${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year} ${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedDate;
}
