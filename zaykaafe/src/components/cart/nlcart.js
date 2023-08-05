import pizza from "../../images/pizza.png";

function NLCart() {
  return (
    <>
      <section className="cart py-16 bg-zinc-100">
        {/* <div className="mb-36">
          <div>
            <div className="empty-cart-cls text-center ">
              <img src={""} width={270} height={270} className="mx-auto mt-4" />
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
        </div> */}
        <div className="flex">
          <div className="left my-24 ml-44">
            <p className="italic font-light mb-3">Are you hungry?</p>
            <p className="text-5xl font-extrabold">Don't Wait!</p>
            <div className="mt-5">
              <a
                href="/"
                className="bg-orange-500 hover:bg-orange-600 rounded-full text-white font-bold py-2.5 px-6 focus:outline-none focus:shadow-outline decoration-transparent transition duration-300"
              >
                Order Now
              </a>
            </div>
            <div className="mt-4">
              <p className="font-extralight italic">
                To order you have to login first, to login{" "}
                <a
                  href="/login"
                  className=" hover:text-cyan-600 decoration-transparent transition duration-300"
                >
                  Click Here
                </a>
              </p>
            </div>
          </div>
          <div className="right ml-48">
            <img src={pizza} width={500} />
          </div>
        </div>
      </section>
    </>
  );
}
export default NLCart;
