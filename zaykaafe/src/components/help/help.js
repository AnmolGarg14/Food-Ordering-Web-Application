/* eslint-disable react-hooks/rules-of-hooks */
import "./help.css";
import { useState, useEffect } from "react";
import axios from "axios";

function help() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    number: "",
  });

  const getValiduser = async () => {
    try {
      const res = await axios.get(
        "https://food-ordering-web-application-iota.vercel.app/users/profile"
      );
      if (res) {
        setProfile({
          ...profile,
          name: res.data.name,
          email: res.data.email,
          number: res.data.number,
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
    getValiduser();
  }, []);

  return (
    <>
      <div className="wrapper bg-white mt-sm-5">
        <div>
          <h4 className="pb-4 border-bottom">Contact Us</h4>
          <form action="https://formspree.io/f/mjvzdezj" method="POST">
            <div className="py-2">
              <div className="row py-2">
                <div className="col-md-12">
                  <label> Name</label>
                  <input
                    type="text"
                    className="bg-light form-control"
                    name="Name"
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
                    name="Email"
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
                    name="Number"
                    value={profile.number}
                    onChange={handleInputs}
                    placeholder="+91 9999999999"
                  />
                </div>
              </div>
              <div className="row py-2">
                <div className="col-md-12">
                  <label for="address"> Message </label>
                  <textarea
                    type="text"
                    className="bg-light form-control"
                    name="Message"
                    placeholder="Message"
                  />
                </div>
              </div>
              <div className="py-3 pb-4 border-bottom">
                <button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-500 text-white rounded transition duration-300 py-2 px-3 mr-2"
                >
                  Send
                </button>
                <button className="btn border button py-2">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default help;
