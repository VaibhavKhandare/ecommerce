import {
  Box,
  Header,
  ChildContainer,
  ChildHeader,
  StyledSlider,
  ChildBody,
} from "./styles";
import { Checkbox, Input } from "antd";
import { connect } from "react-redux";
import { filterData } from "../../store/apiSlice";
import { useEffect } from "react";
import { getAPI } from "../../util/asyncAPIMethods";

const Filter = ({
  setSearchValue,
  paginationFn,
  filterState,
  filterData,
  filterDataFn,
}) => {
  useEffect(() => {
    getAPI("/data/filter").then((res) => {
      filterDataFn(res);
    });
  }, []);

  const handleClick = (e, key = "") => {
    if (e.target.checked) {
      if (filterState[key].indexOf(e.target.value) === -1) {
        filterState[key].push(e.target.value);
      }
    } else {
      if (filterState[key].indexOf(e.target.value) !== -1) {
        filterState[key].splice(filterState[key].indexOf(e.target.value), 1);
      }
    }
    paginationFn();
  };
  const { checkBoxesData = {} } = filterData;
  return (
    <Box>
      <Header>Filters</Header>
      <br />
      <Input.Search
        placeholder="Search Name, Brand...."
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={() => {
          paginationFn();
        }}
        onPressEnter={() => {
          paginationFn();
        }}
      ></Input.Search>
      <br />
      <br />
      <ChildHeader>Price</ChildHeader>
      <StyledSlider
        range={{
          draggableTrack: true,
        }}
        tooltip={{
          placement: "bottom",
        }}
        marks={{
          0: "0 Rs",
          20000: "20000",
        }}
        defaultValue={[100, 10000]}
        max={20000}
        step={100}
        draggableTrack
        onAfterChange={(e) => {
          filterState.priceRange = e;
          paginationFn();
        }}
      />
      <ChildContainer>
        {Object.keys(checkBoxesData).map((header, idx) => (
          <div key={idx}>
            <ChildHeader key={header}>{header}</ChildHeader>
            <ChildBody>
              <span className="m-l-8"></span>
              {Object.keys(checkBoxesData[header]).map((key, idx) => (
                <Checkbox
                  key={idx}
                  onChange={(e) => {
                    handleClick(e, header);
                  }}
                  value={key}
                >
                  {key} ({checkBoxesData[header][key]})
                </Checkbox>
              ))}
            </ChildBody>
          </div>
        ))}
      </ChildContainer>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const filterData = state?.apiData?.filterData || {};
  return { filterData };
};

export default connect(mapStateToProps, { filterDataFn: filterData })(Filter);
