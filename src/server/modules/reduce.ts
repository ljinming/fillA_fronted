import { createSlice } from "@reduxjs/toolkit";



 const banlanceSlice = createSlice({
   name: "banlance",
   initialState: {},
  reducers: {
    change: (state: any, action: any) => {
      let newState = { ...state, ...action.payload };
      return newState;
    },
  },
});


 const homeRankSlice = createSlice({
   name: "home_rank",
   initialState: {},
  reducers: {
    change: (state: any, action: any) => {
      let newState = action.payload;
      return newState;
    },
  },
});




const homeRankReducer = homeRankSlice.reducer;

 const banlanceReducer = banlanceSlice.reducer;


export  {banlanceReducer,homeRankReducer}