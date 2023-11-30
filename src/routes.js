import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";

import Page404 from "./pages/Page404";

import ProfilePage from "./pages/CommonPage"; 
import CommonPage2 from "./pages/CommonPage2";
import Admin from "./pages/Admin";

import { LandingPage } from "./sections/auth/login/LandingPage";
import { RouteGuard } from "./auth/RouteGuard";


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
        {
          path: "admin",
          element: <Admin/>,
        },
        {
          path: "commonpage2",
          element: <CommonPage2/>,
        },
        {
          path: "profile",
          children: [
            { element: <ProfilePage />, index: true },
          ],
        },

      ],
    },
 
    {
      path: "/",
      element:     <RouteGuard><LandingPage /></RouteGuard>,
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
