import "./review.css";

function review() {
  return (
    <div className="container flex justify-content-center mt-5">
      <div className="card text-center mb-5">
        <br />
        <h2 className="font-semibold">Review</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="name"
          >
            Enter Name
          </label>
          <input
            className="shadow appearance-none border rounded w-72 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="review"
          >
            Review
          </label>
          <textarea
            className="shadow appearance-none border rounded w-max  py-0 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            cols="30"
            name="comment"
            form="usrform"
            id="text"
            type="text"
            placeholder="Review"
          ></textarea>
        </div>

        <div className="rate bg-zinc-700 py-3 text-white mt-3">
          <h6 className="mb-0">Rating</h6>

          <div className="rating">
            <input type="radio" name="rating" value="5" id="5" />
            <label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4" />
            <label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3" />
            <label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2" />
            <label for="2">☆</label>
            <input type="radio" name="rating" value="1" id="1" />
            <label for="1">☆</label>
          </div>

          <div>
            <button
              className="transition duration-300 bg-orange-400 font-bold mt-3 px-3 py-2 hover:bg-orange-500 btn-block rating-submit"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default review;
