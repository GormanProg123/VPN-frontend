export interface RegistrationEmailValue  {
    email: string;
}

export interface RegistrationPasswordValue  {
    password: string;
}


export interface RegistrationFormErrors {
    email?: string;
    password?: string;
}

export interface Errors {
    email?:string,
    password?:string
}


export const regexUpper = /[ABCDEFGHIKLMNOPQRSTVXYZ]/g
export const regexSymb = /[!@#$]/g
export const regexNumb = /[0-9]/g