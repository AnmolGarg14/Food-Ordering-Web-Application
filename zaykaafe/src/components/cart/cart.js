import "./cart.css";
import ecart from "../../images/ecart.PNG";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Subtotal from "./subtotal";
import cart from "../../images/cart-black.png";
import { Logincontext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cartdata, setCartdata] = useState("");
  const { account, setAccount } = useContext(Logincontext);

  const getcartdata = async () => {
    const res = await axios.get("/cart/cartdetails");

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata(res.data.carts);
    }
  };

  const removedata = async (_id) => {
    try {
      const res = await axios.delete(`/cart/remove/${_id}`);
      console.log(res);
      if (res.status === 400 || !res) {
        console.log("error");
      } else {
        setAccount(res.data.carts);
        getcartdata();
        toast.error("Item remove from cart!", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [profile, setProfile] = useState({
    number: "",
    address: "",
  });

  const getValiduser = async () => {
    try {
      const res = await axios.get("/users/profile");
      if (res) {
        setProfile({
          ...profile,
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

  useEffect(() => {
    getcartdata();
    getValiduser();
  }, []);

  return (
    <>
      {cartdata.length ? (
        <section className="cart py-16">
          <div className="mx-auto lg:w-1/2">
            <div className="container">
              <div className="flex items-center border-b border-gray-300 pb-4">
                <img src={cart} alt="cart" />
                <h1 className="font-bold ml-4 text-2xl">Order summary</h1>
              </div>
              <div className="pizza-list">
                {cartdata.map((cart, key) => {
                  return (
                    <>
                      <div className="flex items-center my-8">
                        <img
                          className="w-36 rounded-lg mr-5"
                          src={`/uploads/${cart.imgpath}`}
                          alt=""
                        />
                        <div className="flex-1 ml-4">
                          <h1 className="text-lg">{cart.name}</h1>
                          <span>{cart.size}</span>
                        </div>
                        <span className="flex-1 ml-3">1 Pcs</span>
                        <div className="flex-1">
                          <button onClick={() => removedata(cart._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="red"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                        <span className="font-bold text-lg">₹{cart.price}</span>
                      </div>
                    </>
                  );
                })}
              </div>
              <hr />
              <div className="text-right">
                <Subtotal item={cartdata} />

                <div>
                  <form className="mt-12">
                    <div className="relative w-1/2 ml-auto mb-4">
                      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                        <option value="cod">Cash on delivery</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      name="number"
                      className="border border-gray-400 p-2 w-1/2 mb-4"
                      type="text"
                      value={profile.number}
                      onChange={handleInputs}
                      placeholder="+91 9999999999"
                    />
                    <br />
                    <input
                      name="address"
                      className="border border-gray-400 p-2 w-1/2"
                      type="text"
                      value={profile.address}
                      onChange={handleInputs}
                      placeholder="Address"
                    />
                    <div className="mt-4">
                      <Link to="/order-placed">
                        <button
                          className="bg-primary1 hover:bg-primaryhover rounded-full text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Order Now
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      ) : (
        <section className="cart py-16">
          <div className="mb-36">
            <div>
              <div className="empty-cart-cls text-center ">
                <img
                  src={ecart}
                  width={270}
                  height={270}
                  className="mx-auto mt-4"
                />
                <p className="text-xl text-neutral-600 font-semibold mb-1">
                  Your cart is empty
                </p>
                <p className="text-neutral-500 text-sm">
                  You can go to home page to view more cuisines or food
                </p>
                <br></br>
                <a
                  href="/"
                  className="bg-orange-500 hover:bg-orange-600 rounded text-white font-bold py-2 px-7 focus:outline-none focus:shadow-outline decoration-transparent transition duration-300"
                >
                  CONTINUE SHOPPING
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default Cart;
