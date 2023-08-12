import "./dashboard.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const response = await axios.get(
      "https://food-ordering-web-application-iota.vercel.app/category/getcategory"
    );
    console.log(response.data.data);
    setCategory(await response.data.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const setData = (data) => {
    let { _id, name, subname, desc } = data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("name", name);
    localStorage.setItem("subname", subname);
    localStorage.setItem("desc", desc);
  };

  const onDelete = (_id) => {
    axios
      .delete(
        `https://food-ordering-web-application-iota.vercel.app/category/deletecategory/${_id}`
      )
      .then(() => {
        getCategory();
      });
  };

  return (
    <>
      <section className="my-10">
        <h2 className="mx-16 pb-4 font-semibold border-b-zinc-400 border-b">
          Categories
        </h2>

        <a
          href="/addcategory"
          className="bg-primary1 decoration-transparent ml-16 mt-2 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Add Category
        </a>

        <a
          href="/additem"
          className="bg-primary1 decoration-transparent mx-5 mt-2 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Add Item
        </a>

        <a
          href="/viewitem"
          className="bg-primary1 decoration-transparent mx-2 mt-2 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
          type="button"
        >
          View Item
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-gap-12 gap-y-11 mx-16 mt-10 mb-14">
          {category.map((cate) => {
            return (
              <div>
                <div className="rounded-2xl hover:shadow-2xl border-transparent border-2 hover:border-neutral-300 hover:border-solid transition duration-300 ease-in-out w-full md:w-64">
                  <img
                    className="h-40 mb-4 mx-auto"
                    src={`/uploads/${cate.imgpath}`}
                    alt=""
                  />
                  <div className="text-center content p-7">
                    <div className="title">{cate.name}</div>
                    <div className="sub-title">{cate.subname}</div>
                    <div className="bottom">
                      <p>{cate.desc}</p>
                    </div>
                    <div className="bottom flex items-center justify-around mt-6 mb-6">
                      <a href={"/updatecategory/" + cate._id}>
                        <button
                          onClick={() => setData(cate)}
                          className="hover:bg-primary1 hover:border-pure hover:text-pure transition duration-200 py-1 px-6 font-medium items-center add-to-cart"
                        >
                          <span className="font-medium">Modify</span>
                        </button>
                      </a>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenter"
                        className="hover:bg-red-600 hover:border-pure border-red-600 delete text-red-600 hover:text-pure transition duration-200 py-1 px-6 font-medium items-center"
                      >
                        <span className="font-medium">Delete</span>
                      </button>
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
                                Are you sure you want to delete this category?
                              </h3>
                            </div>
                            <div class="flex flex-shrink-0 flex-wrap justify-center items-center p-4">
                              <button
                                type="button"
                                onClick={() => onDelete(cate._id)}
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
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
