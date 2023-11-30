import React from "react";
import {Box, Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./treeselect.css";
import "react-dropdown-tree-select/dist/styles.css";
function TreeSelect({ onSearch }) {
  // const [searchType, setSearchType] = React.useState(1);
  // const [queryString, setqueryString] = React.useState("");
  // const [options, setOptions] = React.useState([]);

  const data = [
    {
      label: "Microsoft",
      children: [
        { label: "AZ-900: Microsoft Azure Fundamentals" },
        { label: "AI-900: Azure AI Fundamentals" },
        { label: "DP-900: Azure Data Fundamentals" },
        { label: "AZ-104: Microsoft Certified: Azure Administrator Associate" },
        { label: "DP-203 Azure Data Engineer Associate" },
        { label: "AZ-204: Microsoft Azure Developer Associate" },
        { label: "AZ-305 Azure Solutions Architect Expert Certification" },
        { label: "AZ-500 Azure Security Engineer Associate" },
        { label: "Microsoft Certified: Azure Developer Associate" },
        { label: "Microsoft 365 Certified: Developer Associate" },
        { label: "Azure Data Factory Service" },
        { label: "API Development, Management & Deployment" },
        {
          label:
            "Microsoft Certified: Dynamics 365: Finance and Operations Apps Developer Associate",
        },
      ],
    },
    {
      label: "IBM",
      children: [
        {
          label:
            "IBM Information Governance Catalog V11.5.x Developing a Governance Catalog",
        },
        {
          label:
            "IBM Information Governance Catalog V11.5.x Governing the Data",
        },
        {
          label:
            "IBM InfoSphere Information Governance Catalog v11.5.0.2: Building the Catalog - Code: KM615G",
        },
        { label: "IBM MDM 11.6 Foundation" },
        { label: "IBM MDM 11.5 Physical Module customization" },
        { label: "IBM MDM 11.5 Virtual Module Architecture & Customizations" },
        { label: "IBM MDM 11.5 Virtual Module PME" },
        { label: "IBM MDM 11.5 Physical Module PME" },
        { label: "IBM MDM 11.5 on Cloud" },
        { label: "IBM MDM 11.5 Physical Module Data Model" },
        {
          label:
            "IBM Certified Developer - Business Automation Workflow V20.0.0.2 using Workflow Center",
        },
        { label: "IBM Certified Technical Advocate - Cloud v3." },
        {
          label: "IBM Certified Associate Architect - Cloud Pak for Data V3.x",
        },
        { label: "IBM Certified Solution Architect - Cloud Pak for Data V2.5" },
        { label: "IBM Certified Administrator - Cloud Pak for Data V3.x" },
        { label: "IBM Certified Developer - Cognos Analytics V11.1.x" },
      ],
    },
    {
      label: "Informatica",
      children: [
        {
          label:
            "Informatica Business 360 (B360) SaaS Developer - Pursit Ready",
        },
        { label: "Informatica MDM C360 SaaS - Delivery Ready" },
        { label: "Informatica Cloud Data Lake & Data Lake Modernization" },
        { label: "Informatica Cloud Data Quality (R41)" },
        { label: "Informatica IICS Administration Fundamentals" },
        { label: "Informatica Power Center" },
      ],
    },
    {
      label: "Others",
      children: [
        {
          label: "101 Examination",
        },
        { label: "Certified Professional in Python Programming" },
        {
          label:
            "Oracle Cloud Platform Digital Assistant 2022 Certified Professional",
        },
        {
          label:
            "Oracle Field Service 2022 Certified Implementation Professional",
        },
      ],
    },
    // Repeat the structure for other top-level nodes...
  ];

  const onChange = (currentNode, selectedNodes) => {
    console.log(selectedNodes);
  };

  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };
  assignObjectPaths(data);

  // const handleChangeSearchType = (event) => {
  //   setSearchType(event.target.value);
  //   setqueryString("");
  // };

  // const handleSearchChange = (event) => {
  //   const query = event.target.value;
  //   setqueryString(query);
  // };

  // const handleSearch = () => {
  //   if (queryString)
  //     onSearch({
  //       type: searchType,
  //       query: queryString,
  //     });
  // };

  return (
    <Box display={"flex"} alignItems={"flex-start"} width={"100%"} >
      <DropdownTreeSelect
        data={data}
        onChange={onChange}
        keepTreeOnSearch
        className="mdl"
        
      />
      <Box variant="contained" component={Button} sx={{ height: "40px", marginTop: "6px" }} >
      <SearchIcon />
      </Box>
      
    </Box>
  );
}

export default TreeSelect;