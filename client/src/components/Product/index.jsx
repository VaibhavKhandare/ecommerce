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
  RatingContainer,
  SimilarProductsContainer,
} from "./styles";
import { StarFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { cardData, cartData } from "../../store/apiSlice";
import { getAPI, postAPI } from "../../util/asyncAPIMethods";
import { clearPreference, getPreference, setPreference } from "../../util/preferenceMemory";
import { useState } from "react";
import { CardsContainer } from "../common";
import { Button, Input, message, Tag } from "antd";
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
  const [preference, setPreferenceState] = useState(() => getPreference());
  const [preferenceInput, setPreferenceInput] = useState("");
  const navigate = useNavigate();
  const [url, setUrl] = useState(window.location.pathname);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(0);
  useEffect(() => {
    setPreferenceState(getPreference());
  }, [url]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getAPI(url).then((data) => {
      cardDataFn(data);
      if (auth._id) {
        getAPI(`/user/${auth._id}`).then((res) => {
          const { cart = [] } = res;
          const index = cart
            .map((object) => object.productId)
            .indexOf(data._id);
          if (index !== -1) {
            setIsAlreadyInCart(1);
          } else {
            setIsAlreadyInCart(0);
          }
        });
      }
      const id = url.split("/").pop();
      const pref = getPreference();
      const similarParams = pref ? { preference: pref } : {};
      getAPI(`/product/${id}/similar`, similarParams).then((sdata) => {
        setSimilarData(Array.isArray(sdata) ? sdata : sdata?.data || []);
      });
    });
  }, [url]);

  const handleSavePreference = () => {
    const val = (preferenceInput || "").trim();
    if (val) {
      setPreference(val);
      setPreferenceState(val);
      setPreferenceInput("");
      message.success("Preference saved. Similar products will use it.");
      const id = url.split("/").pop();
      getAPI(`/product/${id}/similar`, { preference: val }).then((sdata) => {
        setSimilarData(Array.isArray(sdata) ? sdata : sdata?.data || []);
      });
    }
  };

  const handleClearPreference = () => {
    clearPreference();
    setPreferenceState(null);
    const id = url.split("/").pop();
    getAPI(`/product/${id}/similar`, {}).then((sdata) => {
      setSimilarData(Array.isArray(sdata) ? sdata : sdata?.data || []);
    });
    message.info("Preference cleared.");
  };
  const handleCartAdd = (data) => {
    if (!auth._id) {
      navigate("/login");
    } else {
      getAPI("/cart/add", {
        userId: auth._id,
        productId: cardData._id,
        name: cardData.name,
        price: cardData.price,
      }).then((res) => {
        if (res.status) {
          message.info("Successfully Added to Cart");
          setIsAlreadyInCart(1);
          cartDataFn(res.data);
        }
      });
    }
  };
  const handleCartRemove = (data) => {
    getAPI("/cart/remove", {
      userId: auth._id,
      productId: cardData._id,
    }).then((res) => {
      if (res.status) {
        message.info("Removed from Cart");
        setIsAlreadyInCart(0);
        cartDataFn(res.data);
      }
    });
  };
  const handleBuy = () => {
    if (auth._id) {
      getAPI(url).then((data = {}) => {
        if (data.items > 0) {
          const addBuy = {
            productId: url.split("/")[2],
            userId: auth._id,
            status: 0,
            name: cardData?.name,
          };
          postAPI("/buy/add", addBuy).then((res) => {
            if (res.status) {
              setIsAlreadyInCart(0);
              cartDataFn(res.cart);
            }
          });
          postAPI("/buy/checkout", {
            items: [
              {
                name: data.name,
                price: data.price,
                quantity: 1,
              },
            ],
          }).then((res) => {
            window.open(res.url, "_self");
          });
        }
      });
    } else {
      navigate("/login");
    }
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
          &nbsp;
          <Button type="primary" size="large" onClick={handleBuy}>
            Buy Now
          </Button>
          <br />
          <br />
          <Desc>{cardData.description}</Desc>
          <br />
        </InfoContainer>
      </Container>
      <SimilarProductsContainer>
        <h1>Similar Products</h1>
        <div style={{ marginBottom: 12 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>
            Preference memory: personalize recommendations (e.g. &quot;casual cotton under 2000&quot;).
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Input
              placeholder="e.g. casual, under 2000, cotton"
              value={preferenceInput}
              onChange={(e) => setPreferenceInput(e.target.value)}
              onPressEnter={handleSavePreference}
              style={{ maxWidth: 280 }}
            />
            <Button type="primary" size="small" onClick={handleSavePreference}>
              Save
            </Button>
            {preference && (
              <>
                <Tag color="blue">Using: {preference}</Tag>
                <Button type="link" size="small" onClick={handleClearPreference}>
                  Clear
                </Button>
              </>
            )}
          </div>
        </div>
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
