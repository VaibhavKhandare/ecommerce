import React from "react";
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

const Categories = ({ categoriesData }) => {
  return (
    <Container>
      <TopTitle>TRENDING</TopTitle>
      <CategoryContainer>
        {categoriesData.map((data) => (
          <CategoryItem>
            <Image src={data.img} alt="Container" />
            <InfoContainer>
              <SpaceDiv />
              <Title>{data.title}</Title>
              <ShopButton>SHOP NOW</ShopButton>
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

export default connect(mapStateToProps, {})(Categories);
