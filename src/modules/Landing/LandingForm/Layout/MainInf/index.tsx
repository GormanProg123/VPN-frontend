import pinLogo from "../../../../../shared/assets/Logo.svg";
import WorldImg from "../../../../../shared/assets/World.png";
import { useNavigate } from "react-router";

export const MainInf = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/registration");
  };

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center relative flex items-center justify-center px-6 md:px-12 lg:px-16"
      style={{ backgroundImage: `url(${WorldImg})` }}
    >
      <div className="absolute inset-0 bg-white opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1600px] gap-12">
        <div className="flex flex-col justify-start max-w-[800px] w-full">
          <h3 className="text-[#060941] text-[40px] md:text-[48px] lg:text-[64px] font-inter font-bold leading-tight mb-[78px]">
            Stay Hidden, Stay Safe – <br />
            VPNguine!
          </h3>

          <div className="bg-[#6F72AC] text-white text-[24px] md:text-[30px] lg:text-[36px] font-inter w-full max-w-[789.73px] h-auto py-10 px-8 rounded-lg mb-[78px]">
            <h3 className="leading-snug">
              We provide safest option
              <br /> to surf the internet without any trouble.
              <br />
              If there’s any?
              <br /> Don’t worry, we’ll take some action.
            </h3>
          </div>

          <button
            className="w-full max-w-[590px] h-[103px] bg-[#080E73] hover:bg-[#0F178F] transition-colors duration-300 text-white text-[28px] md:text-[34px] lg:text-[40px] font-inter font-semibold rounded-full"
            onClick={handleNavigate}
          >
            Start exploring now
          </button>
        </div>

        <div className="flex-shrink-0">
          <img
            src={pinLogo}
            alt="Logo"
            className="w-[300px] md:w-[400px] lg:w-[500px] h-auto rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
