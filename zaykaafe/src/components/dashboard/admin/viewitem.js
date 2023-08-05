// import "./product.css";
// import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

function viewitem() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { name } = useParams("");
  // console.log(name);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [item, setItem] = useState([]);
  console.log(item);

  const getItem = async () => {
    const res = await axios.get("/item/getitem");
    // console.log("getdata");
    setItem(res.data.data);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await axios.get(`/item/search/${key}`);
      if (result) {
        setItem(result.data);
      }
    } else {
      getItem();
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getItem();
  }, []);

  const setData = (data) => {
    let { _id, name, catname, price } = data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("name", name);
    localStorage.setItem("catname", catname);
    localStorage.setItem("price", price);
  };

  const onDelete = (_id) => {
    axios.delete(`/item/deleteitem/${_id}`).then(() => {
      getItem();
    });
  };

  return (
    <section className="menu container mx-auto pt-8 pb-11">
      <div className="container flex justify-between justify-center border-b">
        <h2 className="mx-0 pb-4 font-semibold border-b-zinc-400">Items</h2>

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
      {/* <h1 className="text-3xl border-b pb-1 font-semibold mb-8">Italian</h1>
      <h2 className="text-lg pb-1 font-semibold mb-8">Pizza</h2> */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-gap-12 gap-y-11 gap-x-10">
        {item.length > 0 ? (
          item.map((item) => {
            return (
              <div>
                <div className="rounded-2xl hover:shadow-lg transition duration-300 ease-in-out">
                  <img
                    className="mb-4 h-40 mx-auto"
                    src={`/uploads/${item.imgpath}`}
                    // width={200}
                    alt=""
                  />
                  <div className="text-center">
                    <h2 className="mb-1 text-lg">{item.name}</h2>
                    <p className="mb-4 text-xs">({item.catname})</p>
                    <div className="flex items-center mx-16">
                      <select className="py-1 rounded-xl text-xs bg-slate-100 hover:bg-slate-200">
                        <option selected> REGULAR </option>
                        <option> LARGE </option>
                      </select>
                    </div>
                    <div className="flex items-center justify-around mt-6 mb-10">
                      <span className="font-bold text-lg">₹{item.price}</span>
                      {/* <button className="add-to-cart hover:bg-primary1 hover:border-pure hover:text-pure transition duration-200 py-1 px-6 rounded-full flex items-center">
                        <span className="font-medium">+</span>
                        <span className="ml-4 font-medium">Add</span>
                      </button> */}
                    </div>
                    <div className="bottom flex items-center justify-around mt-6 mb-6">
                      <a href={"/updateitem/" + item._id}>
                        <button
                          onClick={() => setData(item)}
                          className="hover:bg-primary1 hover:border-pure hover:text-pure transition duration-200 py-1 px-6 font-medium items-center add-to-cart"
                        >
                          <span className="font-medium">Modify</span>
                        </button>
                      </a>
                      <button
                        // data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenter"
                        onClick={() => onDelete(item._id)}
                        className="hover:bg-red-600 hover:border-pure border-red-600 delete text-red-600 hover:text-pure transition duration-200 py-1 px-6 ml-0 font-medium items-center"
                      >
                        <span className="font-medium">Delete</span>
                      </button>
                    </div>
                    <div
                      class="modal fade backdrop-blur-sm fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                      id="exampleModalCenter"
                      tabindex="-1"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-modal="true"
                      role="dialog"
                    >
                      <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                        <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                          <div class="flex flex-shrink-0 items-center justify-between p-4">
                            <button
                              type="button"
                              class="btn-close box-content ml-auto w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <svg
                            aria-hidden="true"
                            class="mb-4 mx-auto w-14 h-14 text-gray-400 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div class="relative">
                            <h3 class="text-lg font-normal text-center text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this product?
                            </h3>
                          </div>
                          <div class="flex flex-shrink-0 flex-wrap justify-center items-center p-4">
                            <button
                              type="button"
                              onClick={() => onDelete(item._id)}
                              data-bs-dismiss="modal"
                              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-4 py-2.5 text-center mr-2"
                            >
                              Yes, I'm sure
                            </button>
                            <button
                              type="button"
                              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 ml-5 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2.5 hover:text-gray-900 focus:z-10"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
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
  );
}
export default viewitem;
