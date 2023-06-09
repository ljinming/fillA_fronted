/** @format */
import Logo from "@/assets/logo.svg";
import Twitter from "@/assets/twitter.svg";
import copy from "copy-to-clipboard";
import { MyContext } from "@/pages/content";
import fa from "@glif/filecoin-address";
import ShareLink from 'react-twitter-share-link'

import {  message } from "antd";
import { message_config_success } from '@/constant'
import { useContext } from "react";

enum CoinType {
    MAIN = "f",
    TEST = "t",
}
  
export default () => {
  const context = useContext<any>(MyContext);
  const f4Address = context?.account&&fa.delegatedFromEthAddress(context?.account,CoinType.MAIN).toString();
  const shareUrl = `${window.location.host}/share${
    context?.account ? `/${f4Address}` : ""
  }`;
  const shareTitle =
    `Who's luckier? Win free $FLD tokens through @FilaDoge game and lottery 👇`;
  const url= `&url=${encodeURIComponent(
    shareUrl
  )}`
  const shareTwiter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}${url}&hashtags= $FLD &via= FilaDoge`;

  const copyShareLink = () => {
    copy(shareUrl);
      message.success({
        content: 'Link copied!',
        ...message_config_success
      })
    //  notification.warning({
    //     message: "",
    //     description: 'Link copied!',
    //     duration: 10,
    //     className: "app-notic",
    //   })
  };
  //href={shareTwiter} 
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
          <ShareLink link={shareUrl} text={shareTitle } hashtags={['FID','FilaDoge']}  related={['FilaDoge']}> 
            {(shareUrl: string | undefined) => (
                <a href={shareUrl} className='twitter' target='_blank'>Share Twiter</a>
            )}
          </ShareLink>
        </div>
      </div>
    </div>
  );
};
