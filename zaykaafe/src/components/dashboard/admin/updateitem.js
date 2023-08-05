import "./additem.css";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom';
import axios from "axios";

function updateitem() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_id, setID] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [size, setSize] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [price, setPrice] = useState("");
  // const [checkbox, setCheckbox] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setName(localStorage.getItem("name"));
    setSize(localStorage.getItem("size"));
    setPrice(localStorage.getItem("price"));
  }, []);

  const updateItem = () => {
    axios
      .post(`/item/updateitem/${_id}`, {
        _id,
        name,
        size,
        price,
      })
      .then((response) => {
        console.log(response.data);
        window.location = "/viewitem";
      });
  };

  return (
    <div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Update Item</h4>
      <div class="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          class="img"
          alt=""
        />
        <div class="pl-sm-4 pl-2" id="img-section">
          <h6>Item Image</h6>
          <p>Accepted file type .png. Less than 1MB</p>
          <input type="file" id="file"></input>
        </div>
      </div>
      <div class="py-2">
        <div class="row py-2">
          <div class="col-md-12">
            <label for="name"> Item Name</label>
            <input
              type="text"
              class="bg-light form-control"
              placeholder=" Item Name"
              value={name}
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
                placeholder="Item Size"
                value={size}
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
                  placeholder="Item Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="price"
                />
              </div>
            </div>

            <div class="mt-5">
              <button
                onClick={updateItem}
                class="bg-green-600 hover:bg-green-700 text-white rounded transition duration-300 py-2 px-2 mr-2"
              >
                Update Item
              </button>
              <button class="btn border button py-2">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default updateitem;
