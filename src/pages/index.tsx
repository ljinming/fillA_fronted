/** @format */

import { useEffect, createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Head from "@/components/headers";
import Home from "@/pages/home";
import Footer from "@/components/footers";
import Game from "@/pages/game";
import bg from "@/assets/bg.svg";
import { MyContext } from "./content";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/share",
    element: <Game />,
  },
  {
    path: "/share/:address",
    element: <Game />,
  },
]);

export default () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const obj = JSON.parse(localStorage?.getItem("login") || "{}");
    if (obj && obj.length > 0) {
      setAccount(obj[0]);
    }
    const handleAccountsChanged = (accounts: any, other: any) => {
      const obj = JSON.parse(localStorage?.getItem("login") || "{}");
      if (!account || !obj || (accounts && obj && accounts[0] !== obj[0])) {
        //退出登录
        localStorage.removeItem("login");
        window.location.reload();
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      console.log("=不支持钱包 || 未下载钱包");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <MyContext.Provider value={{ account, setAccount }}>
      <div className='app'>
        <img src={bg} className='bg-Content' alt='' />
        <div className='app-content' id='app-content'>
          <Head />
          <RouterProvider router={router} />
          <Footer />
        </div>
      </div>
    </MyContext.Provider>
  );
};
