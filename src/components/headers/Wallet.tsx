/** @format */
import { loginMarck } from "@/server/account";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "@/pages/content";
import CSCopy from "../cs-copy";
import { Button } from "antd";
import { setStr } from "@/utils";

export default () => {
  const [account, setAccount] = useState("");
  const context = useContext<any>(MyContext);

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
  return (
    <div>
      {account ? (
        <Button className='border-btn'>
          <CSCopy
            value={account}
            suffixCount={6}
            className='text-gray text-sm'
          />
        </Button>
      ) : (
        <Button className='connect-btn' onClick={handleClick}>
          Connect
        </Button>
      )}
    </div>
  );
};
