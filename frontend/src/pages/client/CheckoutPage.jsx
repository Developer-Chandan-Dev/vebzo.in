import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Button from "../../components/utility/Button";

const CheckoutPage = () => {
  return (
    <div className="w-full h-auto">
      <Header />
      <div className="w-full py-10 px-10 bg-[#f8f6f3] text-left">
        <div className="py-5 border-b-4">
          <h1 className="text-5xl font-semibold amiri-quarn py-5">Checkout</h1>
        </div>

        <div className="flex justify-between items-start gap-3 py-10 text-base">
          <div className="">
            <form className="w-[650px] text-gray-600">
              <div className="w-full  border-b-2">
                <h3 className="py-3 font-semibold">Billing Details</h3>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="relative">
                  <label htmlFor="fname" className="relative font-medium">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fname"
                    className="w-[300px] bg-white h-12 px-3 outline-gray-300 border my-1"
                    placeholder="Your First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="font-medium">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="lname"
                    className="w-[300px] bg-white h-12 px-3 outline-gray-300 border my-1"
                    placeholder="Your Last Name"
                  />
                </div>
              </div>
              <div className="relative py-2">
                <label htmlFor="city" className="ml-1 relative font-medium">
                  City <span className="text-red-600">*</span>
                </label>
                <br />
                <select
                  type="text"
                  id="city"
                  className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                >
                  <option value="Prayagraj">Prayagraj</option>
                </select>
              </div>
              <div className="relative py-2">
                <label htmlFor="village" className="ml-1 relative font-medium">
                  Village <span className="text-red-600">*</span>
                </label>
                <br />
                <select
                  type="text"
                  id="village"
                  className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                >
                  <option value="Bhogwara">Bhogwara</option>
                  <option value="Udagi">Udagi</option>
                  <option value="Belhabandh">Belhabandh</option>
                </select>
              </div>
              <div className="relative py-2">
                <label htmlFor="address" className="ml-1 relative font-medium">
                  Address <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  id="address"
                  className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                  placeholder="Your Address..."
                />
              </div>
              <div className="relative py-2">
                <label htmlFor="city" className="ml-1 relative font-medium">
                  Phone <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  id="city"
                  className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                  placeholder="Your Phone Name"
                />
              </div>
              <div className="relative py-2">
                <label htmlFor="city" className="ml-1 relative font-medium">
                  Order notes (optional)
                </label>
                <br />
                <textarea
                  type="text"
                  id="city"
                  className="w-full h-12 px-3 py-2 bg-white outline-gray-300 border my-1"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </div>
            </form>
          </div>
          <div className="flex w-full items-center justify-end text-gray-800">
            <div className="w-[550px] h-auto border-2 text-base">
              <div className="border-b px-5 py-4">
                <h1 className="text-lg font-semibold">Cart Total</h1>
              </div>
              <table className="my-3 mx-3">
                <tr className="border-b">
                  <td className="px-4 py-4 w-40">Sub Total</td>
                  <td className="px-4 py-4 w-auto">Rs. 20.00</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-4 w-40">Shipping</td>
                  <td className="px-4 py-4 w-auto">
                    Free shipping <br /> Shipping to Bhogwara, Ugrasenpur,
                    Prayagraj, Prayagraj 212405, Uttar Pradesh.
                    <br /> Change addres
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-4 w-40">Total</td>
                  <td className="px-4 py-4 w-auto">20.00</td>
                </tr>
              </table>
              <div className="px-3 py-5">
                <Button
                  width={"w-full"}
                  className=" flex-center"
                  label="PROCEED TO CHECKOUT"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
