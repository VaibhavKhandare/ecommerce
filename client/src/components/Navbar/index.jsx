import React, { useEffect } from "react";
import { Badge, Button } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavbarContainer, Right, Left, Header, UserName } from "./styles";
import { useNavigate } from "react-router-dom";
import { cartData } from "../../store/apiSlice";
import { connect } from "react-redux";
import { getAPI } from "../../util/asyncAPIMethods";

const Navbar = ({ cartData, cartDataFn }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData?.name || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (userData?.name && userData._id) {
      getAPI(`/user/${userData._id}`).then((res) => cartDataFn(res?.cart));
    }
  }, [userName]);
  return (
    <NavbarContainer>
      <Right>
        <Header
          onClick={() => {
            navigate("/");
          }}
        >
          FastWeb
        </Header>
        {userName === "admin" && (
          <Button
            type="primary"
            onClick={() => {
              navigate("/admin");
            }}
          >
            View Dashboard
          </Button>
        )}
      </Right>
      <Left
        onClick={() => {
          navigate("/user");
        }}
      >
        {/* <Input.Search placeholder="Search Item" /> */}
        <UserOutlined style={{ fontSize: "20px" }} />
        <UserName>{userName ? <>Hey {userName}</> : "Sign In"}</UserName>
        <Badge count={cartData?.length} size="small" showZero>
          <ShoppingCartOutlined color="orange" style={{ fontSize: "20px" }} />
        </Badge>
      </Left>
    </NavbarContainer>
  );
};

const mapStateToProps = (state) => {
  const cartData = state?.apiData?.cartData;
  return { cartData };
};
export default connect(mapStateToProps, { cartDataFn: cartData })(Navbar);
