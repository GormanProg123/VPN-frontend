import { Routes, Route } from "react-router";
import { Registration } from "../../modules/Registration";
import { LandingPage } from "../../pages/LandingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};
