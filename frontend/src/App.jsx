import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Cart from "./Components/cart/Cart";
import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
import ForgotPassword from "./Components/user/ForgotPassword";
import NewPassword from "./Components/user/NewPassword";
import Profile from "./Components/user/Profile";
import UpdateProfile from "./Components/user/UpdateProfile";
import OrderSuccess from "./Components/cart/OrderSuccess";
import ListOrders from "./Components/order/ListOrders";
import OrderDetails from "./Components/order/OrderDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eats/stores/search/:keyword" element={<Home />} />
          <Route path="/eats/stores/:id/menus" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/users/me" element={<Profile />} />
          <Route path="/users/me/update" element={<UpdateProfile />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
          <Route path="/eats/orders/:id" element={<OrderDetails />} />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;