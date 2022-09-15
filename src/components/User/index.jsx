import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAPI } from "../../util/asyncAPIMethods";
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { cartData } from "../../store/apiSlice";
import { connect } from "react-redux";

const Container = styled.div`
  min-height: 80vh;
  display: grid;
  place-items: center;
  font-family: "Roboto Slab", serif;
  .container {
    padding: 10px;
    margin: 10px;
    min-height: 80vh;
    min-width: 80vw;
  }
  h1 {
    text-transform: capitalize;
  }
`;

const User = ({ cartData, cartDataFn }) => {
  // const [rows, setRows] = useState([]);
  const auth = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = auth.name;
  const navigate = useNavigate();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Link",
      dataIndex: "productId",
      key: "link",
      sorter: (a, b) => a.productId - b.productId,
      render: (text) => (
        <a
          onClick={() => {
            navigate(`/product/${text}`);
          }}
        >
          <LinkOutlined />
        </a>
      ),
    },
    {
      title: "Remove",
      dataIndex: "productId",
      key: "remove",
      render: (text) => (
        <a
          onClick={() => {
            getAPI("http://localhost:4000/cart/remove", {
              userId: auth._id,
              productId: text,
            }).then(() => {
              getAPI(`http://localhost:4000/user/${auth._id}`).then((res) => {
                cartDataFn(res.cart);
              });
            });
          }}
        >
          <DeleteOutlined twoToneColor="red" />
        </a>
      ),
    },
  ];
  useEffect(() => {
    getAPI(`http://localhost:4000/user/${auth._id}`).then((res) => {
      cartDataFn(res.cart);
    });
  }, []);

  return (
    <Container>
      <div className="container">
        <br />
        <h1>{userName},</h1>
        <h2>Your Shopping Cart</h2>
        <Table dataSource={cartData} columns={columns} />
        <br />
        <Button onClick={() => navigate("/")} type="primary">
          Go To HomePage
        </Button>
        &nbsp;
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Click to logout
        </Button>
        <br />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const cartData = state?.apiData?.cartData;
  return { cartData };
};
export default connect(mapStateToProps, { cartDataFn: cartData })(User);
