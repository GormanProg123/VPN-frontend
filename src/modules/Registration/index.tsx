
import { useSelector } from "react-redux"
import type { RootState } from "../../global/store"
import { RegistrationStepOne } from "./RegistrationStepOne"
import { RegistrationStepTwo } from "./RegistrationStepTwo"
import { RegistrationStepThree } from "./RegistrationStepThree"

export const Registration = () => {
    const currentPage = useSelector((state:RootState) => state.registrationPages.value)
    
    return (
        <>
          <div className="registration flex w-full">
                <div className="input-side bg-[var(--form-background)]  p-10 w-1/3  h-screen">
                    
                    <h2 className="text-5xl flex justify-center font-bold font">
                        VPNguine
                    </h2>

                    <div className="text-center pt-15">
                        <h3 className="text-3xl text-white font-medium">Create an account  </h3>
                        
                        {currentPage === 1 &&  <p className="text-md text-white">Enter your email to continue</p>}
                        {currentPage === 2 &&  <p className="text-md text-white">Create a password for your account</p>}
                        {currentPage === 3 &&  <p className="text-md text-white">Enter the code that we sent you on email</p>}

                    </div>

                    
                    {currentPage === 1 && <RegistrationStepOne />}
                    {currentPage === 2 && <RegistrationStepTwo />}
                    {currentPage === 3 && <RegistrationStepThree />}

                   
                </div>
                <div className="logo-side w-2/3">

                </div>
            </div>
        </>
    )
}