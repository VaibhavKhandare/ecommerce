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
  .add-card {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      font-size: 80px;
      padding: 0px 41px;
      border: 1px dotted black;
      border-radius: 50%;
      background-color: #0000001c;
      color: #797979;
      cursor: pointer;
    }
    .text {
      margin-top: 40px;
      font-size: 30px;
      font-family: "Roboto Slab", serif;
    }
  }
`;
export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  input {
    border: none;
    border: 1px solid lightgray;
    box-shadow: none;
    border-radius: 5px;
    margin: 10px 0px;
    &:focus {
      border: none;
      border: 1px solid ${COLOR.BLUE};
      outline: none;
    }
  }
  input[type="submit"] {
    height: 100%;
    width: 269px;
    z-index: 1;
    position: relative;
    background: none;
    border: none;
    color: #fff;
    background-color: ${COLOR.BLUE};
    padding-left: 0;
    border-radius: 15px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
  .err {
    color: red;
    font-size: 16px;
    text-transform: capitalize;
  }
`;

export const CardContainer = styled.div`
  /* height: 470.8px; */
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
  position: relative;
  .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    top: -1;
    opacity: 0;
    &:hover {
      opacity: 1;
      top: 5;
    }
    transition-property: opacity;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
    .icon-wrapper {
      background-color: white;
      border-radius: 50%;
      margin-inline: 2px;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border: 0.5px solid ${COLOR.LIGHT_GREY};
      &:hover {
        background-color: ${COLOR.LIGHT_GREY};
      }
      svg {
        color: ${COLOR.DARY_GREY};
        height: 30px;
        width: 30px;
        &:hover {
          color: white;
        }
      }
    }
  }
  .info {
    position: relative;
    height: 70px;
    ul {
      position: absolute;
      height: 100%;
      width: 100%;
      &:hover {
        color: white;
      }
    }
  }

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
