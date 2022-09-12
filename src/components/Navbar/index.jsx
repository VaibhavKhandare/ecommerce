import React from "react";
import { Input } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavbarContainer, Right, Left, Header, UserName } from "./styles";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userName = JSON.parse(localStorage.getItem("user") || "{}")?.name || "";
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Right>
        <Header>LAMA</Header>
      </Right>
      <Left>
        <Input.Search placeholder="Search Item" />
        <UserOutlined
          onClick={() => {
            navigate("/user");
          }}
          style={{ fontSize: "20px" }}
        />
        <UserName>Hey {userName}</UserName>
        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
      </Left>
    </NavbarContainer>
  );
};

export default Navbar;
