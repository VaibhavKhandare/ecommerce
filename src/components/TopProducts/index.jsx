import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Image,
  ProductImages,
  ProductIcons,
  ContainerTitle,
  ItemContainer,
  IconContainer,
} from "./styles";
import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Icons = () => {
  return (
    <>
      <IconContainer>
        <ProductIcons>
          <HeartOutlined />
        </ProductIcons>
        <ProductIcons>
          <SearchOutlined />
        </ProductIcons>
        <ProductIcons>
          <ShoppingCartOutlined />
        </ProductIcons>
      </IconContainer>
    </>
  );
};

const TopProducts = ({ productsData }) => {
  return (
    <Container>
      <ContainerTitle>Top Buys</ContainerTitle>
      <ProductImages>
        {productsData?.map((data, idx) => (
          <ItemContainer key={idx}>
            <Image src={data.img} alt="products" />
            <Icons />
          </ItemContainer>
        ))}
      </ProductImages>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { apiData } = state;
  const { productsData } = apiData;
  return { productsData };
};

export default connect(mapStateToProps, {})(TopProducts);
