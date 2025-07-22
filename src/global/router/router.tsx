import { Routes, Route } from "react-router";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { LandingPage } from "../../pages/LandingPage";
import { LogInPage } from "../../pages/LogInPage";
import { ResetPasswordRouter } from "./ResetPasswordRouter";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/reset-password" element={<ResetPasswordRouter />} />
    </Routes>
  );
};
