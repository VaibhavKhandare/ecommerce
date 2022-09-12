import styled from "styled-components";
import { COLOR } from "../../util/theme";
export const Container = styled.div`
  margin-inline: 30px;
`;

export const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const ProductImages = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 100px 100px;
`;
export const ProductIcons = styled.div`
  background-color: white;
  border-radius: 50%;
  margin-inline: 2px;
  padding: 5px;
  display: grid;
  place-items: center;
  cursor: pointer;
  border: 0.5px solid ${COLOR.LIGHT_GREY};
  svg {
    color: ${COLOR.DARY_GREY};
    height: 30px;
    width: 30px;
  }
`;
export const ContainerTitle = styled.div`
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  margin-bottom: 15px;
`;
export const ItemContainer = styled.div`
  position: relative;
  height: 30vh;
  width: 100%;
`;
export const IconContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.MEDIUM_LIGHT};
  top: -1;
  opacity: 0;
  &:hover {
    opacity: 1;
    top: 5;
  }
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
`;
