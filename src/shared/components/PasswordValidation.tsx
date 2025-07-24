import { regexNumb, regexSymb, regexUpper } from "../interfaces/regval.interface";
import { GoCircle } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

export const PasswordValidation = ({password}:{password:string}) => {

    const requirements = [
    {
        label: "Password must be at least 8 characters.",
        isValid: password.length >= 8,
    },
    {
        label: "Password must exclude !@#$ symbols.",
        isValid: !regexSymb.exec(password),
    },
    {
        label: "Password must include a number.",
        isValid: regexNumb.exec(password),
    },
    {
        label: "Password must include at least one upper case character.",
        isValid: regexUpper.exec(password),
    },
    ];
    return (
        <>
            <div className="flex justify-center">
                        <div className="check pt-5 flex flex-col gap-2 ">
                    
                    {requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center ">
                        {!password ? (
                            <>
                                <GoCircle className="text-[#2F3485] mr-2" />
                                <p className="text-[16px] font-inter text-[#2F3485] text-center">{req.label}</p>
                            </>
                        ) : (req.isValid ? (
                            <>
                                <IoMdCheckmarkCircleOutline className="text-green-600 mr-2" />
                                <p className="text-[16px] font-inter text-green-500 text-center">{req.label}</p>
                            </>
                        ) : (
                            <>
                                <MdOutlineCancel className="text-red-600 mr-2" />
                                <p className="text-[16px] font-inter text-red-500 text-center">{req.label}</p>
                            </>
                        ))}
                        </div>
                    ))}

                    </div>
            </div>
        </>
    )
}