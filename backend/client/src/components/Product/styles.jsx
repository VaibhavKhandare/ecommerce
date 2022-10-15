import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-height: 80vh; */
  @media screen and (max-width: 800px) {
    flex-direction: column;
    /* max-height: 200vh; */
  }
`;

export const ImageContainer = styled.div`
  width: 60%;
  min-height: 200px;
  max-height: 780px;
  margin-right: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px !important;
  }
  &::-webkit-scrollbar-track-piece {
    margin: 10px 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00000027 !important;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    grid-template-columns: auto;
    max-height: 400px;
  }
`;

export const InfoContainer = styled.div`
  width: 40%;
  font-family: "Roboto Slab", serif;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin-top: 20px;
    margin-inline: 10px;
  }
`;

export const ImgContainer = styled.div`
  overflow: hidden;
  padding: 10px;
  width: 100%;
  box-shadow: ${SHADOW.MEDIUM_DARK_SHADOW};
`;

export const Image = styled.img`
  width: 100%;
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
  }
  transition-property: transform;
  transition-duration: 0.5s;
`;

export const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
  @media screen and (max-width: 800px) {
    font-size: 1rem;
    font-weight: 200;
  }
`;
export const Desc = styled.div`
  font-size: 1.2rem;
  line-height: 120%;
  color: ${COLOR.MEDIUM_GREY};
  width: 80%;
  @media screen and (max-width: 800px) {
    font-size: 0.9rem;
    width: 100%;
  }
`;
export const Brand = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;
export const Price = styled.span`
  color: ${COLOR.DARY_GREY};
  font-weight: 800;
  font-size: 2.5rem;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;
export const Rating = styled.div``;
export const ReviewContainer = styled.div``;
export const RatingContainer = styled.span`
  border: 1px solid ${COLOR.DARY_GREY};
  color: ${COLOR.DARY_GREY};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
`;

export const SimilarProductsContainer = styled.div`
  font-family: "Roboto Slab", serif;
`;
