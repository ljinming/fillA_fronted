/** @format */
import rank from "@/assets/rank.webp";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useContext, useEffect, useState } from "react";
import Mint from "./Mint";
import Lottery from "./Lottery";
import Referral from "./Referral";
import Market from "./Market";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getValueDivide } from "@/utils";
import filscanLogo from '@/assets/logo2.png'

export default () => {
  const dispath = useDispatch();
  
  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    axios.get('/api/getdata').then(res => { 
      const {HasRewardedInviteeAmount ,HasRewardedInvitees,NextInviteeReward} = res.data || {}
      const obj = {
        HasRewardedInviteeAmount: HasRewardedInviteeAmount&&getValueDivide(Number(HasRewardedInviteeAmount), 18, 0),
        HasRewardedInvitees:HasRewardedInvitees,
        NextInviteeReward:NextInviteeReward&&getValueDivide(Number(NextInviteeReward), 18, 0),
      }
      dispath({
        type: 'home_rank/change',
        payload: {
          ...res.data,
          ...obj
        }
      })
    }).catch(() => { 
      
    })
  }, [])
  




  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Mint`,
      children: <div className='rank-list_content'>
         <Mint />
      </div>,
      
    },
      {
      key: "3",
      label: `Referral`,
        children: <div className='rank-list_content'>
        <Referral />
      </div>,
    },
    {
      key: "2",
      label: `Lottery`,
      children: <div className='rank-list_content'>
         <Lottery />
      </div> 
    },
    {
      key: "4",
      label: <span style={{ display: 'flex', alignItems: 'center', columnGap: '6px' }}><img className='link' onClick={() => { 
        window.open('https://filscan.io/token/0x7b90337f65faa2b2b8ed583ba1ba6eb0c9d7ea44/')
      }} src={filscanLogo} style={{width:20}} /> Transactions</span>,
      children: <div className='rank-list_content'>
         <Market />
      </div>,
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
