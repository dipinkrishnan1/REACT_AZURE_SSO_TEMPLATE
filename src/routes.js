import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";

import UserPage from "./sections/@dashboard/app/AppUserPage";

import Page404 from "./pages/Page404";

import LandDDashBoard from "./pages/LandDDashBoard";
import ComingSoon from "./pages/ComingSoon";
import AccessHub from "./pages/AccessHub";
import { LandingPage } from "./sections/auth/login/LandingPage";
import { RouteGuard } from "./auth/RouteGuard";
import Register from "./pages/Register";

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
        }
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
