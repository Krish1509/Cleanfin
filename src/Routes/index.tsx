import React from "react";
import { Route, Routes } from "react-router-dom";
import { nonAuthRoutes, routes } from "./allRoutes";
import Layout from "../Layout";
import NonLayout from "../Layout/NonLayout";
import LandingPage from "../pages/Pages/LandingPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoutes from "./PublicRoutes";

const Routing = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {(routes || []).map((item, key) => (
          <Route
            key={key}
            path={item.path}
            element={
              <PrivateRoute>
                <Layout>{item.component}</Layout>
              </PrivateRoute>
            }
          />
        ))}

        {(nonAuthRoutes || []).map((item, key) => (
          <Route
            key={key}
            path={item.path}
            element={
              <PublicRoutes>
                <NonLayout>{item.component}</NonLayout>
              </PublicRoutes>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default Routing;
