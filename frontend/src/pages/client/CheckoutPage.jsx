/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Button from "../../components/utility/Button";
import useCheckout from "../../hooks/client/useCheckout";
import { useEffect } from "react";

const CheckoutPage = () => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    city,
    setCity,
    village,
    setVillage,
    address,
    setAddress,
    phone,
    setPhone,
    notes,
    setNotes,
    subTotal,
    setSubTotal,
    deliveryCharge,
    setDeliveryCharge,
    grandTotal,
    setGrandTotal,
    orderItems,
    setOrderItems,
    calculateGrandTotal,
    GrandTotal,
    onSubmit,
    loading,
  } = useCheckout();

  useEffect(() => {
    if (village === "Bhogwara") setDeliveryCharge(10);
    if (village === "Belhabandh") setDeliveryCharge(18);
    if (village === "Udagi") setDeliveryCharge(18);
    if (village === "Savdih") setDeliveryCharge(18);
    if (village === "Belhabandh (Kwajgi patti)") setDeliveryCharge(18);
    if (village === "Nevada") setDeliveryCharge(18);
    if (village === "Bhorai Ka Pura") setDeliveryCharge(18);
    if (village === "Sarai Hariram") setDeliveryCharge(20);
  }, [setDeliveryCharge, village]);

  return (
    <>
      <Helmet>
        <title>Checkout - Secure Payment | Vebzo</title>
        <meta
          name="description"
          content="Complete your purchase securely. Quick delivery of organic products at your doorstep."
        />
      </Helmet>
      <div className="w-full h-auto">
        <Header />
        <div className="w-full py-10 px-5 sm:px-10 bg-[#f8f6f3] text-left">
          <div className="py-5 border-b-4">
            <h1 className="text-5xl font-semibold amiri-quarn py-5">
              Checkout
            </h1>
          </div>

          <div className="flex xl:justify-between items-start gap-3 py-10 text-base flex-wrap xl:flex-nowrap">
            <div className="">
              <form className="w-full md:w-[650px] text-gray-600">
                <div className="w-full  border-b-2">
                  <h3 className="py-3 font-semibold">Billing Details</h3>
                </div>

                <div className="flex items-center gap-2 md:justify-between py-4 flex-wrap sm:flex-nowrap">
                  <div className="relative w-full">
                    <label htmlFor="fname" className="relative font-medium">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="fname"
                      value={firstname}
                      required
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full sm:w-[230px] md:w-[300px] bg-white h-12 px-3 outline-gray-300 border my-1"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lname" className="font-medium">
                      Last Name
                    </label>
                    <br />
                    <input
                      type="text"
                      id="lname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full sm:w-[230px] md:w-[300px] bg-white h-12 px-3 outline-gray-300 border my-1"
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                  >
                    <option value="Prayagraj">Prayagraj</option>
                  </select>
                </div>
                <div className="relative py-2">
                  <label
                    htmlFor="village"
                    className="ml-1 relative font-medium"
                  >
                    Village <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <select
                    type="text"
                    id="village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full h-12 px-3 bg-white outline-gray-300 border my-1"
                  >
                    <option value="Bhogwara">Bhogwara</option>
                    <option value="Udagi">Udagi</option>
                    <option value="Belhabandh (Kwajgi patti)">
                      Belhabandh (Kwajgi patti)
                    </option>
                    <option value="Savdih">Savdih</option>
                    <option value="Nevada">Nevada</option>
                    <option value="Bhorai Ka Pura">Bhorai Ka Pura</option>
                    <option value="Sarai Hariram">Sarai Hariram</option>
                  </select>
                </div>
                <div className="relative py-2">
                  <label
                    htmlFor="address"
                    className="ml-1 relative font-medium"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-12 px-3 py-2 bg-white outline-gray-300 border my-1"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </form>
            </div>
            <div className="flex w-full items-center xl:justify-end text-gray-800">
              <div className="w-[350px] h-auto border-2 text-base">
                <div className="border-b px-5 py-4">
                  <h1 className="text-lg font-semibold">Cart Total</h1>
                </div>
                <table className="my-3 mx-3">
                  <tr className="border-b">
                    <td className="px-4 py-4 w-40">Sub Total</td>
                    <td className="px-4 py-4 w-auto">Rs. {subTotal}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-4 w-40">Delivery Charge</td>
                    <td className="px-4 py-4 w-auto">Rs. {deliveryCharge}</td>
                  </tr>
                  {/* <tr className="border-b">
                  <td className="px-4 py-4 w-40">Shipping</td>
                  <td className="px-4 py-4 w-auto">
                    Free shipping <br /> Shipping to Bhogwara, Ugrasenpur,
                    Prayagraj, Prayagraj 212405, Uttar Pradesh.
                    <br /> Change addres
                  </td>
                </tr> */}
                  <tr className="border-b">
                    <td className="px-4 py-4 w-40">Total</td>
                    <td className="px-4 py-4 w-auto">
                      Rs. {subTotal + deliveryCharge}
                    </td>
                  </tr>
                </table>
                <div className="px-3 py-5">
                  <Button
                    width={"w-full"}
                    onClick={onSubmit}
                    className=" flex-center"
                    label={loading ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
