/** @format */

import { useEffect, useState } from "react";
import FilaContract from "@/server/Web3";
import { shallowEqual, useSelector } from "react-redux";

export default () => {
  const [claimed, setClaimed] = useState<string | number>("0");
  const [mint, setMint] = useState<string | number>("0");
  const [participants, setParticipants] = useState<string | number>("0");
  useEffect(() => {
    //load();
  }, []);

  const { HasRewardedInviteeAmount,HasRewardedInvitees,NextInviteeReward} = useSelector(
    (state: any) => state?.home_rank,
    shallowEqual
   );
  

  // useEffect(() => {
  //   setTimeout(() => {
  //     load()
  //    },15*1000)
  //  },[])

  // const load = () => {
  //   FilaContract.rank_mint("claimed").then((res: string | number) => {
  //     setClaimed(res);
  //   });
  //   FilaContract.rank_mint("mint").then((res: string | number) => {
  //     setMint(res);
  //   });
  //   FilaContract.rank_mint("participants").then((res: string | number) => {
  //     setParticipants(res);
  //   });
  // };
  return (
    <div className='rank-card'>
      <div className='card-item'>
        <h3 className='title'>$ FLD for the next Mint</h3>
        <span className='value'>{Number(NextInviteeReward).toLocaleString()}</span>
      </div>
      <div className='card-item'>
        <h3 className='title'>$ FLD claimed</h3>
        <span className='value'>{Number(HasRewardedInviteeAmount).toLocaleString()}</span>
      </div>
      <div className='card-item'>
        <h3 className='title'>Addresses participated</h3>
        <span className='value'>{Number(HasRewardedInvitees).toLocaleString()}</span>
      </div>
    </div>
  );
};
