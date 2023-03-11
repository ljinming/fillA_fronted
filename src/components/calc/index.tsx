/** @format */
import { Modal, Input, message } from "antd";
import { useState } from "react";
import { Button } from "antd";
import fa from "@glif/filecoin-address";
import copy from "copy-to-clipboard";
import { calcSvg, copySvg } from "@/svgIcons";
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
      const f4Address = fa.delegatedFromEthAddress(input).toString();
      setShowAddress(f4Address);
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
        onCancel={() => setShow(false)}>
        <div className='calc-box'>
          <span className='Address'>0x address:</span>
          <Input
            onChange={(e: any) => setInput(e.target.value)}
            placeholder='Please fill in 0x address'
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
                  message.success("address copied!");
                }
              }}>
              {copySvg}
            </span>
          </span>
        </div>
        <div className='calc-box box'>
          <Button className='connect-btn btn' onClick={handleChange}>
            Change
          </Button>
        </div>
      </Modal>
    </div>
  );
};
