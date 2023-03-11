/** @format */

import { Table } from "antd";
import { useEffect, useState } from "react";
import FilaContract from "@/server/Web3";
import { columns } from "@/constant";

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    FilaContract.rank_Table("lottery").then((res: any) => {
      setData(res);
    });
  };

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data.length > 10 ? data.slice(0, 10) : data}></Table>
  );
};
