import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 80vh;
  display: grid;
  place-items: center;
  div {
    padding: 10px;
    border: 1px solid grey;
  }
`;

const User = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user") || "{}").name;
  return (
    <Container>
      <div>
        {userName}
        <br />
        <a
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Click to logout
        </a>
      </div>
    </Container>
  );
};

export default User;
