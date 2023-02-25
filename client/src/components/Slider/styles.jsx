import styled, { keyframes } from "styled-components";
import { COLOR } from "../../util/theme";

const toAndFro = keyframes`
 0% {left:-100%}
 100% { left:100%}
`;

export const Container = styled.div`
  width: 100%;
  height: 60vh;
  margin-bottom: 15px;
  position: relative;
  color: ${COLOR.DARY_GREY};
  @media screen and (max-width: 800px) {
    height: 40vh;
  }
`;

export const Arrow = styled.span`
  display: ${(props) => !props.toShow && "none"};
  padding: 6px 10px;
  border-radius: 50%;
  background-color: lightgrey;
  font-size: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  z-index: 1;
  cursor: pointer;
  right: ${(props) => props.direction === "left" && "10px"};
  left: ${(props) => props.direction === "right" && "10px"};
  opacity: 1;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

export const InfoContainer = styled.div`
  font-family: "Roboto Slab", serif;
  flex: 1;
  text-transform: uppercase;
  margin-left: 10px;
`;

export const Slide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  transform: translateX(-${(props) => props.shift}%);
  transition-property: transform;
  transition-duration: 1s;
  cursor: pointer;
`;

export const Title = styled.span`
  font-size: 4rem;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
export const Discount = styled.span`
  display: inline-block;
  position: relative;
  font-size: 3rem;
  overflow: hidden;
  &:after {
    position: absolute;
    bottom: 10px;
    content: "";
    left: -100%;
    height: 100%;
    width: 100%;
    border-bottom-style: double;
    animation: ${toAndFro} 1s infinite;
  }
  @media screen and (max-width: 800px) {
    font-size: 1rem;
    &:after {
      bottom: 0px;
    }
  }
`;
export const ShopButton = styled.span`
  font-size: 2rem;
  padding: 5px 10px;
  border: 1px solid ${COLOR.DARY_GREY};
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

export const Dots = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props) =>
    props.isActive ? COLOR.MEDIUM_GREY : COLOR.LIGHT_GREY};
  margin-inline: 5px;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.MEDIUM_GREY};
  }
`;
