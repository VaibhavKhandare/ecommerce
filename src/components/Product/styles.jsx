import styled from "styled-components";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  margin: 10px 30px;
  display: flex;
  justify-content: center;
  min-height: 80vh;
`;

export const ImageContainer = styled.div`
  width: 60%;
  min-height: 200px;
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const InfoContainer = styled.div`
  width: 40%;
  font-family: "Roboto Slab", serif;
  padding: 120px 20px;
  padding-left: 20px;
`;

export const Image = styled.img`
  padding: 10px;
  width: 100%;
  box-shadow: ${SHADOW.MEDIUM_DARK_SHADOW};
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
  }
  transition-property: transform;
  transition-duration: 0.5s;
  overflow: hidden;
`;

export const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`;
export const Desc = styled.div`
  font-size: 1.2rem;
  line-height: 120%;
  color: ${COLOR.MEDIUM_GREY};
  width: 80%;
`;
export const Brand = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
`;
export const Price = styled.span`
  color: ${COLOR.DARY_GREY};
  font-weight: 800;
  font-size: 2.5rem;
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

  margin: 30px;
`;
