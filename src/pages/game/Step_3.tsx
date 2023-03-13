/** @format */
import Logo from "@/assets/logo.svg";
import Twitter from "@/assets/twitter.svg";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { MyContext } from "@/pages/content";
import { message } from "antd";
import { useContext } from "react";

export default () => {
  const context = useContext<any>(MyContext);
  const shareUrl = `${window.location.href}${
    context?.account ? `/${context?.account}` : ""
  }`;
  const shareTitle =
    "Welcome to @FilaDoge , win free $FLD tokens through game and lottery";
  const shareTwiter = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(
    shareUrl
  )}&via=FilaDoge`;

  const copyShareLink = () => {
    copy(shareUrl);
    message.success("Link copied!");
  };
  return (
    <div className='card step_3'>
      <div className='card-header'>
        <h3 className='font-title title'>
          <span>Share and gain</span>
        </h3>
      </div>
      <div className='detail'>
        <div>
          Share the fun and luck to your crowd with the distinct referral link,
        </div>
        <div>earn 400,000 FLD for each successful referral! </div>
        {/* <img className='img' src={twitter} /> */}
      </div>

      <div className='card-footer'>
        <div className='item'>
          <img className='logo' src={Logo} />
          {/* <span>Link:</span> */}
          {/* <span className='shareurl'>{shareUrl}</span> */}
          <span
            onClick={(e) => {
              e.stopPropagation;
              copyShareLink();
            }}>
            Copy Link
          </span>
          {/* <span className='border-btn btn'> Copy Link</span> */}
        </div>
        <div className='item'>
          <img className='img' src={Twitter} />
          <a href={shareTwiter}>Share Twiter</a>
        </div>
      </div>
    </div>
  );
};
