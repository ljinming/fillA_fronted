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
            className="custom_table_container"
     pagination={
        {
            className:'custom_table_container_pagination',
              position: ["bottomRight"],
              current: current,
              showQuickJumper: false,
              pageSize: 10,
              showSizeChanger: false,
              total:data?.length||0,
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
