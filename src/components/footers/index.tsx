/** @format */

import "./style.scss";
import footer from "@/assets/footer-bg.svg";
import logo from "@/assets/logo.svg";
import { links } from "@/constant";
export default () => {
  return (
    <div className='footer'>
      <img src={footer} className='img' alt='' />
      <div className='footer-content'>
        <div className='logo-content'>
          <img src={logo} alt='' />
          <h3 className='logo-title'>FilaDoge</h3>
        </div>
        <div className='link'>
          {links.map((item) => {
            return <div key={item.text}>{item.text}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
