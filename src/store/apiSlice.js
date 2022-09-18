import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analysisData:{},
    sliderData: [],
    categoryData:[],
    productsData:[
        {
          img:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
        },
        {
          img:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
        },
        {
          img:"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
        },
        {
          img:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
        },
        {
          img:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
        },
        {
          img:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
        },
      ],
    cardsData:{
      pageNo: 1,
    },
    cardData:{
      pageNo: 1,
    },
    cartData: [],
    filterData: {},
}

const apiSlice = createSlice({
    name:'apiData',
    initialState,
    reducers: {
        sliderData(state,action){
            state.sliderData = action.payload;
        },
        cardsData(state,action){
            state.cardsData = action.payload;
        },
        cartData(state,action){
            state.cartData = action.payload;
        },
        cardData(state,action){
          state.cardData = action.payload;
        },
        categoryData(state,action){
          state.categoryData = action.payload;
        },
        filterData(state,action){
          state.filterData = action.payload;
        },
        analysisData(state,action){
          state.analysisData = action.payload;
        }
        
    }
});

export const { sliderData, cardsData, cartData, cardData, categoryData, filterData, analysisData}  = apiSlice.actions;
export default apiSlice.reducer;
