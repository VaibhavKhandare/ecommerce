import React, { useEffect } from "react";
import {
  Container,
  ImageContainer,
  ImgContainer,
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
import { cardData, cartData } from "../../store/apiSlice";
import { getAPI } from "../../util/asyncAPIMethods";
import { useState } from "react";
import { CardsContainer } from "../common";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Stars = ({ rating, reviewLength }) => (
  <RatingContainer>
    {rating}
    <StarFilled style={{ color: "cornflowerblue" }} /> | {reviewLength}: Reviews
  </RatingContainer>
);

const Product = ({ cardData = {}, cartDataFn, cardDataFn }) => {
  const auth = JSON.parse(localStorage.getItem("user") || "{}");
  const [similarData, setSimilarData] = useState([]);
  const navigate = useNavigate();
  const [url, setUrl] = useState(window.location.pathname);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getAPI("http://localhost:4000" + url).then((data) => {
      cardDataFn(data);
      if (auth) {
        getAPI(`http://localhost:4000/user/${auth._id}`).then((res) => {
          const { cart = [] } = res;
          const index = cart
            .map((object) => object.productId)
            .indexOf(data._id);
          if (index !== -1) {
            setIsAlreadyInCart(1);
          }
        });
      }
      getAPI("http://localhost:4000/search", { brand: data.brand }).then(
        (sdata) => {
          setSimilarData(sdata?.data);
        }
      );
    });
  }, [url]);
  const handleCartAdd = (data) => {
    if (!auth) {
      navigate("/login");
    } else {
      getAPI("http://localhost:4000/cart/add", {
        userId: auth._id,
        productId: cardData._id,
        name: cardData.name,
        price: cardData.price,
      }).then((res) => {
        if (res.status) {
          message.info("Successfully Added to Cart");
          setIsAlreadyInCart(1);
          console.log("res.data", res.data);
          cartDataFn(res.data);
        }
      });
    }
  };
  const handleCartRemove = (data) => {
    getAPI("http://localhost:4000/cart/remove", {
      userId: auth._id,
      productId: cardData._id,
    }).then((res) => {
      if (res.status) {
        message.info("Removed from Cart");
        setIsAlreadyInCart(0);
        cartDataFn(res.data);
        console.log("res.data", res);
      }
    });
  };

  const { images = [] } = cardData;
  return (
    <>
      <Container>
        <ImageContainer>
          {images.map((val, idx) => (
            <ImgContainer key={idx}>
              <Image src={val} />
            </ImgContainer>
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
          {!isAlreadyInCart ? (
            <Button type="primary" size="large" onClick={handleCartAdd}>
              Add To Cart
            </Button>
          ) : (
            <Button size="large" onClick={handleCartRemove}>
              Remove From Cart
            </Button>
          )}
          <br />
          <br />
          <Desc>{cardData.description}</Desc>
          <br />
        </InfoContainer>
      </Container>
      <SimilarProductsContainer>
        <h1>Similar Products</h1>
        <CardsContainer data={similarData} setUrl={setUrl}></CardsContainer>
      </SimilarProductsContainer>
    </>
  );
};
const mapStateToProps = (state) => {
  return { cardData: state?.apiData?.cardData };
};

export default connect(mapStateToProps, {
  cardDataFn: cardData,
  cartDataFn: cartData,
})(Product);
