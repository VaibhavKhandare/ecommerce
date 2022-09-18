import React from "react";
import Slider from "./Slider";
import PreviewSlider from "../Slider";
import PreviewCategory from "../Categories";

import Analysis from "./Analysis";
import TopProducts from "./TopProducts";
import AllProducts from "../AllProducts";
import styled from "styled-components";
import { Collapse } from "antd";
export const Container = styled.div`
  min-height: 85vh;
  margin-inline: 30px;
`;
const Admin = () => {
  return (
    <Container>
      <Analysis />
      <Slider />
      <br />
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel
          header={<h1 style={{ margin: 0 }}>Slider Preview</h1>}
          key="1"
        >
          <PreviewSlider />
        </Collapse.Panel>
      </Collapse>
      <TopProducts />
      <br />
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel
          style={{ margin: 0 }}
          header={<h1 style={{ margin: 0 }}>Top Preview</h1>}
          key="1"
        >
          <PreviewCategory />
        </Collapse.Panel>
      </Collapse>
      <br />
      <AllProducts />
    </Container>
  );
};

export default Admin;
