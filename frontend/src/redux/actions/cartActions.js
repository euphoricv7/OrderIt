import api from "../../utils/api";
import {
  cartRequest,
  cartSuccess,
  cartFail,
} from "../slices/cartSlice";

// fetch cart items
export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch(cartRequest());

    const { data } = await api.get("/eats/cart/get-cart");

    dispatch(cartSuccess(data.data));
    console.log("CART API:", data.data);
  } catch (error) {
    console.log("FETCH CART ERROR:", error.response?.data || error.message);
    dispatch(cartFail(error.response?.data?.message || "Something went wrong"));
  }
};

// add cart items
export const addItemToCart =
  ({ foodItemId, restaurantId, quantity }) =>
  async (dispatch, getState) => {
    try {
      dispatch(cartRequest());

      const userState = getState().user;
      const user = userState?.user;

      if (!user?._id) {
        dispatch(cartFail("User not logged in"));
        return;
      }

      await api.post("/eats/cart/add-to-cart", {
        userId: user._id,
        foodItemId,
        restaurantId,
        quantity,
      });

      dispatch(fetchCartItems());
    } catch (error) {
      console.log("ADD CART ERROR:", error.response?.data || error.message);
      dispatch(cartFail(error.response?.data?.message || "Something went wrong"));
    }
  };

// update cart quantity
export const updateCartQuantity =
  ({ foodItemId, quantity }) =>
  async (dispatch, getState) => {
    try {
      const userState = getState().user;
      const user = userState?.user;

      if (!user?._id) {
        dispatch(cartFail("User not logged in"));
        return;
      }

      await api.post("/eats/cart/update-cart-item", {
        userId: user._id,
        foodItemId,
        quantity,
      });

      dispatch(fetchCartItems());
    } catch (error) {
      console.log("UPDATE CART ERROR:", error.response?.data || error.message);
      dispatch(cartFail(error.response?.data?.message || "Something went wrong"));
    }
  };

// remove item from cart
export const removeItemFromCart =
  ({ foodItemId }) =>
  async (dispatch, getState) => {
    try {
      const userState = getState().user;
      const user = userState?.user;

      if (!user?._id) {
        dispatch(cartFail("User not logged in"));
        return;
      }

      await api.delete("/eats/cart/delete-cart-item", {
        data: { userId: user._id, foodItemId },
      });

      dispatch(fetchCartItems());
    } catch (error) {
      console.log("REMOVE CART ERROR:", error.response?.data || error.message);
      dispatch(cartFail(error.response?.data?.message || "Something went wrong"));
    }
  };