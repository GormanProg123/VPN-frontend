
import { useSelector } from "react-redux"
import type { RootState } from "../../global/store"
import { RegistrationStepOne } from "./RegistrationStepOne"
import { RegistrationStepTwo } from "./RegistrationStepTwo"
import { RegistrationStepThree } from "./RegistrationStepThree"

export const Registration = () => {
    const currentPage = useSelector((state:RootState) => state.registrationPages.value)
    
    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative bg">
            <h3 className="absolute top-10 text-[64px] font-lemon text-center">
                <span className="text-[#060941]">VPN</span>
                <span className="text-black">guine</span>
            </h3>

    

            <div className="w-[620px] h-[460px] bg-white rounded-[30px] px-10 py-8 flex flex-col items-center justify-start shadow-lg shadow-lg space-y-6 ">
                <div>
                <h2 className="text-[40px] font-bold font-inter text-[#080809] mb-0 ">
                    Create an account
                </h2>

                {currentPage === 1 &&  <p className="text-[16px] font-inter text-[#2F3485] text-center ">enter your email to continue</p>}
                {currentPage === 2 &&  <p className="text-[16px] font-inter text-[#2F3485] text-center ">create a password for your account</p>}
                {currentPage === 3 &&  <p className="text-[16px] font-inter text-[#2F3485] text-center ">enter the code that we sent you on email</p>}
        
                </div>
                
            
                
                {currentPage === 1 && <RegistrationStepOne />}
                {currentPage === 2 && <RegistrationStepTwo />}
                {currentPage === 3 && <RegistrationStepThree />}

            </div>
        </div>
        </>
    )
}