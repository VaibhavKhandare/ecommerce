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
import { categoriesData } from "../../store/apiSlice";
import { getAPI } from "../../util/asyncAPIMethods";
import { useNavigate } from "react-router-dom";

const Categories = ({ categoriesData, categoriesDataFn }) => {
  useEffect(() => {
    getAPI("http://localhost:4000/data/category").then((res) =>
      categoriesDataFn(res)
    );
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <TopTitle>TRENDING</TopTitle>
      <CategoryContainer>
        {categoriesData?.map((data, idx) => (
          <CategoryItem key={idx}>
            <Image src={data.imgUrl} alt="img" />
            <InfoContainer>
              <SpaceDiv />
              <Title>{data.title}</Title>
              <ShopButton
                onClick={() => {
                  navigate(data.link);
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
  const { categoriesData } = apiData;
  return { categoriesData };
};

export default connect(mapStateToProps, { categoriesDataFn: categoriesData })(
  Categories
);
