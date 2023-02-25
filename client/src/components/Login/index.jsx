import React, { useState } from "react";
import { message } from "antd";
import { Container, StyledTabs, StyledForm } from "./styles";
import { postAPI } from "../../util/asyncAPIMethods";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [err, setErr] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      userNameEmail: e.target.usernameOrEmail.value,
      password: e.target.password.value,
    };
    postAPI("/users/login", data).then((res) => {
      if (res?.status === 1) {
        message.info("Logged in Successfully");
        localStorage.setItem("user", JSON.stringify(res?.data));
        navigate(res.data.name != "admin" ? `/` : "/admin");
      } else {
        setErr("Invalid Credentials");
      }
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (e.target.reenterPassword.value !== e.target.password.value) {
      setErr("Password dont match");
      return;
    }
    const data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    postAPI("/users/create", data).then((res) => {
      if (res?.status === 1) {
        message.info("Account Created Successfully");
        localStorage.setItem("user", JSON.stringify(res?.data));
        navigate(`/`);
      } else {
        setErr(res.msg);
      }
    });
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Container>
      <StyledTabs defaultActiveKey="1">
        <StyledTabs.TabPane tab="Sign in" key="1">
          {auth && (
            <div>
              You are already signed in{" "}
              <a onClick={handleLogout}>click to logout</a>
            </div>
          )}
          <StyledForm onSubmit={handleLogin}>
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <br />
            {err ? <div className="err">{err}</div> : ""}
            <br />
            <input type="submit" value="Login" />
          </StyledForm>
        </StyledTabs.TabPane>
        <StyledTabs.TabPane tab="Sign Up" key="2">
          <StyledForm onSubmit={handleSignUp}>
            <input type="text" name="username" placeholder="Username" />
            <br />
            <input type="email" name="email" placeholder="Email Address" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <br />
            <input
              type="password"
              name="reenterPassword"
              placeholder="Reenter-Password"
            />
            <br />
            {err ? <div className="err">{err}</div> : ""}
            <br />

            <input type="submit" value="Sign Up" />
          </StyledForm>
        </StyledTabs.TabPane>
      </StyledTabs>
    </Container>
  );
};

export default Login;
