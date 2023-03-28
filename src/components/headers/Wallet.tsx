/** @format */
import { addNetwork, addToken, loginMarck } from "@/server/account";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "@/pages/content";
import CSCopy from "../cs-copy";
import { Button } from "antd";
import Tranfe from '@/components/tranfe'
import { shallowEqual, useSelector } from "react-redux";
import FethContract from "@/server/DataFetcher";
import Web3 from "@/server/Web3";


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
    loginMarck()?.then( async (res: any) => {
      const aq = await Web3.getNetWork();
      if (!aq) { 
        //add network 
        const add:any = await addNetwork();
       
      }
      addToken()

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
