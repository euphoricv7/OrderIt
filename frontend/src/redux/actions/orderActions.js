import api from "../../utils/api";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  paymentRequest,
  paymentSuccess,
  paymentFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from "../slices/orderSlice";

// create order
export const createOrder = (session_id) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const { data } = await api.post(
      `/eats/orders/new/${session_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response?.data?.message || error.message));
  }
};

// payment
export const payment = (items, restaurant) => async (dispatch) => {
  try {
    dispatch(paymentRequest());

    const { data } = await api.post(
      "/payment/process",
      { items, restaurant },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Stripe URL:", data.url);

    window.location.href = data.url;
  } catch (error) {
    dispatch(paymentFail(error.response?.data?.message || error.message));
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());

    const { data } = await api.get("/eats/orders/me/myOrders");

    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(
      myOrdersFail(
        error.response?.data?.message || "Failed to fetch orders"
      )
    );
  }
};
// order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());

    const { data } = await api.get(`/eats/orders/${id}`);

    dispatch(orderDetailsSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailsFail(error.response?.data?.message || error.message));
  }
};