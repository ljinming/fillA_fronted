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
            return (
              <div
                className='link-item'
                key={item.text}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link);
                  }
                }}>
                {item.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
