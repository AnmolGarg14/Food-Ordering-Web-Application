import "./product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Logincontext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function product() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { name } = useParams("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { account, setAccount } = useContext(Logincontext);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const res = await axios.get(`/item/getitem/${name}`);
    setProduct(res.data.data);
  };

  const addtocart = async (_id) => {
    const check = await axios.post(`/cart/addtocart/${_id}`);
    const data1 = check;
    console.log(data1);

    if (check.status !== 201) {
      alert("No data available");
    } else {
      toast.success("Item Added to Cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setAccount(data1.data.carts);
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await axios.get(`/item/search/${key}`);
      if (result) {
        setProduct(result.data);
      }
    } else {
      getProduct();
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getProduct();
  }, [name]);

  return (
    <section className="menu container mx-auto pt-8 pb-11">
      <div className="container flex justify-between justify-center border-b mb-10">
        <h2 className="mx-0 pb-4 font-semibold border-b-zinc-400">{name}</h2>

        <div className="flex justify-center pl-16 md:block">
          <div className="mt-3 w-70">
            <div className="input-group relative flex flex-wrap items-stretch mb-3 rounded">
              <input
                type="search"
                className="relative flex-auto appearance-none border rounded px-3 py-1.5 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="Search for item"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-gap-12 gap-y-11 gap-x-14">
        {product.length > 0 ? (
          product.map((product) => {
            return (
              <div>
                <div className="rounded-2xl hover:shadow-lg transition duration-300 ease-in-out">
                  <img
                    className="h-50 mb-4 rounded mx-auto"
                    src={`/uploads/${product.imgpath}`}
                    alt=""
                  />
                  <div className="text-center">
                    <h2 className="mb-4 text-lg">{product.name}</h2>
                    <div className="flex items-center mx-20">
                      <select className="py-1 rounded-xl text-xs bg-slate-100 hover:bg-slate-200">
                        <option selected> {product.size} </option>
                        <option> LARGE </option>
                      </select>
                    </div>
                    <div className="flex items-center justify-around mt-6 mb-6 pb-3">
                      <span className="font-bold text-lg">
                        ₹{product.price}
                      </span>
                      <button
                        className="add-to-cart hover:bg-primary1 hover:border-pure hover:text-pure transition duration-200 py-1 px-6 rounded-full flex items-center"
                        onClick={() => addtocart(product._id)}
                      >
                        <span className="font-medium">+</span>
                        <span className="ml-4 font-medium">Add</span>
                      </button>
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
      <ToastContainer />
    </section>
  );
}
export default product;
