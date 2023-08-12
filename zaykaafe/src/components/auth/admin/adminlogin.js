import "./adminlogin.css";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setAdmin({ ...admin, [name]: value });
  };
  const postdata = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://food-ordering-web-application-iota.vercel.app/admin/adminlogin";
      const { data: res } = await axios.post(url, admin);
      localStorage.setItem("token1", res.data);
      window.location = "/admin/home";
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
    <section className="login flex justify-center pt-20">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <span className="font-medium leading-tight text-3xl text-gray-700">
            Admin Login
          </span>
          <br />
          <p className="text-primary1 text-sm mt-1 underline decoration-transparent">
            Welcome Back
          </p>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              // for="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              value={admin.email}
              onChange={handleInputs}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              // for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={admin.password}
              onChange={handleInputs}
              placeholder="Password"
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 font-style: italic mb-3 font-medium">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-primary1 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={postdata}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
