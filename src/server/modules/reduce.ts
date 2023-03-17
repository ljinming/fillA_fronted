import { createSlice } from "@reduxjs/toolkit";



 const banlanceSlice = createSlice({
   name: "banlance",
   initialState: {},
  reducers: {
    change: (state: any, action: any) => {
      let newState = { ...state, ...action.payload };
      console.log('===4',newState)
      return newState;
    },
  },
});






 const banlanceReducer = banlanceSlice.reducer;


export  {banlanceReducer}