import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// URL base del API - usa variable de entorno o fallback a producción
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://demodaniel-izipay.onrender.com";

// Función para obtener el token de pago desde la API
export const fetchToken = createAsyncThunk(
  "order/fetchToken",
  async ({ transactionId, orderData }) => {
    const response = await fetch(`${API_BASE_URL}/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transactionId: transactionId,
      },
      body: JSON.stringify(orderData),
    });
    return await response.json();
  }
);

// Función para generar la firma HMAC-SHA256 para cardSelector
export const fetchSignature = createAsyncThunk(
  "order/fetchSignature",
  async (signatureData) => {
    const response = await fetch(`${API_BASE_URL}/api/signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signatureData),
    });
    return await response.json();
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    transactionId: null,
    orderNumber: null,
    token: null,
    signature: null,
    status: "idle", // "loading", "succeeded", "failed"
    signatureStatus: "idle",
    error: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.transactionId = action.payload.transactionId;
      state.orderNumber = action.payload.orderNumber;
    },
    clearSignature: (state) => {
      state.signature = null;
      state.signatureStatus = "idle";
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
      })
      .addCase(fetchSignature.pending, (state) => {
        state.signatureStatus = "loading";
      })
      .addCase(fetchSignature.fulfilled, (state, action) => {
        state.signatureStatus = "succeeded";
        state.signature = action.payload.response.signature;
      })
      .addCase(fetchSignature.rejected, (state, action) => {
        state.signatureStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setOrder, clearSignature } = orderSlice.actions;
export default orderSlice.reducer;
