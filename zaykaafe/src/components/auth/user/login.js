import "./login.css";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const postdata = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://food-ordering-web-application-iota.vercel.app/users/login";
      const { data: res } = await axios.post(url, user);
      localStorage.setItem("token", res.data);
      console.log(res);
      window.location = "/";
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
            Login
          </span>
          <br />
          <p className="text-sm mt-1">
            {"or "}
            <a
              className="text-primary1 underline decoration-transparent hover:text-primaryhover transition duration-300 ease-in-out"
              href="/signup"
            >
              create an account
            </a>
          </p>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              // for="email"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputs}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              // for="password"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
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

          <div className="flex items-center justify-between">
            <button
              className="bg-primary1 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={postdata}
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-primary1 hover:text-primaryhover transition duration-200 decoration-transparent"
              href="/password-reset"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
