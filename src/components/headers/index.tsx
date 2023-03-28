/** @format */
import logo from "@/assets/logo.svg";
import Dorpwallet from '@/components/dorp-wallet';
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
         <Dorpwallet />
         {/* <Wallet /> 
        <span className='logout' onClick={logout}>
          {LogoutIcon}
        </span> */}
      </div>
    </div>
  );
};
