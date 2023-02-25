import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import AllProducts from "../components/AllProducts";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      {/* <TopProducts /> */}
      <AllProducts />
    </>
  );
};

export default HomePage;
