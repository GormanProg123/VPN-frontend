import { useState } from "react";
import { useNavigate } from "react-router";
import { useSignInMutation } from "../../../global/api/auth/auth.api";
import { validateLoginForm } from "../../../shared/validation/login.valid";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const LogInForm = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const handleNavReg = () => {
    navigate("/registration");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formErrors = validateLoginForm({
      email: emailValue,
      password: passwordValue,
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      const result = await signIn({
        email: emailValue,
        password: passwordValue,
      }).unwrap();
      console.log("Logged in:", result);
      navigate("/");
    } catch (err) {
      console.error("Failed to log in:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <h3 className="absolute top-10 text-[64px] font-lemon text-center">
        <span className="text-[#060941]">VPN</span>
        <span className="text-black">guine</span>
      </h3>

      <div className="w-[620px] h-[560px] bg-white rounded-[30px] px-10 py-8 flex flex-col items-center justify-start shadow-lg space-y-6">
        <h2 className="text-[40px] font-bold font-inter text-[#080809]">
          Log in
        </h2>

        <p className="text-[16px] font-inter text-[#2F3485] text-center">
          Enter your email and password to continue
        </p>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={emailValue}
              onChange={(e) => {
                const value = e.target.value;
                setEmailValue(value);
                const newErrors = validateLoginForm({
                  email: value,
                  password: passwordValue,
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
                borderRadius: "6px",
                "& label": {
                  color: "#6b7280",
                },
                "& .MuiOutlinedInput-root": {
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

          <div className="w-full mt-4">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={passwordValue}
              onChange={(e) => {
                const value = e.target.value;
                setPasswordValue(value);
                const newErrors = validateLoginForm({
                  email: emailValue,
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
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
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
                borderRadius: "6px",
                "& label": {
                  color: "#6b7280",
                },
                "& .MuiOutlinedInput-root": {
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-[344px] h-[48px] bg-[#080E73] text-white text-[20px] font-bold font-inter rounded-[10px]"
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-600 text-center">
            Failed to log in. Please check your credentials.
          </div>
        )}

        <div className="text-center text-[15px] font-inter space-y-2">
          <div className="text-black">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-[#101AC3] font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleNavReg();
              }}
            >
              Sign up
            </a>
          </div>
          <div className="text-[#101AC3] font-bold">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};
