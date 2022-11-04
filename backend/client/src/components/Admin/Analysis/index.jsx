import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import { connect } from "react-redux";
import { analysisData } from "../../../store/apiSlice";
import { Container } from "./styles";
import { getAPI } from "../../../util/asyncAPIMethods";
import { Table } from "antd";

const chartFeilds = ["search", "brand", "category", "color"];
const generateChartData = (analysisData = {}) => {
  if (Object.keys(analysisData).length === 0) {
    return [];
  }
  const chartData = [];
  chartFeilds.forEach((feild) => {
    let data = [];
    Object.keys(analysisData[feild]).forEach((val) => {
      if (analysisData[feild][val]) {
        data.push({
          label: val,
          value: analysisData[feild][val],
        });
      }
    });
    data = data.sort((a, b) => b.value - a.value);
    data = data.slice(0, 13);
    chartData.push({ title: feild, data });
  });
  return chartData;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const Analysis = ({ analysisDataFn, analysisData = {} }) => {
  const [chartData, setChartData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAPI("/data/analysis").then((res) => {
      analysisDataFn(res);
      setChartData(generateChartData(res));
    });
    getAPI("/users").then((res) => {
      setUserData(res);
    });
  }, []);

  return (
    <>
      <br />
      <h1>Top Searches</h1>
      <Container>
        {chartData.map((val, idx) => (
          <div className="chartContainer">
            <h1 className="nm">{val.title}</h1>
            <div className="line"></div>
            <DonutChart
              strokeColor="#fff"
              className="donutChart"
              key={idx}
              data={val?.data}
              innerRadius="0.6"
              colors={[
                "#6496FF",
                "#6D9FFF",
                "#76A8FF",
                "#7FB1FF",
                "#88BAFF",
                "#91C3FF",
                "#9BCDFF",
                "#A4D6FF",
                "#ADDFFF",
                "#B6E8FF",
                "#BFF1FF",
                "#C8FAFF",
              ]}
            />
          </div>
        ))}
      </Container>
      <br />
      <h1>User Details</h1>
      <Table
        style={{ fontFamily: '"Work Sans", sans-serif' }}
        dataSource={userData}
        columns={columns}
      ></Table>
      <h1>Total Website Visit - {analysisData.visited} </h1>
    </>
  );
};

const mapStateToProps = (state) => {
  const { apiData } = state;
  const { analysisData } = apiData;
  return { analysisData };
};

export default connect(mapStateToProps, { analysisDataFn: analysisData })(
  Analysis
);
