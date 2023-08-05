import "./additem.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function addcategory() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [file, setFile] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [admin, setAdmin] = useState({
  //   name: "",
  //   subname: "",
  //   desc: "",
  // });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [error, setError] = useState("");
  // let name, value;

  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;

  //   setAdmin({ ...admin, [name]: value });
  // };

  // const setimgfile = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const config = {
  //   Headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // };

  // const AddCategory = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const url = "/category/addcategory";
  //     const { data: res } = await axios.post(url, { admin, file }, config);
  //     window.location = "/admin/home";
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setError(error.response.data.message);
  //     }
  //   }
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [file, setFile] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [subname, setSubname] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [desc, setDesc] = useState("");

  // const history = useNavigate();

  // const setdata = (e) => {
  //   const { value } = e.target;
  //   setName(value);
  //   setSubname(value);
  //   setDesc(value);
  // };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // adduser data

  const AddCategory = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("subname", subname);
    formData.append("desc", desc);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/category/addcategory", formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      window.location = "/admin/home";
    }
  };

  return (
    <div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Add Category</h4>
      <div class="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          class="img"
          alt=""
        />
        <div class="pl-sm-4 pl-2" id="img-section">
          <h6>Category Image</h6>
          <p>Accepted file type .png. Less than 1MB</p>
          <input
            type="file"
            name="image"
            // onChange={(e) => setFile(e.target.files[0])}
            onChange={setimgfile}
          ></input>
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
              // value={admin.name}
              // onChange={handleInputs}
              // onChange={setdata}
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
                // value={admin.subname}
                // onChange={handleInputs}
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
                  // value={admin.desc}
                  // onChange={handleInputs}
                  // onChange={setdata}
                  onChange={(e) => setDesc(e.target.value)}
                  name="desc"
                />
              </div>
            </div>

            <div class="py-3 pb-4 border-bottom">
              <button
                onClick={AddCategory}
                class="bg-orange-400 hover:bg-orange-500 text-white rounded transition duration-300 py-2 px-2 mr-2"
              >
                Add Category
              </button>
              <Link to="/admin/home">
                <button class="btn border button py-2">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default addcategory;
