/** @format */

import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import FilaContract from "@/server/Web3";
import { columns } from "@/constant";
import { shallowEqual, useSelector } from "react-redux";

export default () => {
  //const [data, setData] = useState([]);
  const [current,setCurrent] = useState(1);
  // useEffect(() => {
  //   load();
  // }, []);
  

  // const load = () => {
  //   FilaContract.rank_Table("lottery").then((res: any) => {
  //     setData(res);
  //   });
  // };


   const { HasRewardedGamblerList } = useSelector(
    (state: any) => state?.home_rank,
    shallowEqual
   );
  
  const data = useMemo(() => {
    return HasRewardedGamblerList?.filter((v:any)=>v?.Account!== ('0x0000000000000000000000000000000000000000'))||[]
   },[HasRewardedGamblerList])

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
     
      columns={columns}
      dataSource={data}></Table>
  );
};
