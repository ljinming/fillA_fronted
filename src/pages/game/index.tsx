/** @format */
import "./style.scss";
import { useState } from "react";
import { Steps } from "antd";
import Step_1 from "./Step_1";
import Step_2 from "./Step_2";
import Step_3 from "./Step_3";
export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='share-game'>
      <Steps
        current={current}
        className='steps-content'
        onChange={(current) => {
          setCurrent(current);
        }}
        items={[
          {
            title: "Step 1",
            description: "Follow us on Twitter",
          },
          {
            title: "Step 2",
            description: "Claim and Game",
          },
          {
            title: "Step 3",
            description: "Share and earn more",
          },
        ]}
      />
      {current === 0 && <Step_1 />}
      {current === 1 && <Step_2 />}
      {current === 2 && <Step_3 />}
    </div>
  );
};
