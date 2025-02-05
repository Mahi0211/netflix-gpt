import React from "react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="absolute px-[148px] py-6 bg-gradient-to-b from-black z-10">
      <img src={Logo} alt="Logo" className="w-52" />
    </div>
  );
};

export default Header;
