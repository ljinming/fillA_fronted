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
        <div className="detail">
          <a className="detail-item" href="https://www.flaticon.com/free-icons/dog-biscuit" title="dog biscuit icons">Dog biscuit icons created by Freepik - Flaticon</a>
          <a className="detail-item" href="https://www.flaticon.com/free-icons/airdrop" title="airdrop icons">Airdrop icons created by Zulfa Mahendra - Flaticon</a>
          <a className="detail-item" href="https://www.flaticon.com/free-icons/mint" title="mint icons">Mint icons created by juicy_fish - Flaticon</a>
          <a className="detail-item" href="https://www.flaticon.com/free-icons/bingo" title="bingo icons">Bingo icons created by Freepik - Flaticon</a>
          <a className="detail-item" href="https://www.flaticon.com/free-icons/referral" title="referral icons">Referral icons created by Flat Icons - Flaticon</a>
        </div>
      </div>
    </div>
  );
};
