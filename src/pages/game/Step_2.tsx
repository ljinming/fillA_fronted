/** @format */
import Calc from "@/components/calc";
import {  Input, notification } from "antd";
import { MyContext } from "@/pages/content";
import { useParams } from "react-router-dom";
import Tranfe from '@/components/tranfe'
import { useState, useContext, useEffect, useRef } from "react";
import Web3 from "@/server/Web3";
import fa from "@glif/filecoin-address";
import { LoadingOutlined } from "@ant-design/icons";

export default () => {
  const context = useContext<any>(MyContext);
  const [banlance, setBanlance] = useState<string | number>(0);
  const [mint, setMint] = useState("");
  const [game, setGame] = useState("");

  const [loading, setLoading] = useState<Record<string, boolean>>({
    mint: false,
    game: false,
  });
  const [isMint, setIsMint] = useState({
    mint: false,
    game: false,
  });
  let { address } = useParams();
  
  useEffect(() => {
    if (context.account) {
      Web3.setAccount(context.account);
      getbBanlance(context.account)
      PreMint(context.account);
    }
  }, [context?.account]);

  const getbBanlance=(account:string)=>{ 
      Web3.getBalance(account).then((res: number | string) => {
      setBanlance(res);
    });
  }

  const PreMint = async (account:string) => {
    const result = await Web3.hasBeenInvited(account);
    const hasGambled = await Web3.hasGambled(account);
     const PreMint = {  mint: result,
      game: hasGambled,}
    setIsMint(PreMint);
   
    return PreMint
  };

  const handleClick = async (type: string) => {
    if (!context?.account) {
      return notification.warning({
        message: "",
        description: 'Doggy wants to chase foxy, please connect your wallet!',
        duration: null,
        className: "app-notic",
      })
    }

    let invited: string =
      address || "f410faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaonc6iji";
    //0x0000000000000000000000000000000000000000
    const value = type === "mint" ? mint : game;

    if (address && !fa.validateAddressString(address)) {
      return notification.warning({
        message: "",
        description: 'Invalid invite code!',
        duration: 10,
        className: "app-notic",
      })
    }
  
    //value 以f4 地址
    if (
      value.length === 0 ||
      (!value.startsWith("f4"))
    ) {
      return notification.warning({
        message: "",
        description: `It doesn't smell like an f4 address!`,
        duration: 10,
        className: "app-notic",
      })
    }

    let accountValue = type === "mint" ? mint : game;
    if (accountValue === address) {
      return notification.warning({
        message: "",
        description: 'Self-invite is not supported, please ask other doggies to invite you!',
        duration: 10,
        className: "app-notic",
      })
    }
    if (accountValue && fa.validateAddressString(accountValue)) {
      accountValue = fa.ethAddressFromDelegated(accountValue)
    } else {
      return notification.warning({
        message: "",
        description: `It doesn't smell like an f4 address!`,
        duration: 10,
        className: "app-notic",
      })
    }

    if (accountValue === '0x0000000000000000000000000000000000000000') {
      return notification.warning({
        message: "",
        description:  `It doesn't smell like an f4 address!`,
        duration: 10,
        className: "app-notic",
      })
    }

    invited = fa.ethAddressFromDelegated(invited)

    const preMint = await PreMint(accountValue)
    
    const showMint = preMint || isMint;
    if (type === "mint") {
      if (showMint.mint) {
         return notification.warning({
        message: "",
        description: 'Already claimed, leave other doggies a chance.',
        duration: 10,
        className: "app-notic",
      })
      }
      setLoading({
        ...loading,
        mint: true,
      });
      Web3.mint(invited,accountValue).then((res) => {
        setLoading({
          ...loading,
          mint: false,
        });
      });
    } else if (type === "game") {
      if (showMint.game) {
        return notification.warning({
        message: "",
        description: 'Already gamed, leave other doggies a chance.',
        duration: 10,
        className: "app-notic",
        })
      }
      setLoading({
        ...loading,
        game: true,
      });

      Web3.lottery(invited,accountValue).then((res) => {
        if (res) {
          getbBanlance(context.account)
        }
        setLoading({
          ...loading,
          game: false,
        });
      });
    }
  };

  const listText = [
    {
      title: "Mint",
      detail:
        "Fill in your f4 address, or use our 0x address converter, to Mint FLD token",
      label: "f4 Address",
      btnText: "Claim",
      key: "mint",
    },
    {
      title: "Lottery",
      detail:
        "Fill in your f4 address, or use our 0x address converter, to join the Lottery",
      label: "f4 Address",
      btnText: "Game",
      key: "game",
    },
  ];

  return (
    <div className='game-step_2'>
      <div className='game-card'>
        <div className='card-header'>
          <h3 className='font-title game-title'>
            <span> Claim and Game</span>
          </h3>
        </div>
        <div className='detail'>
          <div>
            Mint your FilaDoge (FLD) token, claim up to
            <span className='value'> 5,086,250 </span>
            FLD,
          </div>
          <div>first come first served, the sooner the more!</div>
          <div>or/and</div>
          <div>
            Join the lottery game to win up to
            <span className='value'> 1,000,000 </span>FLD!
          </div>
        </div>
      </div>
      <div className='game-header'>
      
        <h3 className='font-title title'>
           <div>Balance:</div>
          <div className='value'>{Number(banlance)?.toLocaleString()}</div>
          <Tranfe />
        </h3>
         
        <h3 className='font-title title'>
          <div>f4 address converter:</div>
          <Calc />
        </h3>
      </div>
      <div className='card-content'>
        {listText.map((item, index) => {
          return (
            <div className='card' key={index}>
              <div className='card-header'>
                <h3 className='font-title title'>
                  <span>{item.title}</span>
                </h3>
              </div>
              <div className='detail'>
                <span className='detail_text'>{item.detail}</span>
                <div className='input-label'>
                  {item.label}
                  <Input
                    value={item.title === "Mint" ? mint : game}
                    className='custom-input'
                    onChange={(e: any) => {
                      if (item.key === "mint") {
                        setMint(e.target.value);
                      } else {
                        setGame(e.target.value);
                      }
                    }}
                    placeholder='Please feed me with tasty f4 address!'
                  />
                </div>
              </div>

              <div
                className={`btn border-btn`}
                onClick={() => { 
                  if (loading[item.key]) return
                   handleClick(item.key)
                }}>
                {loading[item.key] ? <LoadingOutlined /> : item.btnText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
