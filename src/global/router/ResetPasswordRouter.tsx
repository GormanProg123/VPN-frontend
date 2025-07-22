import { useLocation } from "react-router";
import { ResetPasswordStepOne } from "../../modules/Auth/ResetPassword/ResetPasswordStepOne"
import { ResetPasswordStepTwo } from "../../modules/Auth/ResetPassword/ResetPasswordStepTwo"

export const ResetPasswordRouter = () => {
    const location = useLocation()
    const searchBar = new URLSearchParams(location.search)
    const token = searchBar.get("token")
    const expiry = searchBar.get("expiry")

    return (
        <>
            {
                token ? 
                <ResetPasswordStepTwo userToken={token} tokenExpiry={expiry || ""} /> 
                :
                <ResetPasswordStepOne/> 
            }
        
        </>
    )
} 