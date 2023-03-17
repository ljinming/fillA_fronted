/** @format */

import { Table } from "antd";
import { useEffect, useState } from "react";
import FilaContract from "@/server/Web3";
import { columns } from "@/constant";
export default () => {
  const [data, setData] = useState([]);
  const [current,setCurrent] = useState(1);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    FilaContract.rank_Table("referral").then((res: any) => {
      setData(res);
    });
  };

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
      dataSource={data}
    />
  );
};
