// component
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = ({ isAdmin }) => {
  return isAdmin
    ? [
        {
          title: "Common Page ",
          path: "/dashboard/profile",
          icon: icon("ic_profile"),
        },
        {
          title: "Admin Page",
          path: "/dashboard/admin",
          icon: icon("ic_orgdashboard"),
          isAdmin: icon("ic_admin"),
        }
      ]
    : [
        {
          title: "Common Page",
          path: "/dashboard/profile",
          icon: icon("ic_profile"),
        }
        
      ];
};

export default navConfig;
