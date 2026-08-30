import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./slices/restaurantSlice";
import menuReducer from "./slices/menuSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice"; // ✅ ADD THIS

const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    menus: menuReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer, // ✅ ADD THIS
  },
});

export default store;