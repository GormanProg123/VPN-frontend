import { userData } from "../../../../global/store/features/RegistrationUser/RegistrationUserSlice";
import { useState } from "react";

import { validateEmailInRegisterForm } from "../../../../shared/validation/register.valid";

import TextField from "@mui/material/TextField";
import { useRequestMutation } from "../../../../global/api/auth/auth.api";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../global/store";

interface Errors {
  email?: string;
  password?: string;
}

export const ResetPasswordStepOne = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [requestPasswordReset, { isLoading }] = useRequestMutation();
  const [message, setMessage] = useState(false);
  const user = useSelector((state: RootState) => state.registrationUser);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formErrors = validateEmailInRegisterForm({
      email: emailValue,
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      const result = await requestPasswordReset({
        email: emailValue,
        frontendUrl: window.location.origin,
      }).unwrap();
      console.log("link sent:", result);
      dispatch(
        userData({
          email: emailValue,
          password: user.password,
          verificationCode: user.verificationCode,
          token: result.token,
          tokenExpiry: result.tokenExpiry,
        })
      );
      setMessage(true);
    } catch (err) {
      console.error("Failed to send link:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 relative bg">
        <h3 className="absolute top-3 text-[64px] font-lemon text-center">
          <span className="text-[#060941]">VPN</span>
          <span className="text-black">guine</span>
        </h3>

        <div className="w-[660px] h-[400px] bg-white rounded-[30px] px-10 py-8 flex flex-col items-center justify-start shadow-lg shadow-lg space-y-6 ">
          <div>
            <h2 className="text-[40px] font-bold font-inter text-[#080809] mb-0 ">
              Password Reset
            </h2>
          </div>

          {message && (
            <p className="text-[16px] font-inter text-[#2F3485] text-center ">
              Email has been sent to your email address with instructions on how
              to reset your password.
            </p>
          )}
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
               {isLoading ? "Loading..." : "Continue"} 
              </button>
              
              <p className="text-[16px] font-inter text-[#2F3485] text-center pt-2 ">Have account? <a className="text-blue-700 font-bold" href="http://localhost:5173/login">Log in</a> </p>
            </div>
        </div>
      </div>
    </>
  );
};
