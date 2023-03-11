/** @format */
import { Button } from "antd";
// import twitter from "twitter-auto-follower";
import twitter from "@/assets/twitter_bg.png";
import Twitter from "@/assets/twitter.svg";

export default () => {
  //   const handleCilck = () => {
  //     setInterval(function () {
  //       window.scrollTo(0, document.body.scrollHeight);
  //       const item: HTMLDivElement | any = document.getElementsByClassName(
  //         ".not-following .user-actions-follow-button.js-follow-btn"
  //       )[0];
  //       console.log("===334", item);
  //       if (item) {
  //         item?.click();
  //       }
  //     }, 1000);
  //   };
  //https://twitter.com/intent/follow?screen_name=jinmingliu17
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='font-title title'>
          <span>Hello and Follow</span>
        </h3>
      </div>
      <div className='detail'>
        Follow us on Twitter and stay in the loop for more game and fun!
        {/* <img className='img' src={twitter} /> */}
      </div>

      <div
        className='card-footer'
        onClick={() => {
          window?.open(
            `https://twitter.com/intent/follow?screen_name=filadoge`
          );
        }}>
        <img className='icon' src={Twitter} alt='' />
        <a
          target='_blank'
          href='https://twitter.com/intent/follow?screen_name=filadoge'>
          Follow @filadoge
        </a>
      </div>
    </div>
  );
};
