import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartItems,
  removeItemFromCart,
  updateCartQuantity,
} from "../../redux/actions/cartActions";
import { payment } from "../../redux/actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [], restaurant } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const removeCartItemHandler = (foodItemId) => {
    dispatch(removeItemFromCart({ foodItemId }));
    toast.success("Item removed from cart");
  };

  const increaseQty = (foodItemId, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > Number(stock)) {
      toast.error("Exceeded stock limit");
      return;
    }

    dispatch(updateCartQuantity({ foodItemId, quantity: newQty }));
  };

  const decreaseQty = (foodItemId, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      dispatch(removeItemFromCart({ foodItemId }));
      toast.success("Item removed from cart");
      return;
    }

    dispatch(updateCartQuantity({ foodItemId, quantity: newQty }));
  };

  const checkoutHandler = () => {
  dispatch(payment(cartItems, restaurant));
  //navigate("/payment");
};

  return (
    <>
      {!cartItems || cartItems.length === 0 ? (
        <h2 className="mt-5 text-center">Your Cart is empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>
          <h3 className="mt-3">
            Restaurant: <b>{restaurant?.name}</b>
          </h3>

          <div className="row d-flex justify-content-between cartt">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="row align-items-center">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.foodItem?.images?.[0]?.url}
                        alt="items"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      {item.foodItem?.name}
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">
                        <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                        {item.foodItem?.price}
                      </p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() =>
                            decreaseQty(item.foodItem._id, item.quantity)
                          }
                        >
                          -
                        </span>

                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() =>
                            increaseQty(
                              item.foodItem._id,
                              item.quantity,
                              item.foodItem.stock
                            )
                          }
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() =>
                          removeCartItemHandler(item.foodItem._id)
                        }
                      ></i>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />

                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>

                <p>
                  Total:
                  <span className="order-summary-values">
                    <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.quantity * item.foodItem.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />

                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;