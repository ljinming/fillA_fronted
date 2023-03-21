/** @format */

import Header from "./Header";
import Content from "./content";
import Rank from "./Rank";
import "./style.scss";
import { useEffect } from "react";
import { counter } from "@/server/Kafka";
export default () => {
  useEffect(() => { 
    counter()
  },[])
  return (
    <div className='home'>
      <Header />
      <Content />
      <Rank />
    </div>
  );
};
