/** @format */
import { Modal, Input, message } from "antd";
import { useState } from "react";
import { Button } from "antd";
import fa from "@glif/filecoin-address";
import copy from "copy-to-clipboard";
import Web3 from "@/server/Web3";
import { swapSvg, } from "@/svgIcons";
import web3 from "web3";
import "./style.scss";

export default () => {
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState("");
  const [amount,setAmount] = useState<number|any>();

  enum CoinType {
    MAIN = "f",
    TEST = "t",
  }

  const handleChange = () => {
    //change address
      if (showAddress.startsWith('f4') && fa.checkAddressString(showAddress)) { 
          const address = fa.ethAddressFromDelegated(showAddress);
          console.log('===4',address,showAddress)
            Web3.transfer(address,amount)
      } else {
          message.warning('please enter right f4 address')
      }
  };
  return (
    <div className='tranfe'>
      <span className='tranfe-icon' onClick={() => setShow(true)}>
        {swapSvg}
      </span>
      <Modal
        title='Send'
        open={show}
        footer={null}
        onCancel={() => setShow(false)}>
        <div className='calc-box'>
          <span className='Address'>address:</span>
          <Input
            onChange={(e: any) => setShowAddress(e.target.value)}
            placeholder='Please fill in f4 address'
          />
         </div>
            <div className='calc-box'>
          <span className='Address'>Amount:</span>
          <Input
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder='Please enter amount'
          />
        </div>
        <div className='calc-box box'>
          <Button className='connect-btn btn' onClick={handleChange}>
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
};
