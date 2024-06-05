import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: null,
  status: "idle",
  error: null,
  currentProductId: 1,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productId) => {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    nextProduct(state) {
      state.currentProductId += 1;
    },
    prevProduct(state) {
      if (state.currentProductId > 1) {
        state.currentProductId -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextProduct, prevProduct } = productSlice.actions;

export default productSlice.reducer;
