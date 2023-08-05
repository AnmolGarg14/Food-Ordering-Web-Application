import "./additem.css";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom';
import axios from "axios";

function updatecategory() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_id, setID] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [subname, setSubname] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [desc, setDesc] = useState("");
  // const [checkbox, setCheckbox] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setName(localStorage.getItem("name"));
    setSubname(localStorage.getItem("subname"));
    setDesc(localStorage.getItem("desc"));
  }, []);

  const updateCategory = () => {
    axios
      .post(`/category/updatecategory/${_id}`, {
        _id,
        name,
        subname,
        desc,
      })
      .then((response) => {
        console.log(response.data);
        window.location = "/admin/home";
      });
  };

  return (
    <div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Update Category</h4>
      <div class="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          class="img"
          alt=""
        />
        <div class="pl-sm-4 pl-2" id="img-section">
          <h6>Category Image</h6>
          <p>Accepted file type .png. Less than 1MB</p>
          <input type="file" id="file"></input>
          {/* <button class="ml-auto border rounded py-1 px-3 bg-blue-100  hover:bg-blue-500 hover:text-white">
            {" "}
            Upload{" "}
          </button> */}
        </div>
      </div>
      <div class="py-2">
        <div class="row py-2">
          <div class="col-md-12">
            <label for="name"> Category Name</label>
            <input
              type="text"
              class="bg-light form-control"
              placeholder=" Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
        </div>

        <div class="py-2">
          <div class="row py-2">
            <div class="col-md-12">
              <label for="subname"> Category Subname</label>
              <input
                type="text"
                class="bg-light form-control"
                placeholder=" Category Subname"
                value={subname}
                onChange={(e) => setSubname(e.target.value)}
                name="subname"
              />
            </div>
          </div>

          <div class="py-2">
            <div class="row py-2">
              <div class="col-md-12">
                <label for="name"> Category Details</label>
                <input
                  type="text"
                  class="bg-light form-control"
                  placeholder=" Category Details"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  name="desc"
                />
              </div>
            </div>

            <div class="mt-5">
              <button
                onClick={updateCategory}
                class="bg-green-600 hover:bg-green-700 text-white rounded transition duration-300 py-2 px-2 mr-2"
              >
                Update Category
              </button>
              <button class="btn border button py-2">Cancel</button>
            </div>
            {/* <div class="d-sm-flex align-items-center pt-3" id="delete">
              <div>
                <b>Delete this category</b>
              </div>
              <div class="ml-auto">
                <button class="bg-red-500 hover:bg-red-600  text-white rounded transition duration-300 py-2 px-3 ">
                  Delete
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default updatecategory;
