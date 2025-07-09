import { useState } from "react"
import { PinInput } from '@ark-ui/react/pin-input'



export const Registration = () => {
    const [registrationStep, setRegistrationStep] = useState<number>(1);
    let code:number[] = [];
    const onSubmit = () => {
        if(registrationStep < 3){ 
            setRegistrationStep(registrationStep+1);
        }

        if(registrationStep === 3) {
            console.log(code)
        }
    }

    const handleCodeChange = (e:any,id:any) => {
        console.log('proivet')
        console.log( e.target.value)
        code[id] = e.target.value;

        
    }
    
    return (
        <>
            <div className="registration flex w-full">
                <div className="input-side bg-[var(--form-background)]  p-10 w-1/3  h-screen">
                    
                    <h2 className="text-5xl flex justify-center font-bold">
                        VPNguine
                    </h2>

                    <div className="text-center pt-15">
                        <h3 className="text-3xl text-white font-medium">Create an account  </h3>
                        
                        {registrationStep === 1 &&  <p className="text-md text-white">Enter your email to continue</p>}
                        {registrationStep === 2 &&  <p className="text-md text-white">Create a password for your account</p>}
                        {registrationStep === 3 &&  <p className="text-md text-white">Enter the code that we sent you on email</p>}

                    </div>

                    <form action={onSubmit} className=" pt-5">
                        {
                            registrationStep === 1 &&
                            <>
                                <div className="flex flex-col ">
                                    <label htmlFor="email_input" className="text-white">Email</label>
                                    <input id="email_input" type="email" name="email_input" className="bg-white rounded-lg hover:border py-2 px-2"  required/>
                                </div>
                            </> 
                        }
                        {
                            registrationStep === 2 &&
                            <>
                                <div className="flex flex-col ">
                                    <label htmlFor="password_input" className="text-white">Password</label>
                                    <input id="password_input" type="password" className="bg-white rounded-lg hover:border py-2 px-2"  required/>

                                    <label htmlFor="confirm_password_input" className="text-white pt-2">Confirm password</label>
                                    <input id="confirm_password_input" type="password" className="bg-white rounded-lg hover:border py-2 px-2"  required/>
                                </div>
                            </> 
                        }
                        {
                            registrationStep === 3 &&
                            <>
                                <div className="flex justify-center ">
                                <PinInput.Root otp blurOnComplete required>
                                    <PinInput.Label className="mb-2 block text-sm text-white font-medium">
                                        Enter code
                                    </PinInput.Label>

                                    <PinInput.Control className="flex gap-2" >
                                        {[0, 1, 2, 3, 4, 5].map((id) => (
                                        <PinInput.Input
                                            key={id}
                                            index={id}
                                            placeholder=""
                                            onChange={(e) => handleCodeChange(e,id)}
                                            className="
                                            w-12 h-12
                                            border border-gray-300
                                            rounded
                                            text-center
                                            text-xl
                                            focus:outline-none
                                            "
                                        />
                                        ))}
                                    </PinInput.Control>

                                    <PinInput.HiddenInput />
                                </PinInput.Root>
                                </div>
                            </> 
                        }
                
                        <div className="flex justify-center pt-5">
                            <button className="text-2xl bg-cyan-800 text-white font-bold hover:bg-cyan-900 py-2 px-15 rounded-xl cursor-pointer">Continue</button>  
                        </div>
                    </form>
                    
              
                    {registrationStep === 3 &&  <p className="text-md text-white text-center pt-5">Haven’t obtained the code? <button className="text-blue-700 text-bold cursor-pointer">Sent again</button> </p>}

                   
                </div>
                <div className="logo-side w-2/3">

                </div>
            </div>
        </>
    )
}