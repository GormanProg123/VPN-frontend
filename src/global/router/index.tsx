import {  Routes, Route } from "react-router";
import { Registration } from "../../pages/Registration";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/registration" element={<Registration />} />
        </Routes>
    )
   
}
