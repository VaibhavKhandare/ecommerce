import styled from "styled-components";
import { Tabs } from "antd";
import { COLOR, SHADOW } from "../../util/theme";

export const Container = styled.div`
  width: 100%;
  height: 87vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledTabs = styled(Tabs)`
  box-shadow: ${SHADOW.DARK_SHADOW};
  padding: 35px;
  border-radius: 10px;
`;
export const StyledForm = styled.form`
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
    width: 100%;
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
