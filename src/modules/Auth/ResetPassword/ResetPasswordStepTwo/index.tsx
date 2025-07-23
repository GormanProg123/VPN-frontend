import { useState } from "react";
import { useResetMutation } from "../../../../global/api/auth/auth.api";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import {
  regexNumb,
  regexSymb,
  regexUpper,
} from "../../../../shared/interfaces/regval.interface";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

import { validatePasswordInRegisterForm } from "../../../../shared/validation/register.valid";
import type { Errors } from "../../../../shared/interfaces/regval.interface";

export const ResetPasswordStepTwo = ({
  userToken,
  tokenExpiry,
}: {
  userToken: string;
  tokenExpiry: string;
}) => {
  const [userPassword1, setUserPassword1] = useState<string>("");
  const [userPassword2, setUserPassword2] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [changed, setChanged] = useState(false);
  const [resetPassword, { isLoading }] = useResetMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passError, setPassError] = useState<string | boolean>("");

  const expiryTime = Number(tokenExpiry);
  const isLinkExpired =
    !tokenExpiry || isNaN(expiryTime) || expiryTime < Date.now();

  const handleClickShowPassword = (e: number) =>
    e === 1
      ? setShowPassword((show) => !show)
      : setShowPassword2((show) => !show);

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

    if (isLinkExpired) {
      setPassError("Link is expired");
      return;
    }

    const passwordErrors = validatePasswordInRegisterForm({
      password: userPassword1,
    });

    setErrors(passwordErrors);
    if (Object.keys(passwordErrors).length > 0) return;

    if (
      userPassword1 === userPassword2 &&
      userPassword1.length >= 8 &&
      userPassword1.match(regexSymb) === null &&
      userPassword1.match(regexNumb) !== null &&
      userPassword1.match(regexUpper) !== null
    ) {
      try {
        setPassError("");
        const result = await resetPassword({
          token: userToken,
          newPassword: userPassword1,
        }).unwrap();

        console.log("password changed:", result);
        setPassError("");
        setChanged(true);
      } catch (err) {
        console.error("Failed to change password:", err);
        setPassError("Failed to change password. Please try again.");
      }
    } else {
      if (userPassword1 !== userPassword2) {
        setPassError("Passwords don't match");
      } else {
        setPassError("Your password does not follow the rules.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative bg">
      <h3 className="absolute top-3 text-[64px] font-lemon text-center">
        <span className="text-[#060941]">VPN</span>
        <span className="text-black">guine</span>
      </h3>

      <div className="w-[660px] h-[500px] bg-white rounded-[30px] px-10 py-8 flex flex-col items-center justify-start shadow-lg space-y-6 ">
        <div>
          <h2 className="text-[40px] font-bold font-inter text-[#080809] mb-0 ">
            Password Reset
          </h2>
          <p className="text-[16px] font-inter text-[#2F3485] text-center ">
            Enter new password
          </p>
        </div>

        {passError && (
          <p className="text-[16px] font-inter text-red-500 text-center mb-2">
            {passError}
          </p>
        )}
        {changed && (
          <p className="text-[16px] font-inter text-green-500 text-center mb-2 font-bold">
            Password successfully changed!
          </p>
        )}

        {!isLinkExpired ? (
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-evenly space-y-6"
          >
            <div className="flex flex-col">
              <div className="w-full" id="password_input">
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
                      password: value,
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
                              : "show the password"
                          }
                          onClick={() => handleClickShowPassword(1)}
                          onMouseDown={handleMouseDownPassword}
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
                    "& .MuiInputBase-input": {
                      paddingBottom: "12px",
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

              <div className="w-full mt-4" id="password_input">
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
                    // нет смысла валидировать тут email, убрал
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
                              : "show the password"
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
                    "& .MuiInputBase-input": {
                      paddingBottom: "12px",
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

              <div className="check pt-5">
                <div className="flex items-center justify-center">
                  {!userPassword1 && (
                    <>
                      <GoCircle className="mr-2" />
                      <p className="text-[16px] font-inter text-[#2F3485] text-center ">
                        Password must be at least 8 characters.
                      </p>
                    </>
                  )}
                  {userPassword1 &&
                    (userPassword1.length < 8 ? (
                      <>
                        <MdOutlineCancel className="text-red-600 mr-2" />
                        <p className="text-[16px] font-inter text-red-500 text-center ">
                          Password must be at least 8 characters.
                        </p>
                      </>
                    ) : (
                      <>
                        <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                        <p className="text-[16px] font-inter text-green-500 text-center ">
                          Password must be at least 8 characters.
                        </p>
                      </>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                  {!userPassword1 && (
                    <>
                      <GoCircle className="mr-2" />
                      <p className="text-[16px] font-inter text-[#2F3485] text-center ">
                        Password must exclude !@#$ symbols.
                      </p>
                    </>
                  )}
                  {userPassword1 &&
                    (userPassword1.match(regexSymb) ? (
                      <>
                        <MdOutlineCancel className="text-red-600 mr-2" />
                        <p className="text-[16px] font-inter text-red-500 text-center ">
                          Password must exclude !@#$ symbols.
                        </p>
                      </>
                    ) : (
                      <>
                        <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                        <p className="text-[16px] font-inter text-green-500 text-center ">
                          Password must exclude !@#$ symbols.
                        </p>
                      </>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                  {!userPassword1 && (
                    <>
                      <GoCircle className="mr-2" />
                      <p className="text-[16px] font-inter text-[#2F3485] text-center ">
                        Password must include number.
                      </p>
                    </>
                  )}
                  {userPassword1 &&
                    (userPassword1.match(regexNumb) ? (
                      <>
                        <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                        <p className="text-[16px] font-inter text-green-500 text-center ">
                          Password must include number.
                        </p>
                      </>
                    ) : (
                      <>
                        <MdOutlineCancel className="text-red-600 mr-2" />
                        <p className="text-[16px] font-inter text-red-500 text-center ">
                          Password must include number.
                        </p>
                      </>
                    ))}
                </div>
                <div className="flex items-center justify-center">
                  {!userPassword1 && (
                    <>
                      <GoCircle className="mr-2" />
                      <p className="text-[16px] font-inter text-[#2F3485] text-center ">
                        Password must include uppercase letter.
                      </p>
                    </>
                  )}
                  {userPassword1 &&
                    (userPassword1.match(regexUpper) ? (
                      <>
                        <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                        <p className="text-[16px] font-inter text-green-500 text-center ">
                          Password must include uppercase letter.
                        </p>
                      </>
                    ) : (
                      <>
                        <MdOutlineCancel className="text-red-600 mr-2" />
                        <p className="text-[16px] font-inter text-red-500 text-center ">
                          Password must include uppercase letter.
                        </p>
                      </>
                    ))}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-[400px] py-3 bg-[#2F3485] text-white font-semibold rounded-lg"
                disabled={isLoading}
              >
                Reset Password
              </button>
            </div>
          </form>
        ) : (
          <p className="text-[32px] font-inter text-red-500 text-center font-bold">
            Link is expired
          </p>
        )}
      </div>
    </div>
  );
};
