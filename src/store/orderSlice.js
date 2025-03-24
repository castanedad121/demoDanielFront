import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Función para obtener el token de pago desde la API
export const fetchToken = createAsyncThunk(
  "order/fetchToken",
  async ({ transactionId, orderData }) => {
    const response = await fetch(
      "https://demodaniel-izipay.onrender.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transactionId: transactionId,
        },
        body: JSON.stringify(orderData),
      }
    );
    return await response.json();
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    transactionId: null,
    orderNumber: null,
    token: null,
    status: "idle", // "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.transactionId = action.payload.transactionId;
      state.orderNumber = action.payload.orderNumber;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.response.token;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
