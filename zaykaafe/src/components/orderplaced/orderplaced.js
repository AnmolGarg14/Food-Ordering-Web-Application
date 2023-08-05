import "./orderplaced.css";

function OrderPlaced() {
  return (
    <section className="my-10">
      {/* <div>
          <h1 className="pb-4 font-semibold text-center"> About Us</h1>
        </div> */}
      <div>
        <p className="text-center mx-60 mb-3 mt-40 text-3xl font-extrabold head">
          Your order has been successfully placed!
        </p>
        <p className="text-center text-3xl mb-40 font-extrabold head">
          Keep Ordering...
        </p>
      </div>
    </section>
  );
}

export default OrderPlaced;
