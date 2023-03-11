/** @format */
import Calc from "@/components/calc";
import { Input, message } from "antd";
import { MyContext } from "@/pages/content";
import { useParams } from "react-router-dom";
import Contract from "@/server/Contract";
import { useState, useContext, useEffect, useRef } from "react";
import Web3 from "@/server/Web3";
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
      PreMint();
    }
  }, [context?.account]);

  const PreMint = async () => {
    Contract.getBalance(context.account).then((res: number | string) => {
      setBanlance(res);
    });
    const result = await Web3.hasBeenInvited();
    const hasGambled = await Web3.hasGambled();
    setIsMint({
      mint: result,
      game: !hasGambled,
    });
  };

  const handleClick = (type: string) => {
    if (!context?.account) {
      return message.warning("please connect to wallet");
    }
    const value = type === "mint" ? mint : game;
    if (
      value.length === 0 ||
      (!value.startsWith("t4") && !value.startsWith("f4"))
    ) {
      return message.warning("pleace enter f4 adress");
    }
    if (type === "mint") {
      if (isMint.mint) {
        return message.warning("minted");
      }
      setLoading({
        ...loading,
        mint: true,
      });
      Web3.mint("0x0000000000000000000000000000000000000000").then((res) => {
        if (res) {
          PreMint();
        }
        setLoading({
          ...loading,
          mint: false,
        });
      });
    } else if (type === "game") {
      if (isMint.game) {
        return message.warning("minted");
      }
      setLoading({
        ...loading,
        game: true,
      });
      const invited: string =
        address || "0x0000000000000000000000000000000000000000";
      Web3.lottery(invited).then((res) => {
        if (res) {
          PreMint();
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

  /*
   
    */
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
          <div className='value'>{banlance}</div>
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
                    placeholder='pleace enter f4 adress'
                  />
                </div>
              </div>

              <div
                className={`btn border-btn`}
                onClick={() => handleClick(item.key)}>
                {loading[item.key] ? <LoadingOutlined /> : item.btnText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
