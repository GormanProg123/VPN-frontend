import { useState } from 'react';
import * as pinInput from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import { useSelector } from 'react-redux';
import type { RootState } from '../../../global/store';
import { useNavigate } from 'react-router';


interface User  {
    email:string,
    code:string,
}

export const RegistrationStepThree = () => {
  const [code, setCode] = useState<string>();
  const user = useSelector((state:RootState) => state.registrationUser) 
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
    
    const verifyAccount = (data:User) => {
       fetch(`http://localhost:3000/registration/verify`, {
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
            })
            .catch((err) => {
                console.error("Registration error:", err);
                alert("Error: " + err);
        });
        
    }



    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user.verificationCode)
        if(user.verificationCode === code){
            console.log('account verified')
            verifyAccount({email:user.email,code:user.verificationCode})
            navigate('/')
        }
        console.log(code)
    }

    return (
        <>
       
            <form onSubmit={onSubmit} className=" pt-5">
                
                
                <div className="flex justify-center ">
                     
                  <div className="flex flex-col items-center space-y-4">
                    <div
                        {...api.getRootProps()}
                        className="flex space-x-3"
                    >
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <input
                            key={index}
                            {...api.getInputProps({ index })}
                            className="w-12 h-12 bg-white text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        ))}
                    </div>
                    
                </div>
                   
                </div>
                    
        
                <div className="flex justify-center pt-5">
                    <button type='submit' className="text-2xl bg-cyan-800 text-white font-bold hover:bg-cyan-900 py-2 px-15 rounded-xl cursor-pointer">Continue</button>  
                </div>
            </form>
            
        
            <p className="text-md text-white text-center pt-5">Haven’t obtained the code? <button className="text-blue-700 text-bold cursor-pointer">Sent again</button> </p>
              
        </>
    )
}