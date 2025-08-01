
import { useDispatch } from "react-redux";
import { selectPage } from "../../../../global/store/features/RegistrationPages/RegistrationPagesSlice";
import { userData } from "../../../../global/store/features/RegistrationUser/RegistrationUserSlice";
import { useState } from "react";

import { validateEmailInRegisterForm } from "../../../../shared/validation/register.valid";

import TextField from "@mui/material/TextField";

interface Errors {
    email?:string,
    password?:string
}

export const RegistrationStepOne = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    
        const formErrors = validateEmailInRegisterForm({
          email: emailValue,
        });
    

  
        setErrors(formErrors)

        if (Object.keys(formErrors).length > 0) return;
        
        dispatch(userData({email: emailValue, password: '', verificationCode: "", token: "", tokenExpiry: ""}))
        dispatch(selectPage(2))
      };

   

    return (
        <>



            <form  className=" w-full h-full flex flex-col justify-center space-y-6 mb-0">
          
              <div className="w-full ">
                <TextField
                    
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={emailValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmailValue(value);
                    const newErrors = validateEmailInRegisterForm({
                      email: value,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      email: newErrors.email,
                    }));
                  }}
                  error={submitted && !!errors.email}
                  helperText={submitted ? errors.email : ""}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "2px 8px 10px rgba(0, 0, 0, 0.15)",
                    "& label": {
                      color: "#6b7280",
                    },
                    "& .MuiInputBase-input":{
                        paddingBottom: "12px"
                    },
                    "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                      "& fieldset": {
                        borderColor: "#d1d5db",
                      },
                      "&:hover fieldset": {
                        borderColor: "#3b82f6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3b82f6",
                      },
                    },
                  }}
                />
              </div>
            
                      
            </form>
              <div className="flex flex-col justify-center pb-3">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-[344px] h-[48px] bg-[#080E73] text-white text-[20px] font-bold font-inter rounded-[10px]"
                >
                  Continue
                </button>
                
                <p className="text-[16px] font-inter text-[#2F3485] text-center pt-2 ">Have account? <a className="text-blue-700 font-bold" href="http://localhost:5173/login">Log in</a> </p>
              </div>
        </>
    )
}