import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto auto;
  grid-row-gap: 50px;
  .chartContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
