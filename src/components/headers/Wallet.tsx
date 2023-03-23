/** @format */
import { loginMarck } from "@/server/account";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "@/pages/content";
import CSCopy from "../cs-copy";
import { Button } from "antd";
import Tranfe from '@/components/tranfe'
import { shallowEqual, useSelector } from "react-redux";
import FethContract from "@/server/DataFetcher";

//f410flairseamy5sesqaea5r5szlpob7xsv22rw5sopq

export default () => {
  const [account, setAccount] = useState("");
  const context = useContext<any>(MyContext);
  const [banlance, setBanlance] = useState<string | number>('');

    const banlanceStore = useSelector(
    (state: any) => state?.banlance,
    shallowEqual
    );
  
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
    if (account) { 
    getBanlance(account);
    }

  }, [account])


  const getBanlance = (account: string) => { 
    FethContract.fetchBalance(account).then((res: any) => { 
      setBanlance(res.banlance);
    })
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
            Balance:
            <span className="value">{Number(banlance).toLocaleString()}</span>
            <Tranfe />
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
