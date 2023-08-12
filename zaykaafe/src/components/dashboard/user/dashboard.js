import "./dashboard.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboard1 from "../../../images/dashboard1.PNG";
import dashboard2 from "../../../images/dashboard2.PNG";
import dashboard3 from "../../../images/dashboard3.PNG";
import delivery from "../../../images/delivery.png";

function Dashboard() {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const response = await axios.get(
      "https://food-ordering-web-application-iota.vercel.app/category/getcategory"
    );
    console.log(response.data.data);
    setCategory(await response.data.data);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await axios.get(
        `https://food-ordering-web-application-iota.vercel.app/category/search/${key}`
      );
      if (result) {
        setCategory(result.data);
      }
    } else {
      getCategory();
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="bg-slate-900">
        <div className="md:shrink-0 mx-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-10">
          {/* <div className="my-10 transition duration-500 hover:scale-105 w-full"> */}
          <img
            src={dashboard3}
            width={259}
            className="rounded my-10 transition duration-500 hover:scale-105"
            alt=""
          />
          {/* </div> */}
          {/* <div className="my-10 transition duration-500 hover:scale-105 w-full"> */}
          <img
            src={dashboard2}
            height={259}
            width={259}
            className="rounded my-10 transition duration-500 hover:scale-105"
            alt=""
          />
          {/* </div> */}
          {/* <div className="my-10 transition duration-500 hover:scale-105"> */}
          <img
            src={dashboard1}
            height={256}
            width={256}
            className="rounded my-10 transition duration-500 hover:scale-105"
            alt=""
          />
          {/* </div> */}
          {/* <div className="my-10 transition duration-500 hover:scale-105"> */}
          <img
            src={delivery}
            height={256}
            width={256}
            className="rounded my-10 transition duration-500 hover:scale-105"
            alt=""
          />
          {/* </div> */}
        </div>
      </div>

      <section className="my-10">
        <div className="container flex justify-between justify-center border-b">
          <h2 className="mx-0 pb-4 font-semibold border-b-zinc-400">
            Categories
          </h2>

          <div className="flex justify-center pl-16 md:block">
            <div className="mt-3 w-70">
              <div className="input-group relative flex flex-wrap items-stretch mb-3 rounded">
                <input
                  type="search"
                  className="relative flex-auto appearance-none border rounded px-3 py-1.5 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
                  placeholder="Search for category"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={searchHandle}
                />
                <div className="pl-2 py-2">
                  <span id="basic-addon2">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-gap-12 gap-y-11 mx-16 mt-10 mb-14">
          {category.length > 0 ? (
            category.map((cate) => {
              return (
                <div>
                  <div className="rounded-2xl hover:shadow-2xl border-transparent border-2 hover:border-neutral-300 hover:border-solid transition duration-300 ease-in-out w-full md:w-64">
                    <Link to={`/category/${cate.name}`}>
                      <img
                        className="h-40 mb-4 mx-auto"
                        src={`https://food-ordering-web-application-iota.vercel.app/uploads/${cate.imgpath}`}
                        alt=""
                      />
                    </Link>
                    <div className="text-center content p-7 pt-0">
                      <div className="title">{cate.name}</div>
                      <div className="sub-title">{cate.subname}</div>
                      <div className="bottom">
                        <p>{cate.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="text-center"> No Result Found </h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
