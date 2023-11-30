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
          title: "Request",
          path: "/dashboard/request",
          icon: icon("ic_request"),
        },
        {
          title: "Vacancies",
          path: "/dashboard/vacancies",
          icon: icon("ic_vacancies"),
        },

        {
          title: "HR FAQ",
          path: "/dashboard/hrfaq",
          icon: icon("ic_hr"),
        },
        {
          title: "Org Updates",
          path: "/dashboard/orgupdates",
          icon: icon("ic_orgupdates"),
        },
        {
          title: "L&D Dashboard",
          path: "/dashboard/ldapp",
          icon: icon("ic_analytics"),
          isAdmin: icon("ic_admin"),
        },
        {
          title: "Org Dashboard",
          path: "/dashboard/orgapp",
          icon: icon("ic_orgdashboard"),
          isAdmin: icon("ic_admin"),
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
        },
        {
          title: "Request",
          path: "/dashboard/request",
          icon: icon("ic_request"),
        },
        {
          title: "Vacancies",
          path: "/dashboard/vacancies",
          icon: icon("ic_vacancies"),
        },
        {
          title: "HR FAQ",
          path: "/dashboard/hrfaq",
          icon: icon("ic_hr"),
        },
        {
          title: "Org Updates",
          path: "/dashboard/orgupdates",
          icon: icon("ic_orgupdates"),
        },
      ];
};

export default navConfig;
