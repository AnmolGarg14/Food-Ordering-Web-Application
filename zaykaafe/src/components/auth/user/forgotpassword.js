import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { _id, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userValid = async () => {
    const res = await axios.get(
      `https://food-ordering-web-application-iota.vercel.app/users/forgot-password/${_id}/${token}`
    );
    if (res.status === 201) {
      console.log("user valid");
    } else {
      window.location = "*";
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://food-ordering-web-application-iota.vercel.app/users/${_id}/${token}`,
        { password }
      );

      if (res.status === 201) {
        setPassword("");
        setMessage(true);
      } else {
        console.log("Token expired!");
      }
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

  useEffect(() => {
    userValid();
    // setTimeout(() => {
    //     setData(true)
    // }, 3000)
  }, []);

  return (
    <>
      <section className="login flex justify-center pt-20">
        <div className="max-w-xs w-full mt-10">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="font-semibold text-center text-3xl text-gray-700">
              Enter Your New Password
            </span>
            <br />
            <div>
              {message ? (
                <p className="text-green-600 font-semibold pt-2">
                  Password changed successfully
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4 mt-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={setVal}
                placeholder="New Password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 font-style: italic mb-3 font-medium">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-primary1 hover:bg-primaryhover ml-16 mt-3 rounded-2xl text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={sendpassword}
              >
                SUBMIT
              </button>
            </div>
            <div className="pt-1 text-center ml-3">
              <a
                href="/login"
                className="hover:text-cyan-600 decoration-transparent transition duration-300 text-xs"
              >
                Go to login page
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
