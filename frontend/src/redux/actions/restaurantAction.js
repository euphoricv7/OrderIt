import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// get all restaurants
export const getRestaurants = createAsyncThunk(
  "restaurants/getRestaurants",
  async (keyword = "", { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/eats/stores?keyword=${keyword}`);
      console.log("Fetched restaurants", data);

      return {
        restaurants: data.restaurants,
        count: data.count,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// CREATE RESTAURANT - admin
export const createRestaurant = createAsyncThunk(
  "restaurants/createRestaurant",
  async (restaurantData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/eats/stores", restaurantData);
      console.log("Restaurant created", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// DELETE RESTAURANT - admin
export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/eats/stores/${id}`);
      console.log("Restaurant deleted", data);

      return {
        id,
        message: data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ANALYZE REVIEWS
export const analyzeReviews = createAsyncThunk(
  "restaurants/analyzeReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/ai/admin/restaurants/${id}/analyze`);

      return {
        restaurantId: id,
        aiData: data.aiData,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "AI failed"
      );
    }
  }
);