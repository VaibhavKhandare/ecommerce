import { connect } from "react-redux";
import React from "react";
import { Container, SliderContainer } from "./styles";
import { sliderData } from "../../store/apiSlice";
import { useEffect } from "react";
import { getAPI } from "../../util/asyncAPIMethods";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Admin = ({ sliderData, sliderDataFn }) => {
  useEffect(() => {
    getAPI("http://localhost:4000/data/slider").then((res) =>
      sliderDataFn(res)
    );
  }, []);
  console.log("sliderData", sliderData);
  return (
    <Container>
      <SliderContainer>
        {sliderData.map((data) => {
          return (
            <div className="container">
              <img src={data.imgUrl} alt="slider"></img>
              <div className="info">
                <ul>
                  <li>discount: {data.discount}</li>
                  <li>link: {data.link}</li>
                  <li>title: {data.title}</li>
                </ul>
                <div className="icons">
                  <div className="icon-wrapper">
                    <EditOutlined />
                  </div>
                  <div className="icon-wrapper">
                    <DeleteOutlined />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="add-card">
          <div>+</div>
        </div>
      </SliderContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { sliderData } = state?.apiData;
  return { sliderData };
};

export default connect(mapStateToProps, { sliderDataFn: sliderData })(Admin);
