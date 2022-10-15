import { Pagination } from "antd";
import styled from "styled-components";

export const Header = styled.div`
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  margin-bottom: 15px;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
export const Footer = styled.div``;
export const MainContainer = styled.div``;

export const CustomPagination = styled(Pagination)`
  float: right;
  margin: 15px 0;
  .iconText {
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`;
