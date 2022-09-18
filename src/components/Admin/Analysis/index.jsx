import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import { connect } from "react-redux";
import { analysisData } from "../../../store/apiSlice";
import { Container } from "./styles";
import { getAPI } from "../../../util/asyncAPIMethods";
import { Table } from "antd";

const chartFeilds = ["search", "brand", "category", "color"];
const generateChartData = (analysisData) => {
  if (analysisData.toString() === "{}") {
    return [];
  }
  console.log("analysisData", analysisData);
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
    getAPI("http://localhost:4000/data/analysis").then((res) => {
      analysisDataFn(res);
      setChartData(generateChartData(res));
    });
    getAPI("http://localhost:4000/users").then((res) => {
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
            <h1 className="title">{val.title}</h1>
            <DonutChart
              key={idx}
              data={val.data}
              innerRadius="0.6"
              colors={[
                "#0033FF",
                "#0044ff",
                "#0055ff",
                "#0066ff",
                "#0077ff",
                "#0088ff",
                "#0099ff",
                "#00aaff",
                "#00bbff",
                "#00ccff",
                "#00ddff",
                "#00eeff",
                "#00ffff",
              ]}
            />
          </div>
        ))}
      </Container>
      <br />
      <h1>User Details</h1>
      <Table dataSource={userData} columns={columns}></Table>
      <h1>Total {analysisData.visited} user visited</h1>
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
