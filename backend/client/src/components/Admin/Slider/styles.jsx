import styled from "styled-components";
import { SHADOW, COLOR } from "../../../util/theme";

export const Container = styled.div``;

export const SliderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .container {
    padding: 5px;
    margin: 5px;
    box-shadow: ${SHADOW.DARK_SHADOW};
    border-radius: 5px;
  }
  .add-card {
    border-radius: 5px;
    box-shadow: ${SHADOW.DARK_SHADOW};
    cursor: pointer;
    margin: 5px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    background-color: #fafafa;
    border: 0.5px dotted grey;
  }
  img {
    height: 350px;
  }
  .icons {
    position: absolute;
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
    height: 100px;
    ul {
      position: absolute;
      height: 100%;
      width: 100%;
      &:hover {
        color: white;
      }
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
