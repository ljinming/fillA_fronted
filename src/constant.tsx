/** @format */

import mint from "@/assets/mint.png";
import lottery from "@/assets/lottery.png";
import referral from "@/assets/referral.png";
import airdrop from "@/assets/airdrop.png";
import thirdrunner from "@/assets/thirdrunner.png";
import champion from "@/assets/champion.png";
import runnerup from "@/assets/runnerup.png";
import { twitter, medium } from "./svgIcons";
import { FormOutlined } from '@ant-design/icons';
import { warningIcon ,successIcon} from '@/svgIcons'

export const FilaDogeContract = "0x70c31e973522D702d200C04644F341cEC22dccAD";

export const home_content = [
  
    {
      title: "",
      text: "Hey, have you heard that the FEVM is launching soon? ",
    },
    {
      title: "",
      text: "Yes, doggies are all talking about it, but what is the FEVM again?",
    },
    {
      title: "",
      text: "FEVM stands for Filecoin Virtual Machine, it is a runtime environment for smart contracts (also called actors) on the Filecoin network.",
    },
    {
      title: "",
      text: "Similar to the EVM, Ethereum Virtual Machine?",
    },
    {
      title: "",
      text: "Yes, FEVM brings user programmability to Filecoin, unleashing the enormous potential of an open data economy. Do you want to have some fun?",
    },
    {
      title: "",
      text: "What’s in your mind?",
    },
    {
      title: "",
      text: "FilaDoge aims to become the first memecoin on FEVM and will be launching on March 14, the same day as the FVM. There will be great deal of airdrop games to reward the outstanding contributors and promoters of the Filecoin FEVM.",
    },


  
    {
      title: "",
      text: "Do I need to have a Filecoin wallet address in order to participate?",
    },
    {
      title: "",
      text: "Good question! Since the FEVM is fully EVM-compatible, new ERC-20 tokens can be launched on the Filecoin network or bridged directly to token pools on other chains. Users from the Ethereum can participate with their 0x addresses as well.",
    },
    {
      title: "",
      text: "Can’t wait already. Who’s gonna receive airdrop, can I?",
    },
    {
      title: "",
      text: "Yes, technically anyone can. As I mentioned, to commemorate this historic moment of both Filecoin and Ethereum, FilaDoge rewards the outstaning collaborators of both communities. Top FIL and ETH holders, users who completed promotion tasks and the lottery game participants will be able to receive airdrops and claim various amount of FLD tokens.",
    },
    {
      title: "",
      text: "Hooray!!! Let's follow their Twitter and stay in the loop!",
    },
  
];

export const message_config = {
         className: 'app-message',
        duration: 5,
       icon: <span className="message-icon">{warningIcon}</span> 
}
export const message_config_success = {
    className: 'app-message',
        duration: 5,
       icon: <span className="message-icon">{successIcon}</span> 
}
export const content_text = [
  {
    icon: airdrop,
    title: "Airdrop",
    key: "introduce-1",
    text: (
      <div>
        <div>Reward Protocol Labs with 6% of the total supply!</div>
        <div>Reward top 400 ETH holders with 4% of the total supply!</div>
      </div>
    ),
    details: [
      "Due to limited knowledge of top FIL holders’ 0x or f4 addresses, this part of airdrop will be allocated to the Protocol Lab as a lump sum and to be re-distributed to FIL holders in the future.",
    ],
  },
  {
    icon: mint,
    title: "Mint",
    key: "introduce-2",
    text: (
      <div>
        <div>
          Mint your amount of FilaDoge token (FLD) from 20% of total supply,
          first come first served!
        </div>
        <div>Claim as much as whooping 5,086,250 FLD, the sooner the more!</div>
      </div>
    ),
    details: [
      "The relationship between the FLD token amount and the order of claim is escribed by the following mathematical model,maximum500,000 addresses.",
    ],
  },
  {
    icon: lottery,
    title: "Lottery",
    key: "introduce-3",
    text: (
      <div>
        Win a lottery and claim any random amount from 10,000 to 1,000,000 FLD,
        space limited! Allocate up to 10% of total supply.
      </div>
    ),
  },
  {
    icon: referral,
    title: "Referral",
    key: "Referral-3",
    text: (
      <div>
        Share your fun and luck along with the distinct referral link to your.
        social media crowd, each successful referral2 will earn you 400,000 FLD.
        Allocate up to 20% of total FLD supply.
      </div>
    ),
    details: ["Any address can only participate Mint, Lottery or both once."],
  },
];

export const columns: any = [
  {
    dataIndex: "sortIndex",
    align: "center",
    title: "Ranking",
    render: (text: any) => {
      const url =
        text === 0
          ? champion
          : text === 1
          ? runnerup
          : text === 2
          ? thirdrunner
          : "";
      return text < 3 ? <img src={url} className='rank-icon' /> : text + 1;
    },
  },

  { dataIndex: "account", title: "Address" },
  { dataIndex: "f4Address", title: "f4 Address" },
  {
    dataIndex: "amount", title: "Rewards", render: (v:number|string) => { 
                return Number(v).toLocaleString()

  } },
];

export const links = [
  {
    text: "twitter",
    link: "https://twitter.com/filadoge",
    icon: twitter,
  },
  {
    text: "Medium",
    link: "https://medium.com/@filadoge",
    icon:medium,
  },
  {
    text: "Community",
    link: "https://forms.gle/kcpEEneVuvuXdxJz9",
    icon: <span className="Community">
          <FormOutlined className="Community_icon"/>
    </span>  
  },
];
