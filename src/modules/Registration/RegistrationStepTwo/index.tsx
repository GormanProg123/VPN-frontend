import {  useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectPage } from "../../../global/store/features/RegistrationPages/RegistrationPagesSlice";
import type { RootState } from "../../../global/store";
import { userData } from "../../../global/store/features/RegistrationUser/RegistrationUserSlice";
import { useSignUpMutation } from "../../../global/api/auth/auth.api";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

import { validatePasswordInRegisterForm } from "../../../shared/validation/register.valid";

interface Errors {
    email?:string,
    password?:string
}

export const RegistrationStepTwo = () => {
    const [userPassword1,setUserPassword1] = useState<string>('') 
    const [userPassword2,setUserPassword2] = useState<string>('') 
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);
    const [signUp, { isLoading, }] = useSignUpMutation();

    const user = useSelector((state:RootState) => state.registrationUser)
    const dispatch = useDispatch(); 

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword = (e:number) => e == 1 ? setShowPassword((show) => !show) : setShowPassword2((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
        
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if(userPassword1 === userPassword2){

        const passwordErrors = validatePasswordInRegisterForm({
            password: userPassword1,
        });

        if(Object.keys(passwordErrors).length > 0){
            alert(passwordErrors.password)
        }
        
        if (Object.keys(passwordErrors).length > 0) return;

        try {
        const result = await signUp({
            email: user.email,
            password: userPassword1,
        }).unwrap();
            console.log("Registered:", result);
            dispatch(userData({email:user.email,password:userPassword1,verificationCode:result.verificationCode}))
            dispatch(selectPage(3))   
        } catch (err) {
            console.error("Failed to register:", err);
        }

    } else {
        alert("passwords don't match")   
        
    }

 
  };

    return (


        
        <>
        
            <form onSubmit={handleSubmit} className=" w-full space-y-6">
            
                    <div className="w-full mt-4" id="password_input" >
                        <TextField
                            
                            id="password1"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={userPassword1}
                            onChange={(e) => {
                                const value = e.target.value;
                                setUserPassword1(value);
                                const newErrors = validatePasswordInRegisterForm({
                                    password:userPassword1 
                                });
                                setErrors((prev) => ({
                                ...prev,
                                email: newErrors.email,
                                }));
                            }}
                            error={submitted && !!errors.email}
                            helperText={submitted ? errors.email : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                        showPassword
                                            ? "hide the password"
                                            : "display the password"
                                        }
                                        onClick={() => handleClickShowPassword(1)}
                                        onMouseDown={ handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                            sx={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            boxShadow: "2px 8px 10px rgba(0, 0, 0, 0.15)",
                            "& label": {
                                color: "#6b7280",
                            },
                            "& .MuiInputBase-input":{
                                // paddingTop: "10px",
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

                    <div className="w-full mt-4" id="password_input" >
                        <TextField
                            
                            id="password2"
                            label="Retype password"
                            variant="outlined"
                            type={showPassword2 ? "text" : "password"}
                            fullWidth
                            value={userPassword2}
                          onChange={(e) => {
                            const value = e.target.value;
                            setUserPassword2(value);
                            const newErrors = validatePasswordInRegisterForm({
                              password:userPassword2 
                            });
                            setErrors((prev) => ({
                              ...prev,
                              email: newErrors.email,
                            }));
                          }}
                            error={submitted && !!errors.email}
                            helperText={submitted ? errors.email : ""}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                    showPassword2
                                        ? "hide the password"
                                        : "display the password"
                                    }
                                    onClick={() => handleClickShowPassword(2)}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                            ),
                            }}
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

        
            
        
              <div className="flex justify-center pt-5">
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-[344px] h-[48px] bg-[#080E73] text-white text-[20px] font-bold font-inter rounded-[10px]"
                            >
                              {isLoading ? "Loading..." : "Continue"}
                            </button>
                </div>
            </form>
            
        </>
    )
}