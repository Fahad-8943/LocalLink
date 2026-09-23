import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getServices,
  createServices,
  updateServiceApi,
  deleteServiceApi,
} from "../services/allApi";

export const fetchService = createAsyncThunk("service/getService", async () => {
  const result = await getServices();
  return result.data;
});

export const createService = createAsyncThunk(
  "service/createService",
  async (serviceData) => {
    const result = await createServices(serviceData);
    return result.data;
  },
);

// UPDATE
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, serviceData }) => {
    const result = await updateServiceApi(id, serviceData);
    return result.data;
  },
);

// DELETE
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id) => {
    const result = await deleteServiceApi(id);
    return result.data;
  },
);

const serviceSlice = createSlice({
  name: "services",

  initialState: {
    loading: false,
    allServices: [],
    error: "",
  },

  extraReducers: (builder) => {
    // GET
    builder.addCase(fetchService.pending, (state) => {
      state.loading = true;
      state.allServices = [];
      state.error = "";
    });

    builder.addCase(fetchService.fulfilled, (state, action) => {
      state.loading = false;
      state.allServices = action.payload;
    });

    builder.addCase(fetchService.rejected, (state) => {
      state.loading = false;
      state.allServices = [];
      state.error = "Data Fetching Failed. Try again.";
    });

    // POST
    builder.addCase(createService.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(createService.fulfilled, (state, action) => {
      state.loading = false;
      state.allServices.push(action.payload);
    });

    builder.addCase(createService.rejected, (state) => {
      state.loading = false;
      state.error = "Service creation failed. Try again.";
    });

    // PATCH
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(updateService.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.allServices.findIndex(
        (service) => service.id === action.payload.id,
      );

      if (index !== -1) {
        state.allServices[index] = action.payload;
      }
    });

    builder.addCase(updateService.rejected, (state) => {
      state.loading = false;
      state.error = "Service update failed. Try again.";
    });
    // DELETE
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;

      state.allServices = state.allServices.filter(
        (service) => service.id !== action.payload.id,
      );
    });

    builder.addCase(deleteService.rejected, (state) => {
      state.loading = false;
      state.error = "Service deletion failed. Try again.";
    });
  },
});

export default serviceSlice.reducer;
