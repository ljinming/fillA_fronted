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
          <div>First open-source peer-to-peer digital meme-token </div>
          <div>on Filecoin Virtual Machine</div>
        </div>
      </div>
    </div>
  );
};
