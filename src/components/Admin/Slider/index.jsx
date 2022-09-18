import { connect } from "react-redux";
import React from "react";
import { Container, SliderContainer, StyledForm } from "./styles";
import { sliderData } from "../../../store/apiSlice";
import { useEffect } from "react";
import { getAPI } from "../../../util/asyncAPIMethods";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useState } from "react";
import { postAPI } from "../../../util/asyncAPIMethods";

const sliderFeilds = ["title", "discount", "imgUrl", "link"];

const Admin = ({ sliderData, sliderDataFn }) => {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    getAPI("http://localhost:4000/data/slider").then((res) =>
      sliderDataFn(res)
    );
  }, [refresh]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("Modal");
  const [formFeilds, setFormFeilds] = useState([]);
  const [initalFeilds, setInitialFeilds] = useState({});
  const [formLink, setFormLink] = useState("");
  const [editId, setEditId] = useState("");

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddSlider = () => {
    showModal();
    setFormFeilds(sliderFeilds);
    setTitle("Add Slider In HomePage");
    setFormLink("http://localhost:4000/data/slider/add");
    setInitialFeilds({});
    setEditId("");
  };
  const handleEditSlider = (e, data) => {
    showModal();
    setFormFeilds(sliderFeilds);
    setTitle("Edit Slider");
    setFormLink("http://localhost:4000/data/slider/edit");
    setInitialFeilds(data);
    setEditId(data._id);
  };
  const handleDelete = (_id, link) => {
    postAPI(link, { _id }).then((res) => {
      if (res?.status === 1) {
        message.info("Operation Completed Successfully");
        closeModal();
        setRefresh(!refresh);
      } else {
        message.info("Operation not completed");
      }
    });
  };

  const handleFormSubmit = (e) => {
    console.log("e", e);
    e.preventDefault();
    const data = {};
    formFeilds.forEach((val) => {
      data[val] = e.target[val].value;
    });
    if (editId) data._id = editId;
    postAPI(formLink, data).then((res) => {
      if (res?.status === 1) {
        message.info("Operation Completed Successfully");
        closeModal();
        setRefresh(!refresh);
      } else {
        message.info("Operation not completed");
      }
    });
  };

  const Forms = () => (
    <StyledForm onSubmit={handleFormSubmit}>
      {formFeilds.map((val, idx) => (
        <input
          type="text"
          key={idx}
          name={val}
          placeholder={val}
          defaultValue={initalFeilds[val]}
          required
        />
      ))}
      <input type="submit" value="Submit" />
    </StyledForm>
  );

  return (
    <Container>
      <Modal
        footer={null}
        visible={isModalVisible}
        onCancel={closeModal}
        title={title}
      >
        <Forms />
      </Modal>
      <br />
      <h1>Edit Slider</h1>
      <SliderContainer>
        {sliderData.map((data, idx) => {
          return (
            <div className="container" key={idx}>
              <img src={data.imgUrl} alt="slider"></img>
              <div className="info">
                <ul>
                  <li>discount: {data.discount}</li>
                  <li>link: {data.link}</li>
                  <li>title: {data.title}</li>
                </ul>
                <div className="icons">
                  <div className="icon-wrapper">
                    <EditOutlined onClick={(e) => handleEditSlider(e, data)} />
                  </div>
                  <div className="icon-wrapper">
                    <DeleteOutlined
                      onDoubleClick={() =>
                        handleDelete(
                          data._id,
                          "http://localhost:4000/data/slider/remove"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="add-card" onClick={handleAddSlider}>
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
