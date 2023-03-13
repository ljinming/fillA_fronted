/** @format */

import { useEffect, useState } from "react";
import FilaContract from "@/server/Web3";

export default () => {
  const [claimed, setClaimed] = useState<string | number>("0");
  const [mint, setMint] = useState<string | number>("0");
  const [participants, setParticipants] = useState<string | number>("0");
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    FilaContract.rank_mint("claimed").then((res: string | number) => {
      setClaimed(res);
    });
    FilaContract.rank_mint("mint").then((res: string | number) => {
      setMint(res);
    });
    FilaContract.rank_mint("participants").then((res: string | number) => {
      setParticipants(res);
    });
  };
  return (
    <div className='rank-card'>
      <div className='card-item'>
        <h3 className='title'>$ FLD for the next Mint</h3>
        <span className='value'>{Number(mint)?.toLocaleString()}</span>
      </div>
      <div className='card-item'>
        <h3 className='title'>$ FLD claimed</h3>
        <span className='value'>{Number(claimed)?.toLocaleString()}</span>
      </div>
      <div className='card-item'>
        <h3 className='title'>Addresses participated</h3>
        <span className='value'>{Number(participants)?.toLocaleString()}</span>
      </div>
    </div>
  );
};
