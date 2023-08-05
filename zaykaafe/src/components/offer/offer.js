import offer from "../../images/offer.PNG";

function Offer() {
  return (
    <>
      <div>
        <img src={offer} alt="Offer" />
      </div>
      <div className="my-10 mx-10">
        <h5 className="font-semibold">Payment Offers/Coupons</h5>
        <hr />
      </div>
      <div>
        <h2 className="text-center my-20 mx-10">
          Stay tuned for more offers!!
        </h2>
      </div>
    </>
  );
}

export default Offer;
