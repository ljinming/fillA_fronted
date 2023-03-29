/** @format */

import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import FilaContract from "@/server/Web3";
import { columns } from "@/constant";
import { shallowEqual, useSelector } from "react-redux";
import CompoundedSpace from "antd/es/space";
export default () => {
  const [current, setCurrent] = useState(1);

   const { HasRewardedInviterList } = useSelector(
    (state: any) => state?.home_rank,
    shallowEqual
   );
  
  const data = useMemo(() => {
    return HasRewardedInviterList?.filter((v: any) => v?.Account !== ('0x0000000000000000000000000000000000000000')) || []
   },[HasRewardedInviterList])
   
  return (
    <Table
       pagination={
          {
              position: ["bottomRight"],
              current: current,
              showQuickJumper: false,
              pageSize: 5,
              showSizeChanger: false,
              total:data.length,
              onChange: (cur) => {
                setCurrent(cur)
              },
            }
         
      }
      columns={columns(current)}
      dataSource={data}
    />
  );
};
