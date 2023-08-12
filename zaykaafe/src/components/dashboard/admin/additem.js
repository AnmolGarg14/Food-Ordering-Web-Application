import "./additem.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function additem() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [catname, setCatname] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [file, setFile] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [size, setSize] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [price, setPrice] = useState("");

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // adduser data

  const AddItem = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("image", file);
    formData.append("catname", catname);
    formData.append("name", name);
    formData.append("size", size);
    formData.append("price", price);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "https://food-ordering-web-application-iota.vercel.app/item/additem",
      formData,
      config
    );

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      window.location = "/admin/home";
    }
  };

  return (
    <div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Add Item</h4>
      <div class="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          class="img"
          alt=""
        />
        <div class="pl-sm-4 pl-2" id="img-section">
          <h6>Item Image</h6>
          <p>Accepted file type .png. Less than 1MB</p>
          <input type="file" name="image" onChange={setimgfile}></input>
        </div>
      </div>
      <div class="py-2">
        <div class="row py-2">
          <div class="col-md-12">
            <label for="catname"> Category Name</label>
            <input
              type="text"
              class="bg-light form-control"
              placeholder="Category Name"
              onChange={(e) => setCatname(e.target.value)}
              name="catname"
            />
          </div>
        </div>

        <div class="row py-2">
          <div class="col-md-12">
            <label for="name"> Item Name</label>
            <input
              type="text"
              class="bg-light form-control"
              placeholder=" Item Name"
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
        </div>

        <div class="py-2">
          <div class="row py-2">
            <div class="col-md-12">
              <label for="size"> Item Size</label>
              <input
                type="text"
                class="bg-light form-control"
                placeholder=" Item Size"
                onChange={(e) => setSize(e.target.value)}
                name="size"
              />
            </div>
          </div>

          <div class="py-2">
            <div class="row py-2">
              <div class="col-md-12">
                <label for="name"> Item Price</label>
                <input
                  type="text"
                  class="bg-light form-control"
                  placeholder=" Item Price"
                  onChange={(e) => setPrice(e.target.value)}
                  name="desc"
                />
              </div>
            </div>

            <div class="py-3 pb-4 border-bottom">
              <button
                onClick={AddItem}
                class="bg-orange-400 hover:bg-orange-500 text-white rounded transition duration-300 py-2 px-2 mr-2"
              >
                Add Item
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

export default additem;
