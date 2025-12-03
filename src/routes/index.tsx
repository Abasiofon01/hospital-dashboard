import { Routes, Route, Navigate } from "react-router-dom";
import HospitalsPage from "../pages/HospitalsPage";
import RouteWrapper from "./RouteWrapper";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/hospitals"
        element={
          <RouteWrapper title="Hospitals">
            <HospitalsPage />
          </RouteWrapper>
        }
      />
      {/* <Route 
        path="/dashboard" 
        element={
          <RouteWrapper title="Dashboard">
          </RouteWrapper>
        } 
      />
      <Route 
        path="/billing" 
        element={
          <RouteWrapper title="Billing">
          </RouteWrapper>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <RouteWrapper title="Profile">
          </RouteWrapper>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <RouteWrapper title="Settings">
          </RouteWrapper>
        } 
      /> */}
      <Route path="/" element={<Navigate to="/hospitals" replace />} />
    </Routes>
  );
};

export default AppRoutes;
