import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;
const NoDataFound = () => {
  return (
    <Container>
      <img
        height="340px"
        src="https://cdn-icons-png.flaticon.com/512/1665/1665715.png"
        alt="no data found"
      />
      <h1>No Data found</h1>
    </Container>
  );
};

export default NoDataFound;
