import "./signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [error, setError] = useState("");
  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const url = "/users/register";
      const { data: res } = await axios.post(url, user);
      // toast.success("Successfully Signed Up", {
      //   position: "top-right",
      //   autoClose: 1700,
      // });
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <section className="signup flex justify-center pt-20">
      <div className="w-full max-w-xs">
        <form
          method="POST"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <span className="font-medium leading-tight text-3xl text-gray-700">
            Sign up
          </span>
          <br />
          <p className="text-sm mt-1">
            {"or "}
            <a
              className="text-primary1 underline decoration-transparent hover:text-primaryhover transition duration-300 ease-in-out"
              href="/login"
            >
              login to your account
            </a>
          </p>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
              type="text"
              value={user.name}
              onChange={handleInputs}
              placeholder="Name"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              id="email"
              type="email"
              value={user.email}
              onChange={handleInputs}
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="number"
            >
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="number"
              id="number"
              value={user.number}
              onChange={handleInputs}
              placeholder="Number"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              id="password"
              type="password"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 font-style: italic mb-3 font-medium">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between" />
          <button
            className="bg-primary1 hover:bg-primaryhover text-white font-bold py-2 px-24 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={PostData}
          >
            Sign Up
          </button>
        </form>
        {/* <ToastContainer /> */}
      </div>
    </section>
  );
}
export default Signup;
