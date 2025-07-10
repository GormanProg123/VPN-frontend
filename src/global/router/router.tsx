import { Routes, Route } from "react-router";
import { Registration } from "../../pages/Registration";
import { LandingPage } from "../../pages/LandingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};
