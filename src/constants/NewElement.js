export const CERTIFICATION = {
  title: `New Certification`,
  newFlag: true,
  list: [
    {
      id: "1",
      label: "Certification Name",
      value: {
        id: 0,
        name: "",
      },
      type: "auto_select",
      codeTable: [],
      codeTableName: process.env.REACT_APP_CODE_TABLE_CERTIFICATIONS,
      required: true,
    },
  ],
};

export const PRIMARY_SKILLS = {
  title: `New Primary Skill`,
  newFlag: true,
  list: [
    {
      id: "1",
      label: "Skill Name",
      type: "auto_select",
      codeTable: [],
      codeTableName: process.env.REACT_APP_CODE_TABLE_SKILLS,
      required: true,
    },
    {
      id: "2",
      label: "Proficiency",
      value: "",
      type: "select",
      codeTable: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    {
      id: "3",
      label: "Total Experience",
      type: "auto_select",
      value: null,
      codeTable: [],
      codeTableName: "H_NUMBER",
      required: true,
    },
    // { id: "7", label: "Total Experience", value: 0, type: "number" },
  ],
};

export const TRAINING = {
  title: `New Training`,
  newFlag: true,
  list: [
    {
      id: "",
      label: "Training Name",
      value: {
        id: null,
        name: null,
      },
      type: "auto_select",
      codeTable: [],
      codeTableName: process.env.REACT_APP_CODE_TABLE_TRAININGS,
      required: true,
    },
  ],
};
