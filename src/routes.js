import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";

import Page404 from "./pages/Page404";

import ProfilePage from "./pages/ProfilePage";
import AccessHub from "./pages/AccessHub";

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
          path: "accesshub",
          element: <AccessHub/>,
        },
        {
          path: "profile",
          children: [
            { element: <ProfilePage />, index: true },
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
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
