import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { sliderData } from "../../store/apiSlice";
import { getAPI } from "../../util/asyncAPIMethods";
import { useHover } from "../../util/customHook";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Container,
  Arrow,
  Wrapper,
  Image,
  ImageContainer,
  InfoContainer,
  Slide,
  Title,
  Discount,
  ShopButton,
  DotsContainer,
  Dots,
} from "./styles";
import { useNavigate } from "react-router-dom";

let SLIDER_DIRECTION = 1;

const Slider = ({ sliderData, sliderDataFn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getAPI("/data/slider").then((res) => sliderDataFn(res));
  }, []);

  const [shift, setShift] = useState(0);
  const [hovered, eventHandlers] = useHover();
  const handleShift = (no) => {
    setShift((val) => val + no);
  };
  useEffect(() => {
    if (hovered) return;
    const slideInterval = setInterval(() => {
      setShift((val) => {
        if (val <= 0) SLIDER_DIRECTION = 1;
        else if (val >= sliderData.length - 1) SLIDER_DIRECTION = -1;
        return val + SLIDER_DIRECTION;
      });
    }, 2000);
    return () => clearInterval(slideInterval);
  }, [hovered]);
  return (
    <Container {...eventHandlers}>
      <Arrow
        toShow={shift !== sliderData.length - 1}
        direction="left"
        onClick={() => {
          handleShift(1);
        }}
      >
        <RightOutlined />
      </Arrow>
      <Wrapper>
        {sliderData?.map((data, idx) => (
          <Slide
            key={idx}
            onClick={() => {
              navigate(`product/?${data.link}`);
            }}
            shift={shift * 100}
          >
            <ImageContainer>
              <Image src={data.imgUrl} />
            </ImageContainer>
            <InfoContainer>
              <Title>{data.title}</Title>
              <br />
              <Discount>{data.discount}% Discount</Discount>
              <br />
              <ShopButton>SHOP NOW</ShopButton>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        toShow={shift !== 0}
        direction="right"
        onClick={() => {
          handleShift(-1);
        }}
      >
        <LeftOutlined />
      </Arrow>
      <DotsContainer>
        {sliderData?.map((data, idx) => (
          <Dots
            key={idx}
            isActive={idx === shift}
            onClick={() => {
              setShift(idx);
            }}
          ></Dots>
        ))}
      </DotsContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { apiData = {} } = state || {};
  const { sliderData = [] } = apiData;
  return { sliderData };
};

export default connect(mapStateToProps, { sliderDataFn: sliderData })(Slider);
