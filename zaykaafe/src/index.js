import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Error from "./components/error";
import Dashboard from "./components/dashboard/user/dashboard";
import Home from "./components/header/home";
import AdminDashboard from "./components/dashboard/admin/dashboard";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Review from "./components/review/review";
import Help from "./components/help/help";
import Offer from "./components/offer/offer";
import About from "./components/about/about";
import Cart from "./components/cart/cart";
import NLCart from "./components/cart/nlcart";
import Profile from "./components/profile/profile";
import AddItem from "./components/dashboard/admin/additem";
import ViewItem from "./components/dashboard/admin/viewitem";
import UpdateItem from "./components/dashboard/admin/updateitem";
import AddCategory from "./components/dashboard/admin/addcategory";
import UpdateCategory from "./components/dashboard/admin/updatecategory";
import Items from "./components/product/product";
import Login from "./components/auth/user/login";
import PasswordReset from "./components/auth/user/passwordreset";
import ForgotPassword from "./components/auth/user/forgotpassword";
import AdminLogin from "./components/auth/admin/adminlogin";
import Signup from "./components/auth/user/signup";
import Contextprovider from "./components/context/ContextProvider";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderPlaced from "./components/orderplaced/orderplaced";

const root = ReactDOM.createRoot(document.getElementById("root"));
const user = localStorage.getItem("token");
root.render(
  <Router>
    <Contextprovider>
      {!user && <Header />}
      {user && <Home />}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/updateitem/:_id" element={<UpdateItem />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory/:_id" element={<UpdateCategory />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="/forgot-password/:_id/:token"
          element={<ForgotPassword />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/checkout-login" element={<NLCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewitem" element={<ViewItem />} />
        <Route path="/category/:name" element={<Items />} />
        <Route path="/review" element={<Review />} />
        <Route path="/customer-support" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
      <Footer />
    </Contextprovider>
  </Router>
);
reportWebVitals();
