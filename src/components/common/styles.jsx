import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  background-color: white;
  padding: 10px;
  height: 77vh;
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
`;

export const CardContainer = styled.div`
  height: 470.8px;
  width: 100%;
  box-shadow: ${SHADOW.MEDIUM_DARK_SHADOW};
  max-width: 300px;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 20%;
  padding: 5px;
  * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const Brand = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  font-size: 16px;
`;
export const Desc = styled.div``;
export const Price = styled.div`
  float: right;
  font-weight: 600;
  font-size: 14px;
`;

export const CenterColumn = styled.div`
  display: flex;
  justify-content: center;
`;
export const CardImageContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: row;
  transform: translateX(-${(props) => props.shift * 100}%);
  transition-property: transform;
  transition-duration: 1s;
  cursor: pointer;
`;

export const CardImageOverflow = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
