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
          title: "Profile",
          path: "/dashboard/profile",
          icon: icon("ic_profile"),
        },
        {
          title: "Access Hub",
          path: "/dashboard/accesshub",
          icon: icon("ic_orgdashboard"),
          isAdmin: icon("ic_admin"),
        }
      ]
    : [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: icon("ic_profile"),
        }
        
      ];
};

export default navConfig;
