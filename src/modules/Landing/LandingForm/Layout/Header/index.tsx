import pinLogo from "../../../../../shared/assets/Logo.svg";

export const Header = () => {
  return (
    <header className="w-full h-[125px] bg-[#5863AF] flex items-center justify-between px-8">
      <div className="flex items-center space-x-4">
        <img
          src={pinLogo}
          alt="Logo"
          className="w-[177.88px] h-[99.96px] object-contain"
        />
        <h3 className="text-[40px] font-lemon">
          <span className="text-[#080E73]">VPN</span>
          <span className="text-[#D9D9D9]">guine</span>
        </h3>
      </div>
      <div className="flex items-center space-x-[23px]">
        <a href="#" className="text-white font-bold text-[24px]">
          Download
        </a>
        <a href="#" className="text-white font-bold text-[24px]">
          FAQ
        </a>
        <a href="#" className="text-white font-bold text-[24px]">
          Support
        </a>

        <button className="ml-[27px] w-[137px] h-[59px] bg-[#2F3485] text-white rounded-[30px] font-semibold text-[24px]">
          Log In
        </button>
      </div>
    </header>
  );
};
