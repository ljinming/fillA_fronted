/** @format */
import { loginMarck } from "@/server/account";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "@/pages/content";
import CSCopy from "../cs-copy";
import { Button } from "antd";
import Web3 from '@/server/Web3'
import Tranfe from '@/components/tranfe'
import { shallowEqual, useSelector } from "react-redux";
export default () => {
  const [account, setAccount] = useState("");
  const context = useContext<any>(MyContext);
  const [banlance, setBanlance] = useState<string | number>('');
    const banlanceStore = useSelector(
    (state: any) => state?.banlance,
    shallowEqual
    );
  //0xC6f8767BC61515CEEe4DC2FB430EF411656d6C6F
  
  useEffect(() => {
    if (context && context.account) {
      setAccount(context.account);
    }
  }, [context.account]);

  const handleClick = () => {
    // 链接钱包
    loginMarck()?.then((res: any) => {
      setAccount(res[0]);
      context.setAccount(res[0]);
      localStorage.setItem("login", JSON.stringify(res));
    });
  };

  useEffect(() => { 
    if (banlanceStore.banlance) { 
    setBanlance(banlanceStore.banlance)
    }
  },[banlanceStore])

  useEffect(() => { 
    getBanlance(account);
  }, [account])


  const getBanlance=(account:string )=>{ 
      Web3.getBalance(account).then((res: number | string) => {
      setBanlance(res);
      });
  }

  return (
    <div className="wallet">
      {account ? (
        <div className="wallet-connect">
           <Button className='border-btn'>
          <CSCopy
            value={account}
            suffixCount={6}
            className='text-gray text-sm'
          />
          </Button>
          <div className="wallet-banlance">
            Banlance:
            <span className="value">{Number(banlance).toLocaleString()}</span>
            <Tranfe onChange={() => {
              getBanlance(account)
            }}/>
          </div>
         

        </div>
       
      ) : (
        <Button className='connect-btn' onClick={handleClick}>
          Connect
        </Button>
      )}
    </div>
  );
};
