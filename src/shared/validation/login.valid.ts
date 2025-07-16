import type {
  LoginFormValues,
  LoginFormErrors,
} from "../interfaces/logval.interface";

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};
