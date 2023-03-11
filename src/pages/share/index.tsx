/** @format */

import { useState } from "react";
import Contract from "@/server/Contract";
import { Button } from "antd";
import { Input, Card } from "antd";

export default () => {
  const [mint, setMint] = useState(true);
  const [showAddress, setShowAddress] = useState("");
  const [showInput, setShowInput] = useState("");
  const [value, setValue] = useState("");

  // const preMint = (address: string) => {å
  //   Contract.acceptInvitation(address).then((res) => {
  //     setMint(!!res);
  //   });
  // };

  const handleMint = () => {
    Contract.acceptInvitation(value).then((res) => {
      //setMint(!!res);
    });
  };
  return (
    <div className='flex w-full max-w-7xl m-auto content'>
      <Card title='Mint' className='w-2/5 m-auto'>
        <div className='h-60  flex flex-col px-10 justify-between'>
          <div className='w-full'>
            <span>Adress:</span>
            <Input
              className='h-20 mt-2'
              onChange={(e: any) => setValue(e.target.value)}
            />
          </div>
          <Button
            className={`w-full ${
              mint ? "" : "bg-gray hover:border-gray focus:border-gray"
            }`}
            disabled={!mint}
            onClick={handleMint}>
            mint
          </Button>
        </div>
      </Card>

      {/* 
      <div className='flex p-10 flex-col mt-2/5 max-w-xs m-auto gap-y-5'>
        <div>Mint </div>
        <div>
          <span>Adress:</span>
          <Input onChange={(e: any) => setValue(e.target.value)} />
        </div>
        <Button
          className={`w-full ${
            mint ? "" : "bg-gray hover:border-gray focus:border-gray"
          }`}
          disabled={!mint}
          onClick={handleMint}>
          mint
        </Button>
      </div>
      <div className='max-w-xs'>
        <h3>Address Change</h3>
        <div>
          <span>Address</span>
          <Input onChange={(e: any) => setShowInput(e.target.value)} />
          <span>change</span>
        </div>
        <div>{showAddress}</div>
      </div> */}
    </div>
  );
};
