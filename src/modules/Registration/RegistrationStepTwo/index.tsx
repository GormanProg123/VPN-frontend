import {  useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectPage } from "../../../global/store/features/RegistrationPages/RegistrationPagesSlice";
import type { RootState } from "../../../global/store";
import { userData } from "../../../global/store/features/RegistrationUser/RegistrationUserSlice";

interface User{
    email:string,
    password:string
}

export const RegistrationStepTwo = () => {
    const [userPassword1,setUserPassword1] = useState<string>('') 
    const [userPassword2,setUserPassword2] = useState<string>('') 
    const user = useSelector((state:RootState) => state.registrationUser)
    const dispatch = useDispatch(); 

    const registerAccount = (data:User) => {
       fetch(`http://localhost:3000/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            .then(async (res) => {
                if (!res.ok) {
                const error = await res.json();
                throw new Error(error.detail || "Registration failed");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Registration successful:",data);
                dispatch(userData({email:user.email,password:userPassword1,verificationCode:data.verificationCode}))
            })
            .catch((err) => {
                console.error("Registration error:", err);
                alert("Error: " + err);
            });


        // fetch(`http://localhost:3000/registration/${user.email}`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        //     }).then((data) => {
        //         console.log(data.verificationCode)
        //         // dispatch(userData({email:user.email,password:userPassword1,verificationCode:}))
        //     })
        };

        

    const onSubmit = () => {
        if(userPassword1 === userPassword2){
            dispatch(userData({email:user.email,password:userPassword1,verificationCode:""}))
            registerAccount({email:user.email,password:userPassword1})
            dispatch(selectPage(3))    

        } else {
            alert("passwords don't match")   
            
        }
    }

    return (
        <>
        
            <form action={onSubmit} className=" pt-5">
                
                <div className="flex flex-col ">
                    <label htmlFor="password_input" className="text-white">Password</label>
                    <input onChange={(e) => setUserPassword1(e.target.value)} value={userPassword1}  id="password_input" type="password" className="bg-white rounded-lg hover:border py-2 px-2"  required/>

                    <label htmlFor="confirm_password_input" className="text-white pt-2">Confirm password</label>
                    <input onChange={(e) => setUserPassword2(e.target.value)} value={userPassword2} id="confirm_password_input" type="password" className="bg-white rounded-lg hover:border py-2 px-2"  required/>
                </div>
        
            
        
                <div className="flex justify-center pt-5">
                    <button className="text-2xl bg-cyan-800 text-white font-bold hover:bg-cyan-900 py-2 px-15 rounded-xl cursor-pointer">Continue</button>  
                </div>
            </form>
            
        </>
    )
}