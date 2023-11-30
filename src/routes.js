import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
//
// import BlogPage from './pages/BlogPage';
import UserPage from "./sections/@dashboard/app/AppUserPage";

import Page404 from "./pages/Page404";
// import ProductsPage from './pages/ProductsPage';
import LandDDashBoard from "./pages/LandDDashBoard";
// import OrgDashBoard from "./pages/OrgDashBoard";
import ComingSoon from "./pages/ComingSoon";
import ProfilePage from "./pages/ProfilePage";
import AccessHub from "./pages/AccessHub";

import {
  AddCertification,
  AddTraining,
  EditCertificationsandLicenses,
  EditEducation,
  EditExperience,
  EditOtherSkills,
  EditPrimarySkills,
  EditTraining,
  UpdateEmployee,
} from "./pages/nav1";

import { LandingPage } from "./sections/auth/login/LandingPage";
import { RouteGuard } from "./auth/RouteGuard";
import Register from "./pages/Register";

import { ROUTE } from "./constants";
//
import AddPrimarySkills from "./pages/nav1/AddPrimarySkills";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: (
        <RouteGuard>
          <DashboardLayout />
        </RouteGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/profile" />, index: true },

        { path: "user", element: <UserPage /> },
        { path: "request", element: <ComingSoon title={"Request"} /> },
        { path: "vacancies", element: <ComingSoon title={"Vacancies"} /> },
        {
          path: "orgupdates",
          element: <ComingSoon title={"Organization Updates"} />,
        },
        { path: "hrfaq", element: <ComingSoon title={"HR FAQ"} /> },
        { path: "ldapp", element: <LandDDashBoard /> },
        {
          path: "orgapp",
          element: <ComingSoon title={"Organization Dashboard"} />,
        },
        {
          path: "accesshub",
          element: <AccessHub/>,
        },
        {
          path: "profile",
          children: [
            { element: <ProfilePage />, index: true },
            { path: ROUTE.editPrimary, element: <EditPrimarySkills /> },
            { path: ROUTE.editOtherSkills, element: <EditOtherSkills /> },
            { path: ROUTE.editExperiance, element: <EditExperience /> },
            { path: ROUTE.editEducation, element: <EditEducation /> },
            {
              path: ROUTE.editCertification,
              element: <EditCertificationsandLicenses />,
            },
            { path: ROUTE.editTraining, element: <EditTraining /> },
            { path: ROUTE.addPrimaryskills, element: <AddPrimarySkills /> },
            { path: ROUTE.addTraining, element: <AddTraining /> },
            { path: ROUTE.addCertification, element: <AddCertification /> },
            { path: ROUTE.updateEmployee, element: <UpdateEmployee /> },
          ],
        },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/register",
      element: (
        <RouteGuard>
          <Register />
        </RouteGuard>
      ),
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
