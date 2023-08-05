import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: "85vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/images/404.png"
            alt="error"
            style={{ width: "500px", marginBottom: 20 }}
          />
          <NavLink
            to="/"
            className="bg-orange-500 hover:bg-orange-600 rounded text-white font-bold py-2 px-7 focus:outline-none focus:shadow-outline decoration-transparent transition duration-300"
            style={{ fontSize: 18 }}
          >
            Back To Home Page
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Error;
