/* eslint-disable react-hooks/rules-of-hooks */
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const getValiduser = async () => {
    try {
      const res = await axios.get("/users/profile");
      if (res) {
        setProfile({
          ...profile,
          name: res.data.name,
          email: res.data.email,
          number: res.data.number,
          address: res.data.address,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfile({ ...profile, [name]: value });
  };

  const updatedata = async (e) => {
    e.preventDefault();

    const { name, email, number, address } = profile;
    const data = await axios.post("/users/updateprofile", {
      name,
      email,
      number,
      address,
    });
    if (!data) {
      console.log("Profile Not Updated");
    } else {
      toast.success("Profile Updated", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      getValiduser();
    }
  };

  const deleteaccount = async () => {
    axios.delete("/users/deleteaccount").then(() => {
      localStorage.removeItem("token");
      window.location = "/";
      toast.error("Account Successfully Deleted", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    });
  };

  useEffect(() => {
    getValiduser();
  }, []);

  return (
    <>
      <div className="wrapper bg-white mt-sm-5">
        <div>
          <h4 className="pb-4 border-bottom">Account settings</h4>
          <div className="d-flex align-items-start py-3 border-bottom">
            <img
              src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className="img"
              alt=""
            />
            <div className="pl-sm-4 pl-4" id="img-section">
              <b>Profile Photo</b>
              <p>Accepted file type .png. Less than 1MB</p>
              <input type="file" id="file"></input>
              <button className="mt-3 border rounded py-1 px-3 bg-blue-100  hover:bg-blue-500 hover:text-white">
                Upload
              </button>
            </div>
          </div>
          <div className="py-2">
            <div className="row py-2">
              <div className="col-md-12">
                <label> Name</label>
                <input
                  type="text"
                  className="bg-light form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleInputs}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-6">
                <label>Email Address</label>
                <input
                  type="text"
                  className="bg-light form-control"
                  name="email"
                  value={profile.email}
                  onChange={handleInputs}
                  placeholder="zaykaa@gmail.com"
                />
              </div>
              <div className="col-md-6 pt-md-0 pt-3">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="bg-light form-control"
                  name="number"
                  value={profile.number}
                  onChange={handleInputs}
                  placeholder="+91 9999999999"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-12">
                <label for="address"> Address</label>
                <textarea
                  type="text"
                  className="bg-light form-control"
                  name="address"
                  value={profile.address}
                  onChange={handleInputs}
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-6">
                <label for="country">Country</label>
                <select name="country" id="country" className="bg-light">
                  <option value="india" selected>
                    India
                  </option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="uae">UAE</option>
                </select>
              </div>
              <div className="col-md-6 pt-md-0 pt-3" id="lang">
                <label for="language">Language</label>
                <div className="arrow">
                  <select name="language" id="language" className="bg-light">
                    <option value="english" selected>
                      English
                    </option>
                    <option value="english_us">English (United States)</option>
                    <option value="enguk">English UK</option>
                    <option value="arab">Arabic</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="py-3 pb-4 border-bottom">
              <button
                onClick={updatedata}
                className="bg-orange-400 hover:bg-orange-500 text-white rounded transition duration-300 py-2 px-2 mr-2"
              >
                Save Changes
              </button>
              <button className="btn border button py-2">Cancel</button>
            </div>
            <div className="d-sm-flex align-items-center pt-3" id="deactivate">
              <div>
                <b>Delete your account</b>
                <p>Details about your account and password</p>
              </div>
              <div className="ml-auto">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                  className="bg-red-500 hover:bg-red-600  text-white rounded transition duration-300 py-2 px-3 "
                >
                  Delete
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
                        Are you sure you want to delete this account?
                      </h3>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap justify-center items-center p-4">
                      <button
                        type="button"
                        onClick={deleteaccount}
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
      <ToastContainer />
    </>
  );
}

export default profile;
