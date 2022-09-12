import { Pagination, Slider } from "antd";
import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Header = styled.div`
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  margin-bottom: 15px;
`;
export const Footer = styled.div``;
export const MainContainer = styled.div`
  margin-inline: 30px;
`;

export const CustomPagination = styled(Pagination)`
  float: right;
  margin: 15px 0;
`;
export const FilterBox = styled.div`
  height: 77vh;
  font-family: "Roboto Slab", serif;
`;

export const FilterHeader = styled.div`
  font-family: "Roboto Slab", serif;
  font-weight: 550;
  font-size: 20px;
  text-transform: uppercase;
`;

export const FilterChildHeader = styled.div`
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
`;

export const FilterChildContainer = styled.div`
  margin: 20px 0;
`;
export const StyledSlider = styled(Slider)`
  margin-inline: 30px;
`;
