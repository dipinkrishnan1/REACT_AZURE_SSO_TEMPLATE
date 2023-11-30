import secureAPIGraph from "./secureAPI/secureAPIGraph";

export default async function getProfilecGraph() {
  let responseObj = {};
  responseObj.successFlag = true;
  responseObj.data = [
    { id: "5", label: "Location", value: "NA" },
    { id: "6", label: "Department", value: "NA" },
    { id: "3", label: "Manager", value: "NA" },
    { id: "4", label: "Job Title", value: "NA" },
  ];
  try {
    const response = await secureAPIGraph(
      `${process.env.REACT_APP_GRAPH_PROFILE}`
    );

    const profileObj = response?.data?.positions[0];
    if (profileObj) {
      const manager = profileObj.manager?.displayName
        ? profileObj.manager?.displayName
        : "NA";
      const title = profileObj.detail?.jobTitle
        ? profileObj.detail?.jobTitle
        : "NA";
      const location = profileObj.detail?.company?.officeLocation
        ? profileObj.detail?.company?.officeLocation
        : "NA";
      const department = profileObj.detail?.company?.department
        ? profileObj.detail?.company?.department
        : "NA";

      responseObj.data = [
        { id: "5", label: "Location", value: location },
        { id: "6", label: "Department", value: department },
        { id: "3", label: "Manager", value: manager },
        { id: "4", label: "Job Title", value: title },
      ];
    }
  } catch (err) {}

  return responseObj;
}
