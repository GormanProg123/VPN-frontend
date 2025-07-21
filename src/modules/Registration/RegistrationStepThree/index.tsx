import { useState } from 'react';
import * as pinInput from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import { useSelector } from 'react-redux';
import type { RootState } from '../../../global/store';
import { useNavigate } from 'react-router';
import { useVerifyMutation } from '../../../global/api/auth/auth.api';


export const RegistrationStepThree = () => {
  const [code, setCode] = useState<string>();
  const user = useSelector((state:RootState) => state.registrationUser) 
  const [verify, { isLoading }] = useVerifyMutation();
  
  const navigate = useNavigate()

    const service = useMachine(pinInput.machine, {
        id: useId(),
        placeholder:'',
        otp:true,
        type:"numeric",
        blurOnComplete:true,
        mask:false,
        onValueChange(details) {
            setCode(details.valueAsString)
        }, 

    })
    const api = pinInput.connect(service, normalizeProps)
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();




        if(user.verificationCode === code){
            try {
            const result = await verify({
                email: user.email,
                code: user.verificationCode,
            }).unwrap();
                console.log("Verified:", result);
                navigate('/')
            
            } catch (err) {
                console.error("Failed to verify:", err);
            }
        } else {
            alert('Wrong code')
        }

       

    }


    return (
        <>
       
            <form onSubmit={handleSubmit} className=" flex flex-col justify-evenly h-full">
                
     
                     
                  <div className="flex flex-col items-center space-y-4">
                    <div
                        {...api.getRootProps()}
                        className="flex space-x-3"
                    >
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <input
                            key={index}
                            {...api.getInputProps({ index })}
                            className="w-12 h-12 bg-white text-center text-xl border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        ))}
                    </div>
                    
                </div>
  
                    
                <div className="flex justify-center flex-col">
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-[344px] h-[48px] bg-[#080E73] text-white text-[20px] font-bold font-inter rounded-[10px]"
                    >
                    {isLoading ? "Loading..." : "Continue"}
                    </button>
                    <p className="text-[16px] font-inter text-[#2F3485] text-center pt-4">Haven’t obtained the code? <button className="text-blue-700 text-bold cursor-pointer">Sent again</button> </p>
                </div>
            </form>
            
        
          
              
        </>
    )
}