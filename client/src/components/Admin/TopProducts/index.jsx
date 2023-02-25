import { connect } from "react-redux";
import React from "react";
import { Container, StyledForm } from "./styles";
import { categoryData } from "../../../store/apiSlice";
import { useEffect } from "react";
import { getAPI } from "../../../util/asyncAPIMethods";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useState } from "react";
import { postAPI } from "../../../util/asyncAPIMethods";

const categoryFeilds = ["title", "imgUrl", "link"];

const Admin = ({ categoryData = [], categoryDataFn }) => {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    getAPI("/data/category").then((res) => categoryDataFn(res));
  }, [refresh]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  // const [formFeilds, setFormFeilds] = useState([]);
  const [initalFeilds, setInitialFeilds] = useState({});
  const [formLink, setFormLink] = useState("");
  const [editId, setEditId] = useState("");

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddcategory = () => {
    setEditId("");
    setFormLink("/data/category/add");
    setInitialFeilds({});
    showModal();
    setTitle("Add Top Products In HomePage");
  };
  const handleEditcategory = (e, data) => {
    showModal();
    setTitle("Edit category");
    setFormLink("/data/category/edit");
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
    e.preventDefault();
    const data = {};
    categoryFeilds.forEach((val) => {
      data[val] = e.target[val].value;
    });
    if (editId) data["_id"] = editId;
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
      {categoryFeilds.map((val, idx) => (
        <input
          key={idx}
          type="text"
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
    <>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        title={title}
      >
        <Forms />
      </Modal>
      <br />
      <h1>Edit category</h1>
      <Container>
        {(categoryData || []).map((data, idx) => {
          return (
            <div className="container" key={idx}>
              <img src={data.imgUrl} alt="category"></img>
              <div className="info">
                <ul>
                  <li>
                    <h3>
                      {"title"}: {data["title"]}
                    </h3>
                  </li>
                  <li>
                    <h3>
                      {"link"}: {data["link"]}
                    </h3>
                  </li>
                </ul>
                <div className="icons">
                  <div className="icon-wrapper">
                    <EditOutlined
                      onClick={(e) => handleEditcategory(e, data)}
                    />
                  </div>
                  <div className="icon-wrapper">
                    <DeleteOutlined
                      onDoubleClick={() =>
                        handleDelete(data._id, "/data/category/remove")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="add-card" onClick={handleAddcategory}>
          <div>+</div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  const { categoryData } = state?.apiData;
  return { categoryData };
};

export default connect(mapStateToProps, { categoryDataFn: categoryData })(
  Admin
);
