/** @format */
import Twitter from "@/assets/twitter.svg";

export default () => {
  
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='font-title title'>
          <span>Hello and Follow</span>
        </h3>
      </div>
      <div className='detail'>
        Follow us on Twitter and stay in the loop for more game and fun!
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
