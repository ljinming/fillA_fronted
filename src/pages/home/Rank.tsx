/** @format */
import rank from "@/assets/rank.webp";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import Mint from "./Mint";
import Lottery from "./Lottery";
import Referral from "./Referral";
export default () => {
  const [active, setActive] = useState("1");
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Mint`,
      children: <Mint />,
      
    },
      {
      key: "3",
      label: `Referral`,
      children: <Referral />,
    },
    {
      key: "2",
      label: `Lottery`,
      children: <Lottery />,
    },
  
  ];

  return (
    <div className='home-rank'>
      <div className='content'>
        <div className='home-rank_left'>
          <div className='title-icon' style={{ cursor: 'pointer' }} onClick={() => { 
            document.getElementById('app-content')!.scrollTop = 0
          }}>FilaDoge</div>
          <h3 className='h3-title'>Leaderboards</h3>
        </div>
        <div className='home-rank_right'>
          <img src={rank} className='img' alt='' />
        </div>
        <div className='rank-list'>
          <Tabs
            defaultActiveKey='1'
            size={"large"}
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
