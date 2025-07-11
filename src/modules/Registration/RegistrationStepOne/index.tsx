
import { useDispatch } from "react-redux";
import { selectPage } from "../../../global/store/features/RegistrationPages/RegistrationPagesSlice";
import { userData } from "../../../global/store/features/RegistrationUser/RegistrationUserSlice";
import { useState } from "react";


export const RegistrationStepOne = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const dispatch = useDispatch();
    const onSubmit = () => {
        dispatch(userData({email:userEmail,password:'',verificationCode:""}))
        dispatch(selectPage(2))
        
    }

    return (
        <>

            <form action={onSubmit} className=" pt-5">
            
                <div className="flex flex-col w-120 mx-auto">
                    <label htmlFor="email_input" className="text-white">Email</label>
                    <input id="email_input" type="email" name="email_input" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} className="bg-white rounded-lg hover:border py-1 px-2"  required/>
                </div>

        
                <div className="flex justify-center pt-5">
                    <button className="text-2xl bg-cyan-800 text-white font-bold hover:bg-cyan-900 py-2 px-20 rounded-xl cursor-pointer">Continue</button>  
                </div>
            </form>
           
        </>
    )
}