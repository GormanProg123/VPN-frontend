import {  Routes, Route } from "react-router";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { LandingPage } from "../../pages/LandingPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
    )
   
}
