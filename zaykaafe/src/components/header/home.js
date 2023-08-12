import "./header.css";
import logo from "../../images/bikelogo.png";
import React, { useContext, useEffect, useState } from "react";
import { Logincontext } from "../context/ContextProvider";
import axios from "axios";

const Home = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    const res2 = await axios.get(
      "https://food-ordering-web-application-iota.vercel.app/users/logout"
    );
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("LOGOUT");
      window.location = "/login";
    }
  };

  const [userlocation, setUserlocation] = useState("");
  const { account, setAccount } = useContext(Logincontext);

  const getvaliduser = async () => {
    const res = await axios.get(
      "https://food-ordering-web-application-iota.vercel.app/users/validuser"
    );
    if (res.status !== 201) {
      console.log("error");
    } else {
      setAccount(res.data.carts);
    }
  };

  useEffect(() => {
    location();
    getvaliduser();
  }, []);

  const location = () => {
    const success = (position) => {
      // console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          setUserlocation(
            data.city +
              ", " +
              data.principalSubdivision +
              ", " +
              data.countryName +
              "(" +
              data.countryCode +
              ")"
          );
        });
    };

    const error = () => {
      // console.log("error");
      setUserlocation("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <section className="sticky top-0 z-50">
      <nav className="mx-auto flex items-center justify-between py-1 shadow-sm appearance-none bg-white">
        <div className="flex items-center">
          <div className="ml-1 shrink-0 md:ml-6 lg:ml-8 xl:ml-10 w-56 md:w-60 lg:w-52 xl:w-48 icon">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>

          <div>
            <button onClick={location}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-red-500 ml-10"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            <p className="mt-3 ml-2 font-light text-neutral-600 text-sm">
              {userlocation}
            </p>
          </div>
        </div>

        <div className="pt-3 mr-10">
          <ul className="flex items-center">
            <li className="ml-12 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <a
                href="/offer"
                className="text-dark decoration-transparent font-semibold ml-2"
              >
                Offers
              </a>
            </li>
            <li className="ml-12 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <a
                href="/review"
                className="text-dark decoration-transparent font-semibold ml-2"
              >
                Review
              </a>
            </li>
            <li className="ml-12 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                />
              </svg>
              <a
                href="/customer-support"
                className="text-dark decoration-transparent font-semibold ml-2"
              >
                Help
              </a>
            </li>
            <li className="ml-12 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <a
                href="/profile"
                className="text-dark decoration-transparent font-semibold ml-2"
              >
                Profile
              </a>
            </li>
            <li className="ml-12 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <button
                className="text-dark decoration-transparent font-semibold ml-2"
                onClick={handleLogout}
              >
                Log out
              </button>
            </li>
            <div
              className="fas fa-bars px-2.5 py-2 bg-zinc-200 text-xl hover:text-slate-50
            rounded transition duration-200 text-zinc-800 hidden"
              id="menu-btn"
            ></div>
            <li className="ml-12">
              <a href="/checkout">
                <div>
                  <div
                    className="fas fa-shopping-cart shopping-cart text-xl px-2.5 py-2.5 bg-zinc-200 hover:bg-orange-500 hover:text-slate-50
              rounded transition duration-200 text-zinc-800"
                  ></div>
                  <div class="inline-flex absolute top-2 right-7 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                    {account.length}
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Home;
