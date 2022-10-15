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
    height: 100%;
    width: 100%;
    max-width: 786px;
    max-height: 526px;
  }
  .line {
    height: 20px;
    width: 80%;
    border-top: 1px solid black;
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
  /* table {
    font-family: "Work Sans", sans-serif;
  } */
  .donutChart {
    font-family: "Work Sans", sans-serif;
    text-transform: capitalize;
    height: 100% !important;
    width: 100% !important;
    .donutChart-innertext {
      font-family: "Roboto Slab", serif;
      font-size: 2rem;
    }
    .donutChart-legend {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: auto;
  }
`;
