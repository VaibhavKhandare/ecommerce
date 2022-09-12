import React, { useEffect } from "react";
import {
  Container,
  ImageContainer,
  InfoContainer,
  Image,
  Name,
  Desc,
  Brand,
  Price,
  ReviewContainer,
  RatingContainer,
  SimilarProductsContainer,
} from "./styles";
import { StarFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { cardData } from "../../store/apiSlice";
import { getAPI } from "../../util/asyncAPIMethods";
import { useState } from "react";
import { CardsContainer } from "../common";

const Stars = ({ rating, reviewLength }) => (
  <RatingContainer>
    {rating}
    <StarFilled style={{ color: "cornflowerblue" }} /> | {reviewLength}: Reviews
  </RatingContainer>
);

const Product = ({ cardData = {}, cardDataFn }) => {
  const [similarData, setSimilarData] = useState([]);
  useEffect(() => {
    getAPI("http://localhost:4000" + window.location.pathname).then((data) => {
      cardDataFn(data);
      getAPI("http://localhost:4000/search", { brand: data.brand }).then(
        (sdata) => {
          setSimilarData(sdata?.data);
        }
      );
    });
  }, []);
  const { images = [] } = cardData;
  return (
    <>
      <Container>
        <ImageContainer>
          {images.map((val) => (
            <Image src={val} />
          ))}
        </ImageContainer>
        <InfoContainer>
          <Brand>{cardData.brand}</Brand>
          <Name>{cardData.name}</Name>
          <Price>Rs {cardData.price}/-</Price>&nbsp;&nbsp;
          <hr />
          <br />
          <Stars
            rating={cardData.rating}
            reviewLength={(cardData.review || []).length}
          />
          <br />
          <br />
          <Desc>{cardData.description}</Desc>
          <br />
          <ReviewContainer>
            Reviews
            {cardData.reviews?.map((val) => val)}
          </ReviewContainer>
        </InfoContainer>
      </Container>
      <SimilarProductsContainer>
        <h1>Similar Products</h1>
        <CardsContainer data={similarData}></CardsContainer>
      </SimilarProductsContainer>
    </>
  );
};
const mapStateToProps = (state) => {
  return { cardData: state?.apiData?.cardData };
};

export default connect(mapStateToProps, { cardDataFn: cardData })(Product);
