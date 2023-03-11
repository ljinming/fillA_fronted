/** @format */
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import Wallet from "@/components/wallet";
import Calc from "@/components/calc";
export default () => {
  const [showScroll, setScrool] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = document.getElementById("root")?.scrollTop;
      if (scrollTop) {
        setScrool(true);
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, []);
  return (
    <div
      className={`absolute inset-0 z-10 h-24 flex justify-between items-center shadow-sm px-20  py-2 bg-white ${
        showScroll ? "opacity-90" : ""
      }`}>
      <img src={logo} className='w-20 bg-white rounded-full' alt='' />
      <div className='flex justify-between gap-x-5 '>
        <Wallet />
        <Calc />
      </div>
    </div>
  );
};
