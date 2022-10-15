import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  @media screen and (max-width: 800px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
export const TopTitle = styled.div`
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
export const CategoryItem = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 10px;
  height: 30vw;
  @media screen and (max-width: 800px) {
    height: 90vw;
    margin-top: 10px;
  }
`;
export const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const SpaceDiv = styled.div`
  height: 18vw;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-shadow: ${SHADOW.DARK_SHADOW};
  @media screen and (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

export const ShopButton = styled.span`
  font-size: 2rem;
  padding: 5px 10px;
  color: ${COLOR.DARY_GREY};
  background-color: ${COLOR.LIGHT_WHITE};
  cursor: pointer;
  &:hover {
    background-color: white;
  }
  transition-property: background-color;
  transition-duration: 0.5s;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
    padding: 2.5px 5px;
  }
`;

export const InfoContainer = styled.div`
  position: absolute;
  top: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
