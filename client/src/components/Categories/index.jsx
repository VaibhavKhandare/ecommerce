import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  TopTitle,
  CategoryItem,
  Title,
  CategoryContainer,
  Image,
  ShopButton,
  InfoContainer,
  SpaceDiv,
} from "./styles";
import { categoryData } from "../../store/apiSlice";
import { getAPI } from "../../util/asyncAPIMethods";
import { useNavigate } from "react-router-dom";

const Categories = ({ categoryData = [], categoryDataFn }) => {
  useEffect(() => {
    getAPI("/data/category").then((res) => categoryDataFn(res));
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <TopTitle>TRENDING</TopTitle>
      <CategoryContainer>
        {(categoryData || []).map((data = {}, idx) => (
          <CategoryItem key={idx}>
            <Image src={data.imgUrl} alt="img" />
            <InfoContainer>
              <SpaceDiv />
              <Title>{data.title}</Title>
              <ShopButton
                onClick={() => {
                  navigate(`/product/?${data.link}`);
                }}
              >
                SHOP NOW
              </ShopButton>
            </InfoContainer>
          </CategoryItem>
        ))}
      </CategoryContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { apiData } = state;
  const { categoryData = [] } = apiData;
  return { categoryData };
};

export default connect(mapStateToProps, { categoryDataFn: categoryData })(
  Categories
);
