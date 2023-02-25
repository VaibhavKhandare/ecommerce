import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getAPI } from "../../../util/asyncAPIMethods";

const columns = [
  {
    title: "ProductId",
    dataIndex: "productId",
    key: "productId",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (text ? "Dispatched" : "Action Required"),
  },
];

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getAPI("buy/all").then((res) => {
      setOrderData(res);
    });
  }, []);
  return <Table dataSource={orderData || []} columns={columns} />;
};

export default Order;
