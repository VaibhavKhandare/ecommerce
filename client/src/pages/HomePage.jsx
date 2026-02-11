import React from "react";
import AllProducts from "../components/AllProducts";
import Categories from "../components/Categories";
import Slider from "../components/Slider";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      <AllProducts />
    </>
  );
};

export default HomePage;
