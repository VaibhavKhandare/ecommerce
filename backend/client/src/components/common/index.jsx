import React, { useState } from "react";
import { StyledForm } from "./styles";
import { EditOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { postAPI } from "../../util/asyncAPIMethods";
import { useNavigate } from "react-router-dom";
import { useHover, useShift } from "../../util/customHook";
import {
  Container,
  CardContainer,
  CardInfo,
  Brand,
  Desc,
  Price,
  CenterColumn,
  CardImageOverflow,
  CardImageContainer,
  CardImage,
} from "./styles";

const productFields = [
  "name",
  "price",
  "items",
  "brand",
  "description",
  "images",
  "rating",
];

const ImageContainer = ({ images = [] }) => {
  const [hovered, eventHandlers] = useHover();
  const [shift] = useShift(hovered, images.length);
  return (
    <CardImageOverflow>
      <CardImageContainer {...eventHandlers} shift={shift}>
        {images.map((val, idx) => (
          <CardImage key={idx} src={val} />
        ))}
      </CardImageContainer>
    </CardImageOverflow>
  );
};

export const CardsContainer = ({
  data = [],
  setUrl,
  isAdmin,
  paginationFn,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (oneCard) => {
    if (!isAdmin) {
      if (setUrl) {
        setUrl(`/product/${oneCard._id}`);
      } else navigate(`/product/${oneCard._id}`);
    } else {
      if (setUrl) {
        setUrl(`/product/${oneCard._id}`);
      }
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [initalFeilds, setInitialFeilds] = useState({});
  const [formLink, setFormLink] = useState("");
  const [editId, setEditId] = useState("");

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddproduct = () => {
    setEditId("");
    setFormLink("/data/product/add");
    setInitialFeilds({});
    showModal();
    setTitle("Add Top Products In HomePage");
  };
  const handleEditproduct = (e, data) => {
    setInitialFeilds(data);
    setTitle("Edit Product");
    setFormLink("/data/product/edit");
    setEditId(data._id);
    showModal();
  };
  const handleDelete = (_id, link) => {
    postAPI(link, { _id }).then((res) => {
      if (res?.status === 1) {
        message.info("Operation Completed Successfully");
        closeModal();
        paginationFn();
      } else {
        message.info("Operation not completed");
      }
    });
  };

  const AdminImageContainer = ({ data = {} }) => {
    return (
      <CardImageOverflow>
        <CardImageContainer>
          {(data?.images || []).map((val, idx) => (
            <CardImage key={idx} src={val} />
          ))}
        </CardImageContainer>
      </CardImageOverflow>
    );
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {};
    productFields.forEach((val) => {
      data[val] = e.target[val].value;
    });
    if (data.images) {
      data.images = data.images.split(",");
    }
    if (editId) data["_id"] = editId;
    postAPI(formLink, data).then((res) => {
      if (res?.status === 1) {
        message.info("Operation Completed Successfully");
        closeModal();
        paginationFn();
      } else {
        message.info("Operation not completed");
      }
    });
  };
  const Forms = () => (
    <StyledForm onSubmit={handleFormSubmit}>
      {productFields.map((val, idx) => (
        <label key={idx}>
          {val}
          <br />
          <input
            key={val}
            type="text"
            name={val}
            placeholder={val}
            defaultValue={initalFeilds[val]}
            required
          />
        </label>
      ))}
      <input type="submit" value="Submit" />
    </StyledForm>
  );
  return (
    <Container>
      <Modal
        centered
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        title={title}
      >
        <Forms />
      </Modal>
      {isAdmin && (
        <div className="add-card">
          <div className="icon" onClick={handleAddproduct}>
            +
          </div>
          <div className="text">Add Product</div>
        </div>
      )}

      {data.map((oneCard = {}, idx) => (
        <CenterColumn key={idx}>
          <CardContainer onClick={() => handleCardClick(oneCard)}>
            {isAdmin ? (
              <AdminImageContainer data={oneCard} />
            ) : (
              <ImageContainer images={oneCard.images || []} />
            )}
            <CardInfo>
              <Brand>{oneCard.brand}</Brand>
              <Desc>{oneCard.description}</Desc>
              <Price>Rs.{oneCard.price}</Price>
              {isAdmin && (
                <div className="icons">
                  <div className="icon-wrapper">
                    <LinkOutlined
                      onClick={() => navigate(`/product/${oneCard._id}`)}
                    />
                  </div>
                  <div className="icon-wrapper">
                    <EditOutlined
                      onClick={(e) => handleEditproduct(e, oneCard)}
                    />
                  </div>
                  <div className="icon-wrapper">
                    <DeleteOutlined
                      onDoubleClick={() => {
                        handleDelete(oneCard._id, "/data/product/remove");
                      }}
                    />
                  </div>
                </div>
              )}
            </CardInfo>
          </CardContainer>
        </CenterColumn>
      ))}
    </Container>
  );
};
