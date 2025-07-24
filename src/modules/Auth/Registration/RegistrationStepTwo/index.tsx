import {  useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectPage } from "../../../../global/store/features/RegistrationPages/RegistrationPagesSlice";
import type { RootState } from "../../../../global/store";
import { userData } from "../../../../global/store/features/RegistrationUser/RegistrationUserSlice";
import { useSignUpMutation } from "../../../../global/api/auth/auth.api";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import { regexNumb, regexSymb, regexUpper } from "../../../../shared/interfaces/regval.interface";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

import { validatePasswordInRegisterForm } from "../../../../shared/validation/register.valid";

import type { Errors } from "../../../../shared/interfaces/regval.interface";

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
    const [passError, setPassError] = useState('')
    

    console.log(userPassword1)

    
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


    const passwordErrors = validatePasswordInRegisterForm({
        password: userPassword1,
    });

    setErrors(passwordErrors)
    if (Object.keys(passwordErrors).length > 0) return;

    

    if(userPassword1 === userPassword2 && userPassword1.length > 8 && userPassword1.match(regexSymb) === null && userPassword1.match(regexNumb) !== null && userPassword1.match(regexUpper) !== null){


        try {
        const result = await signUp({
            email: user.email,
            password: userPassword1,
        }).unwrap();
            console.log("Registered:", result);
            dispatch(userData({email: user.email, password: userPassword1, verificationCode: result.verificationCode , token: "", tokenExpiry: ""}))
            dispatch(selectPage(3))   
        } catch (err) {
            console.error("Failed to register:", err);
        }

    } else {
        if(userPassword1 !== userPassword2){
            setPassError("passwords don't match")
        } else {
            setPassError("Your password is not following the rules >:[")
        }
        
 
    };

    }



    const requirements = [
    {
      label: "Password must be at least 8 characters.",
      isValid: userPassword1.length >= 8,
    },
    {
      label: "Password must exclude !@#$ symbols.",
      isValid: !regexSymb.exec(userPassword1),
    },
    {
      label: "Password must include a number.",
      isValid: regexNumb.exec(userPassword1),
    },
    {
      label: "Password must include at least one upper case character.",
      isValid: regexUpper.exec(userPassword1),
    },
    ];

    return (


        
        <>
           
            {passError && <p className="text-[16px] font-inter text-red-500 text-center mb-2">{passError}</p>}
            <form onSubmit={handleSubmit} className=" w-full h-full flex flex-col justify-evenly  space-y-6">
            
                <div className="flex flex-col">
                    <div className="w-full " id="password_input" >
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
                                password: newErrors.password,
                                }));
                            }}
                            error={submitted && !!errors.password}
                            helperText={submitted ? errors.password : ""}
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
                            error={submitted && !!errors.password}
                            helperText={submitted ? errors.password : ""}
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


                    <div className="flex justify-center">
                            <div className="check pt-5 flex flex-col gap-2 ">
                        
                        {requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center ">
                            {!userPassword1 ? (
                                <>
                                    <GoCircle className="text-[#2F3485] mr-2" />
                                    <p className="text-[16px] font-inter text-[#2F3485] text-center">{req.label}</p>
                                </>
                            ) : (req.isValid ? (
                                <>
                                    <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                                    <p className="text-[16px] font-inter text-green-500 text-center">{req.label}</p>
                                </>
                            ) : (
                                <>
                                    <MdOutlineCancel className="text-red-600 mr-2" />
                                    <p className="text-[16px] font-inter text-red-500 text-center">{req.label}</p>
                                </>
                            ))}
                            </div>
                        ))}

                        </div>
                    </div>
                    

                
                </div>
                    

        
            
        
                <div className="flex justify-center ">
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