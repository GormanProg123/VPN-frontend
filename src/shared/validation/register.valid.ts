import type {
  RegistrationEmailValue,
  RegistrationFormErrors,
  RegistrationPasswordValue
} from "../interfaces/regval.interface";

const reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const validateEmailInRegisterForm = (value: RegistrationEmailValue): RegistrationFormErrors => {
  const errors: RegistrationFormErrors = {};

  if (!value.email.trim()) {
    errors.email = "Email is required";
  } else if(!reg.exec(value.email)){
    errors.email = "Email provided doesn't correct"
  }

  return errors;
};

export const validatePasswordInRegisterForm = (value: RegistrationPasswordValue): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = {}

    if (!value.password.trim()) {
        errors.email = "Email is required";
    }
    if(value.password.length <= 6){
        errors.password = "Password is too short";
    }

    return errors;
}