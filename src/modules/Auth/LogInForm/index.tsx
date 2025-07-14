import { useState } from "react";
import { useNavigate } from "react-router";
import { useSignInMutation } from "../../../global/api/auth/auth.api";
import { validateLoginForm } from "../../../shared/validation/login.valid";

export const LogInForm = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [signIn, { isLoading, error }] = useSignInMutation();

  const handleNavReg = () => {
    navigate("/registration");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateLoginForm({
      email: emailValue,
      password: passwordValue,
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

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

      <div className="w-[620px] h-[560px] bg-[#818AA7]/70 rounded-[30px] px-10 py-8 flex flex-col items-center justify-start shadow-lg space-y-6">
        <h2 className="text-[40px] font-bold font-inter text-[#080809]">
          Log in
        </h2>

        <p className="text-[16px] font-inter text-[#2F3485] text-center">
          Enter your email and password to continue
        </p>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="relative w-full mt-4">
            <input
              type="email"
              name="email"
              id="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className={`
                peer w-full border rounded-md px-3 pt-6 pb-2 bg-white 
                text-black placeholder-transparent focus:outline-none 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              `}
              placeholder="Email"
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className={`
                absolute left-3 top-2 text-gray-500 text-sm 
                transition-all bg-white px-1
                peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-500
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500
                ${emailValue ? "top-2 text-sm text-blue-500" : ""}
              `}
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative w-full mt-4">
            <input
              type="password"
              name="password"
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className={`
                peer w-full border rounded-md px-3 pt-6 pb-2 bg-white 
                text-black placeholder-transparent focus:outline-none 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              `}
              placeholder="Password"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className={`
                absolute left-3 top-2 text-gray-500 text-sm 
                transition-all bg-white px-1
                peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-500
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500
                ${passwordValue ? "top-2 text-sm text-blue-500" : ""}
              `}
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
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
