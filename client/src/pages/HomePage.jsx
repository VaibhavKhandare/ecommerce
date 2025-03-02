import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import AllProducts from "../components/AllProducts";
import Home from "./Home";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      {/* <TopProducts /> */}
      <AllProducts />
      <Home />
    </>
  );
};

export default HomePage;
