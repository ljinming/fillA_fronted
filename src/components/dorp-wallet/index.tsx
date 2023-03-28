import { Popover,Image ,Button, Input, message, notification} from "antd"
import { useContext, useEffect, useMemo, useState } from "react";
import { MyContext } from "@/pages/content";
import { shallowEqual, useSelector } from "react-redux";
import FethContract from "@/server/DataFetcher";
import { addNetwork, addToken, loginMarck } from "@/server/account";
import account_img from '@/assets/1-1.png';
import Tranfe from '@/components/tranfe'
import './style.scss'
import CSCopy from "../cs-copy";
import Web3 from "@/server/Web3";
import { addTokenIcon, warningIcon } from "@/svgIcons";

export default () => { 
  const context = useContext<any>(MyContext);
  const banlanceStore = useSelector(
    (state: any) => state?.banlance,
    shallowEqual
  );

  const [showTitle,setTitle] = useState('')

  const account = useMemo(() => { 
    return context.account
  },[context])

   useEffect(() => { 
    if (account) { 
      FethContract.fetchBalance(account);
      checkNetwork()
    }
   }, [account])
  
    const logout = () => {
    //登出
    localStorage.removeItem("login");
    window.location.reload();
    };
  
  
  useEffect(() => { 
    if (window.ethereum) { 
      window.ethereum.on('chainChanged',checkNetwork)
    }
    return () => { 
      window?.ethereum?.removeListener('chainChanged',checkNetwork)
    }
     
  },[])
  
  
 const  checkNetwork = async() => { 
   const isRight_work = await Web3.getNetWork();
   if (!isRight_work) {
     //网络是错的，添加网络
     setTitle('Incorrect Network')
   } else { 
      setTitle('Filecoin')
   }
  }

  const handleConnect = async () => { 
    if (showTitle === 'Incorrect Network') { 
      // 修改网络
      await addNetwork();
      checkNetwork();
    }
  }

  const handleToken = async () => { 
    const isRight_work = await Web3.getNetWork();
    if (isRight_work) {
      await addToken();
    } else { 
        return  notification.warning({
            message: "",
            description: 'Please make sure the Filecoin Network is selected in your wallet.',
            duration: 10,
            className: "app-notic",
             icon: <span className="notification-icon" >{ warningIcon}</span>
          });
    }

  }
  


  const handleClick = () => { 
    //connect wallet
      // 链接钱包
    loginMarck()?.then( async (res: any) => {
      context.setAccount(res[0]);
      localStorage.setItem("login", JSON.stringify(res));
    });
  }

  const cardContent = <div className="wallet-content">
    <div className="wallet-content_item wallet-content_auth">
      <Image preview={false} className="account_img" src={account_img} />
      <CSCopy
            value={account}
            suffixCount={8}
            className='text-account'   
        /> 
    </div>
    <div className="wallet-content_item">
      <div>
      Balance:
      <span className="value">{banlanceStore.banlance ?Number(banlanceStore.banlance).toLocaleString():''}</span>
      </div>
       <Tranfe />
    </div>
     <div className="wallet-content_item">
      Import FLD Token
      <div className="add_tonke_icon" onClick={handleToken }>{ addTokenIcon }</div>
    </div>
    <div className="wallet-content_logout" onClick={logout}>logout</div>
  </div>

// style={{background:showTitle === 'Filecoin'?'rgba(255, 150, 92, 0.6)':''}}
  return <>
    {account ? 
      <div className="wallet-connect">
        {showTitle && <div className={`wallet-connect_item connetc_network ${showTitle === 'Filecoin' ?"connect-file":''}` } onClick={handleConnect}>
          {showTitle}
          </div>}
          <div className="wallet-connect_item">
              Balance:
            <span className="value">{banlanceStore.banlance ? Number(banlanceStore.banlance).toLocaleString() : ''}</span>
          </div> 
           <Popover defaultOpen={false} placement="bottom" content={cardContent} trigger={'click'}  >
           <Image preview={false} className="account_img" src={account_img} />
        </Popover>
        </div> :
      <Button className='connect-btn' onClick={handleClick}>
        Connect
      </Button>}
  </>
  
  

}