import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../layout/Loader";
import { myOrders } from "../../redux/actions/orderActions";
import { clearErrors } from "../../redux/slices/orderSlice";

import "./ListOrders.css";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders = [] } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-right" });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="list-orders-container">
      <h1 className="orders-title">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.restaurant?.name || "Unknown"}</td>
                    <td>{order.orderItems?.length || 0}</td>
                    <td>₹{order.finalTotal || order.totalPrice || 0}</td>
                    <td>
                      <span
                        className={
                          order.orderStatus?.includes("Delivered")
                            ? "status-delivered"
                            : "status-pending"
                        }
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/eats/orders/${order._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListOrders;