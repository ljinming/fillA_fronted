/** @format */

import { Pagination, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import FilaContract from "@/server/Web3";
import { columns } from "@/constant";
import { shallowEqual, useSelector } from "react-redux";

export default () => {
  const [current,setCurrent] = useState(1);



   const { HasRewardedGamblerList } = useSelector(
    (state: any) => state?.home_rank,
    shallowEqual
   );
  
  const data = useMemo(() => {
    return HasRewardedGamblerList;
   },[HasRewardedGamblerList])

  return (
        <div>
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
              total:HasRewardedGamblerList?.length||0,
              onChange: (cur) => {
                setCurrent(cur) 
              },
            }  
      }
     
      columns={columns(current) ||[]}
      dataSource={HasRewardedGamblerList}></Table>

    </div>
  );
};
