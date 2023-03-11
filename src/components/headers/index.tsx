/** @format */
import logo from "@/assets/logo.svg";
import Wallet from "./Wallet";
import { LogoutIcon } from "@/svgIcons";

import "./style.scss";

export default () => {
  const logout = () => {
    //登出
    localStorage.removeItem("login");
    window.location.reload();
  };
  return (
    <div className='header'>
      <div
        className='header-logo'
        onClick={() => {
          window.location.href = "/";
        }}>
        <img src={logo} className='header_logo' alt='' />
        <span className='header_logo_text'>FilaDoge</span>
      </div>
      <div className='header_right'>
        <Wallet />
        <span className='logout' onClick={logout}>
          {LogoutIcon}
        </span>
      </div>
    </div>
  );
};
