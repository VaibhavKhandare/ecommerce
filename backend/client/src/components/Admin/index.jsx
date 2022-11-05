import React from "react";
import Slider from "./Slider";
import PreviewSlider from "../Slider";
import PreviewCategory from "../Categories";
import Analysis from "./Analysis";
import Orders from "./Orders";
import Money from "./Money";
import TopProducts from "./TopProducts";
import AllProducts from "../AllProducts";
import styled from "styled-components";
import { Collapse, Tabs } from "antd";

export const Container = styled.div`
  min-height: 85vh;
`;
const items = [
  { label: "Analysis", key: "item-1", children: <Analysis /> },

  { label: "Orders", key: "item-2", children: <Orders /> },

  { label: "Money", key: "item-6", children: <Money /> },

  {
    label: "Slider",
    key: "item-3",
    children: (
      <>
        <Slider />
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel
            header={<h1 style={{ margin: 0 }}>Preview</h1>}
            key="1"
          >
            <PreviewSlider />
          </Collapse.Panel>
        </Collapse>
      </>
    ),
  },
  {
    label: "Top Products",
    key: "item-4",
    children: (
      <>
        <TopProducts />
        <br />
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel
            style={{ margin: 0 }}
            header={<h1 style={{ margin: 0 }}>Preview</h1>}
            key="1"
          >
            <PreviewCategory />
          </Collapse.Panel>
        </Collapse>
      </>
    ),
  },
  {
    label: "All Products",
    key: "item-5",
    children: <AllProducts />,
  },
];
const Admin = () => {
  return (
    <Container>
      <Tabs items={items} />;
    </Container>
  );
};

export default Admin;
