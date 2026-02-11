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
import { useEffect, useRef } from "react";
import { getAPI } from "../../util/asyncAPIMethods";

const Filter = ({
  setSearchValue,
  paginationFn,
  filterState,
  setFilterStateFn,
  filterData,
  filterDataFn,
}) => {
  const fetchTimeoutRef = useRef(null);
  useEffect(() => {
    const params = {};
    if (filterState.brand?.length) params.brand = filterState.brand;
    if (filterState.category?.length) params.category = filterState.category;
    if (filterState.color?.length) params.color = filterState.color;
    if (filterState.priceRange?.length === 2) {
      const max = filterData.priceRange?.[1] ?? 20000;
      if (filterState.priceRange[0] > 0 || filterState.priceRange[1] < max) params.price = filterState.priceRange;
    }
    const doFetch = () => {
      getAPI("/data/filter", params).then((res) => {
        const hasCheckBoxes = res?.checkBoxesData && Object.keys(res.checkBoxesData).length > 0;
        const payload = {
          checkBoxesData: hasCheckBoxes ? res.checkBoxesData : filterData.checkBoxesData ?? {},
          priceRange: Array.isArray(res?.priceRange) && res.priceRange.length >= 2 ? res.priceRange : (filterData.priceRange ?? [0, 20000]),
        };
        filterDataFn(payload);
        if (payload.priceRange?.length === 2 && (params.brand?.length || params.category?.length || params.color?.length) && setFilterStateFn) {
          setFilterStateFn((prev) => ({ ...prev, priceRange: payload.priceRange }));
        }
      });
    };
    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(doFetch, 250);
    return () => { if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current); };
  }, [filterState.brand?.length, filterState.category?.length, filterState.color?.length]);

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
  const priceMin = filterData.priceRange?.[0] ?? 0;
  const priceMax = filterData.priceRange?.[1] ?? 20000;
  const sliderValue = [
    Math.max(priceMin, Math.min(priceMax, filterState.priceRange?.[0] ?? priceMin)),
    Math.min(priceMax, Math.max(priceMin, filterState.priceRange?.[1] ?? priceMax)),
  ];
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
        range={{ draggableTrack: true }}
        tooltip={{ placement: "bottom" }}
        marks={{
          [priceMin]: String(priceMin),
          [priceMax]: String(priceMax),
        }}
        min={priceMin}
        max={priceMax}
        value={sliderValue}
        step={100}
        draggableTrack
        onAfterChange={(e) => {
          if (setFilterStateFn) setFilterStateFn((prev) => ({ ...prev, priceRange: e }));
          paginationFn();
        }}
      />
      <ChildContainer>
        {Object.keys(checkBoxesData).map((header) => (
          <div key={header}>
            <ChildHeader>{header}</ChildHeader>
            <ChildBody>
              <span className="m-l-8"></span>
              {Object.keys(checkBoxesData[header]).map((option) => (
                <Checkbox
                  key={`${header}-${option}`}
                  onChange={(e) => handleClick(e, header)}
                  value={option}
                >
                  {option} ({checkBoxesData[header][option]})
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
