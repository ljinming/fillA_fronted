/** @format */
import { Modal, Input,notification } from "antd";
import { useState } from "react";
import { Button } from "antd";
import fa from "@glif/filecoin-address";
import copy from "copy-to-clipboard";
import { calcSvg, copySvg } from "@/svgIcons";
import web3 from "web3";
import "./style.scss";

export default () => {
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState("");
  const [input, setInput] = useState("");

  enum CoinType {
    MAIN = "f",
    TEST = "t",
  }

  const handleChange = () => {
    //change address
    
    if (input && input.length > 0 && input.startsWith("0x")) {
      if (!web3.utils.isAddress(input)) { 
         notification.success({
                message: "",
                description: `It doesn't smell like a 0x address!`,
                duration: 10,
                className: "app-notic",
              })
    }
      const f4Address = fa.delegatedFromEthAddress(input,CoinType.MAIN).toString();
      setShowAddress(f4Address);
    } else {
        notification.success({
                message: "",
                description: `It doesn't smell like an f4 address!`,
                duration: 10,
                className: "app-notic",
              })
    }
  };
  return (
    <div className='calc'>
      <span className='calc-icon' onClick={() => setShow(true)}>
        {calcSvg}
      </span>
      <Modal
        title='f4 Address Converter'
        open={show}
        footer={null}
        onCancel={() => { 
          setShow(false);
          setInput('');
          setShowAddress('');

        }}>
        <div className='calc-box'>
          <span className='Address'>0x address:</span>
          <Input
            onChange={(e: any) => setInput(e.target.value)}
            placeholder='Please enter the 0x address'
          />
        </div>

        <div className='calc-box'>
          <span className='Address'>f4 address:</span>
          <span className='showAddress'>
            <span className='text'>{showAddress} </span>
            <span
              className='copy-icon'
              onClick={() => {
                if (showAddress.length > 0) {
                copy(showAddress);
                notification.success({
                message: "",
                description: 'f4 address copied!',
                duration: 10,
                className: "app-notic",
              })
                 // message.success("f4 address copied!");
                }
              }}>
              {copySvg}
            </span>
          </span>
        </div>
        <div className='calc-box box'>
          <Button className='connect-btn btn' onClick={handleChange}>
            Convert
          </Button>
        </div>
      </Modal>
    </div>
  );
};
