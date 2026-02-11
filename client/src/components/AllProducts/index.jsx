import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAPI } from "../../util/asyncAPIMethods";
import { Layout } from "antd";
import { Loader } from "../../util/loader";
import { Header, Footer, MainContainer, CustomPagination } from "./styles";
import { cardsData } from "../../store/apiSlice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import NoDataFound from "../../util/NoDataFound";
import { CardsContainer } from "../common";
import Filter from "../Filter";

const Products = ({ cardsDataFn, data = [], totalPage, pageNo = 1 }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  // const [refresh, setIsRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filterState, setFilterStateFn] = useState({
    priceRange: [0, 20000],
    category: [],
    brand: [],
    color: [],
  });
  useEffect(() => {
    if (window.location.href.indexOf("admin") !== -1) setIsAdmin(true);
    const params = new URLSearchParams(window.location.search);
    getAPI("/search/", params.entries()).then((data) => {
      setIsLoading(false);
      cardsDataFn(data);
    });
  }, []);

  const paginationFn = (pageNo = 1) => {
    const search = searchValue.trim();
    setIsLoading(true);
    getAPI("/search/", {
      search,
      pageNo: pageNo,
      price: filterState.priceRange,
      category: filterState.category,
      brand: filterState.brand,
      color: filterState.color,
    }).then((data) => {
      setIsLoading(false);
      cardsDataFn(data);
    });
  };

  // useEffect(() => {
  //   paginationFn();
  // }, [refresh]);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a onClick={() => paginationFn(pageNo - 1)}>
          <LeftOutlined />
          <span className="iconText">Previous</span>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a onClick={() => paginationFn(pageNo + 1)}>
          <span className="iconText">Next</span>
          <RightOutlined />
        </a>
      );
    }
    return originalElement;
  };

  return (
    <>
      <MainContainer>
        <Header>Products</Header>
        <Layout>
          <Layout.Sider
            breakpoint="md"
            width="300px"
            theme="light"
            collapsedWidth="0"
          >
            <Filter
              setSearchValue={setSearchValue}
              paginationFn={paginationFn}
              setFilterStateFn={setFilterStateFn}
              filterState={filterState}
            />
          </Layout.Sider>
          <Layout.Content>
            {isLoading ? (
              <Loader />
            ) : data.length ? (
              <CardsContainer
                data={data}
                isAdmin={isAdmin}
                paginationFn={paginationFn}
              />
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
  const { cardsData = {}, filterData = {} } = apiData;
  const { data, totalPage, pageNo } = cardsData;
  return { data, totalPage, pageNo };
};

export default connect(mapStateToProps, { cardsDataFn: cardsData })(Products);
