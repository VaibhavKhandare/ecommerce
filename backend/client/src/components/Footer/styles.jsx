import styled from "styled-components";
import { COLOR } from "../../util/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-color: black;
  color: ${COLOR.LIGHT_WHITE};
`;

export const Text = styled.div`
  width: 85%;
`;

export const IconsContainer = styled.div`
  /* margin-inline: 30px; */
  width: 15%;
  display: flex;
  justify-content: space-around;
`;

export const Icons = styled.div`
  margin-inline: 5px;
  cursor: pointer;
  svg {
    height: 25px;
    width: 25px;
  }
`;
