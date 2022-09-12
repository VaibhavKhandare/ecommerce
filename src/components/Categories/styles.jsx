import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
`;
export const TopTitle = styled.div`
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  margin-bottom: 15px;
  margin-left: 30px;
`;
export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30vw;
`;
export const CategoryItem = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 30px;
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
`;

export const ShopButton = styled.span`
  font-size: 2rem;
  padding: 5px 10px;
  color: ${COLOR.DARY_GREY};
  background-color: ${COLOR.LIGHT_WHITE};
`;

export const InfoContainer = styled.div`
  position: absolute;
  top: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
