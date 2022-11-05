import { Table } from "antd";
import { useState, useEffect } from "react";
import { getAPI } from "../../../util/asyncAPIMethods";

const columns = [
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    render: (data) => {
      return <span style={{ textTransform: "uppercase" }}>{data}</span>;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (data) => {
      return (
        <>
          &#8377; {(data / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </>
      );
    },
  },
];

const Money = () => {
  const [moneyData, setMoneyData] = useState([]);
  useEffect(() => {
    getAPI("/buy/balance").then((res) => setMoneyData(res.pending));
  }, []);
  return <Table dataSource={moneyData} columns={columns} />;
};

export default Money;
