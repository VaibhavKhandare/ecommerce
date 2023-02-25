import styled from "styled-components";
import { Slider } from "antd";

export const Box = styled.div`
  height: 77vh;
  font-family: "Roboto Slab", serif;
  /* display: grid;
  flex-direction: column; */
  * {
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
  @media screen and (max-width: 800px) {
    height: 100%;
  }
`;

export const Header = styled.div`
  font-family: "Roboto Slab", serif;
  font-weight: 550;
  font-size: 20px;
  text-transform: uppercase;
`;

export const ChildHeader = styled.div`
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  margin: 8px 0px;
`;

export const ChildContainer = styled.div`
  margin: 20px 0;
  overflow: auto;
  @media screen and (max-width: 800px) {
    max-height: 300px;
  }
`;
export const ChildBody = styled.div`
  max-height: 100px;
  overflow: auto;
  .m-l-8 {
    margin-left: 8px;
  }
  * {
    font-weight: 400;
    font-family: "Work Sans", sans-serif;
  }
  @media screen and (max-width: 800px) {
    max-height: 57px;
  }
`;

export const StyledSlider = styled(Slider)``;
