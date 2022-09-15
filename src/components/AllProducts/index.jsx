import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAPI } from "../../util/asyncAPIMethods";
import { Checkbox, Input, Layout } from "antd";
import { Loader } from "../../util/loader";
import {
  Header,
  Footer,
  MainContainer,
  CustomPagination,
  FilterBox,
  FilterHeader,
  FilterChildContainer,
  FilterChildHeader,
  StyledSlider,
} from "./styles";

import { cardsData } from "../../store/apiSlice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import NoDataFound from "../../util/NoDataFound";
import { CardsContainer } from "../common";

var CategoryFilter = [];
var BrandFilter = [];
var ColorFilter = [];
var priceRange = [0, 10000];

const Products = ({ cardsDataFn, data = [], totalPage, pageNo = 1 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // let url = new URL(window.location.search);
    // console.log("url", window.location.search);
    const params = new URLSearchParams(window.location.search);
    // const params = new URLSearchParams(window.loca tion.href);
    // console.log(Object.fromEntries(Array(...params.searchParams.entries())));
    // console.log("params", ...params.entries());
    // console.log("window.location,href", window.location.params);
    getAPI("http://localhost:4000/search/", params.entries()).then((data) => {
      setIsLoading(false);
      cardsDataFn(data);
    });
  }, []);
  const paginationFn = (pageNo = 1) => {
    setIsLoading(true);
    getAPI("http://localhost:4000/search/", {
      price: priceRange,
      search: searchValue.trim(),
      pageNo: pageNo,
      category: CategoryFilter,
      brand: BrandFilter,
      color: ColorFilter,
    }).then((data) => {
      setIsLoading(false);
      cardsDataFn(data);
    });
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a onClick={() => paginationFn(pageNo - 1)}>
          <LeftOutlined /> Previous
        </a>
      );
    }
    if (type === "next") {
      return (
        <a onClick={() => paginationFn(pageNo + 1)}>
          Next
          <RightOutlined />
        </a>
      );
    }
    return originalElement;
  };

  const checkBoxValueFn = (e) => {
    if (e.target.checked) {
      if (CategoryFilter.indexOf(e.target.value) === -1) {
        CategoryFilter.push(e.target.value);
      }
    } else {
      if (CategoryFilter.indexOf(e.target.value) !== -1) {
        CategoryFilter.splice(CategoryFilter.indexOf(e.target.value), 1);
      }
    }
    paginationFn();
  };

  const BrandFn = (e) => {
    if (e.target.checked) {
      if (BrandFilter.indexOf(e.target.value) === -1) {
        BrandFilter.push(e.target.value);
      }
    } else {
      if (BrandFilter.indexOf(e.target.value) !== -1) {
        BrandFilter.splice(BrandFilter.indexOf(e.target.value), 1);
      }
    }
    paginationFn();
  };
  const ColorFn = (e) => {
    if (e.target.checked) {
      if (ColorFilter.indexOf(e.target.value) === -1) {
        ColorFilter.push(e.target.value);
      }
    } else {
      if (ColorFilter.indexOf(e.target.value) !== -1) {
        ColorFilter.splice(ColorFilter.indexOf(e.target.value), 1);
      }
    }
    paginationFn();
  };

  return (
    <>
      <MainContainer>
        <Header>Products</Header>
        <Layout>
          <Layout.Sider breakpoint="md" width="300px" theme="light">
            <FilterBox>
              <FilterHeader>Filters</FilterHeader>
              <br />
              <Input.Search
                placeholder="Search Name, Brand...."
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={() => {
                  paginationFn();
                }}
                onPressEnter={() => {
                  paginationFn();
                }}
              ></Input.Search>
              <br />
              <br />
              <FilterChildHeader>Price</FilterChildHeader>
              <StyledSlider
                range={{
                  draggableTrack: true,
                }}
                tooltip={{
                  open: true,
                  placement: "bottom",
                }}
                marks={{
                  0: "0 Rs",
                  20000: "20000",
                }}
                defaultValue={[100, 10000]}
                max={20000}
                step={100}
                draggableTrack
                onAfterChange={(e) => {
                  priceRange = e;
                  paginationFn();
                }}
              />
              <FilterChildContainer>
                <FilterChildHeader>Categories</FilterChildHeader>
                <Checkbox onChange={checkBoxValueFn} value=" shirt">
                  Shirt
                </Checkbox>
                <br />
                <Checkbox onChange={checkBoxValueFn} value="T-shirt">
                  T-shirt
                </Checkbox>
                <br />
                <Checkbox onChange={checkBoxValueFn} value="kurta">
                  Kurta
                </Checkbox>
                <br />
                <Checkbox onChange={checkBoxValueFn} value="jeans">
                  Jeans
                </Checkbox>
                <br />
                <Checkbox onChange={checkBoxValueFn} value="bag">
                  Bag
                </Checkbox>
              </FilterChildContainer>
              <FilterChildContainer>
                <FilterChildHeader>Brand</FilterChildHeader>
                <Checkbox onChange={BrandFn} value="Parx">
                  Parx
                </Checkbox>
                <br />
                <Checkbox onChange={BrandFn} value="SPYKAR">
                  SPYKAR
                </Checkbox>
                <br />
              </FilterChildContainer>
              <FilterChildContainer>
                <FilterChildHeader>Color</FilterChildHeader>
                <Checkbox onChange={ColorFn} value="Black">
                  Black
                </Checkbox>
                <br />
                <Checkbox onChange={ColorFn} value="Pink">
                  Pink
                </Checkbox>
                <br />
              </FilterChildContainer>
            </FilterBox>
          </Layout.Sider>
          <Layout.Content>
            {isLoading ? (
              <Loader />
            ) : data.length ? (
              <CardsContainer data={data} />
            ) : (
              <NoDataFound></NoDataFound>
            )}
          </Layout.Content>
        </Layout>
        <Footer>
          <CustomPagination
            current={pageNo}
            itemRender={itemRender}
            showQuickJumper
            total={totalPage}
            pageSize="20"
            onChange={paginationFn}
            showSizeChanger={false}
          />
        </Footer>
      </MainContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  const { apiData } = state;
  const { cardsData } = apiData;
  const { data, totalPage, pageNo } = cardsData;
  return { data, totalPage, pageNo };
};

export default connect(mapStateToProps, { cardsDataFn: cardsData })(Products);
