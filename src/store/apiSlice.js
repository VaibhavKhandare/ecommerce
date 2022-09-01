import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sliderData: [
        {
        heading: 'Casual Wear', 
        discount: 30,  
        imgUrl:"https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        link:'',
        },
        {
        heading: 'Summer Wear', discount: 10,  
        imgUrl:"https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        link:'',},
        {
        heading: 'Sport Wear', discount: 45,  
        imgUrl:"https://images.pexels.com/photos/6975472/pexels-photo-6975472.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        link:''
        }
    ],
    categoriesData:[
        {
            id: 1,
            img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            title: "SHIRT STYLE!",
          },
          {
            id: 2,
            img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            title: "LOUNGEWEAR LOVE",
          },
          {
            id: 3,
            img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            title: "LIGHT JACKETS",
          },
    ],
    productData:[
        {
          id:1,
          img:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
        },
        {
          id:2,
          img:"https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
        },
        {
          id:3,
          img:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
        },
        {
          id:4,
          img:"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
        },
        {
          id:5,
          img:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
        },
        {
          id:6,
          img:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
        },
        {
          id:7,
          img:"https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
        },
        {
          id:8,
          img:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
        },
      ],
    cardsData:[],
    cartData: [],
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
        }
    }
});

export const { sliderData, cardsData, cartData}  = apiSlice.actions;
export default apiSlice.reducer;
