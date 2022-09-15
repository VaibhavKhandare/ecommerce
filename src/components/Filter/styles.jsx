import styled from "styled-components";
import { Slider } from "antd";
import { COLOR } from "../../util/theme";

export const Box = styled.div`
  height: 77vh;
  font-family: "Roboto Slab", serif;
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
`;
export const ChildBody = styled.div`
  max-height: 150px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLOR.LIGHT_GREY};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${COLOR.MEDIUM_GREY};
    border-radius: 10px;
  }
  .m-l-8 {
    margin-left: 8px;
  }
  * {
    font-weight: 400;
    font-family: "Work Sans", sans-serif;
  }
`;

export const StyledSlider = styled(Slider)`
  margin-inline: 30px;
`;
