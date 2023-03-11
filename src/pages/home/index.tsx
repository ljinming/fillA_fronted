/** @format */

import Header from "./Header";
import Content from "./content";
import Rank from "./Rank";
import "./style.scss";
export default () => {
  return (
    <div className='home'>
      <Header />
      <Content />
      <Rank />
    </div>
  );
};
