/** @format */
import { Modal, Input,notification, message } from "antd";
import { useContext, useState } from "react";
import { Button } from "antd";
import fa from "@glif/filecoin-address";
import Web3 from "@/server/Web3";
import { LoadingOutlined } from "@ant-design/icons";
import { swapSvg,warningIcon } from "@/svgIcons";
import { message_config } from '@/constant'
import "./style.scss";
import { debounce } from '@/utils'
import FethContract from "@/server/DataFetcher";
import { MyContext } from "@/pages/content";

interface Props { 
  onChange?:()=>void
}

export default (props: Props) => {
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState("");
  const [amount, setAmount] = useState<number | any>();
  const [loading, setLoading] = useState(false)
    const context = useContext<any>(MyContext);


  enum CoinType {
    MAIN = "f",
    TEST = "t",
  }

    const getBanlance = () => { 
    FethContract.fetchBalance().then((res: any) => { 
     // setBanlance(res.banlance);
    })
  }

  const handleChange = async () => {
    if (loading) { 
      return ''
    }
    if (!context.account) { 
         message.warning({
                    content:`Please connect wallet `,
                    ...message_config
                  })
    }
        const isNetwork = await Web3.getNetWork()
        if (!isNetwork) { 
          return  notification.warning({
            message: "",
            description: 'Please make sure the Filecoin Network is selected in your wallet.',
            duration: 10,
            className: "app-notic",
             icon: <span className="notification-icon" >{ warningIcon}</span>
          });
        }
    //change address
      if (showAddress.startsWith('f4') && fa.checkAddressString(showAddress)) { 
        const address = fa.ethAddressFromDelegated(showAddress);
          setLoading(true)
        Web3.transfer(address, amount,context.account).then((res) => { 
          setLoading(false)
          // tranf succeeded
          if (res) { 
            getBanlance()
          }
          
        })
      } else {
             message.warning({
                    content:`It doesn't smell like an f4 address!`,
                    ...message_config
                  })
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
          <span className='Address'>Address:</span>
          <Input
            onChange={(e: any) => setShowAddress(e.target.value)}
            placeholder='Please enter the f4 address'
          />
         </div>
            <div className='calc-box'>
          <span className='Address'>Amount:</span>
          <Input
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder='Please enter the amount'
          />
        </div>
        <div className='calc-box box'>
          <Button className='connect-btn btn' onClick={debounce(handleChange,3000,true)}>
            {loading ? <LoadingOutlined /> : 'Send'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};


