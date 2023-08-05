import "./login.css";
import React, { useState } from "react";
import axios from "axios";

function Passwordreset() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/sendpasswordlink", { email });
      if (res.status === 201) {
        setEmail("");
        setMessage(true);
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

  return (
    <section className="login flex justify-center pt-20">
      <div className="max-w-xs w-full mt-10">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <span className="font-semibold text-center text-3xl text-gray-700">
            Enter Your Email
          </span>
          <br />
          <div>
            {message ? (
              <p className="text-green-600 font-semibold">
                Password reset link sent Successfully on your Email
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={setVal}
              placeholder="Email"
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
              onClick={sendLink}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Passwordreset;
