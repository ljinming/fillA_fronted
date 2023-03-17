/** @format */

import h_bg from "@/assets/h_bg.svg";
import title from '@/assets/title.svg'
import "./style.scss";
export default () => {
  return (
    <div className='home_header'>
      <img src={h_bg} className='bg' alt='' />
      <div className='home_header_content'>
        <img className="title_img" src={title} alt="" />
        <div className='font-wrap'>
          <div>FilaDoge is the first user-programmed actor </div>
          <div>on Filecoin network.</div>
        </div>
      </div>
    </div>
  );
};
