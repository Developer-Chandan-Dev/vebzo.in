/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Button from "../../components/utility/Button";
import CartTr from "../../components/client/cart/CartTr";
import TableContainer from "../../components/dashboard/common/TableContainer";
import Empty from "../../components/utility/Empty";
import useCart from "../../hooks/client/useCart";

const CartPage = () => {
  const {
    userId,
    setUserId,
    subTotal,
    setSubTotal,
    deliveryCharge,
    setDeliveryCharge,
    authUser,
    cartItems,
    status,
    error,
    calculateGrandTotal,
    handleRemoveToCart,
    updatedQuantities,
    setUpdatedQuantities,
    handleQuantityChange,
    handleUpdateClick,
  } = useCart();

  return (
    <div className="w-full h-auto">
      <Header />

      <div className="w-full py-10 px-3 sm:px-10 bg-[#f8f6f3] text-left">
        <div>
          <h1 className="text-5xl font-semibold amiri-quarn py-5">Cart</h1>
          <TableContainer>
            <table className="border w-[600px] sm:w-[660px] md:w-full text-center my-5 text-[15px] text-gray-800 overflow-x-auto">
              <thead>
                <tr className="bg-white border">
                  <th colSpan={2} className="px-5 py-4"></th>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4 text-left" colSpan={2}>
                    Subtotal
                  </th>
                  {/* <th className="px-5 py-4">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {updatedQuantities && updatedQuantities.length > 0 ? (
                  updatedQuantities.map((product) => (
                    <CartTr
                      key={product?.productId}
                      productId={product?.productId}
                      name={product?.name}
                      price={product?.price}
                      quantity={product?.quantity}
                      imageUrl={product?.imageUrl}
                      updatedQuantities={updatedQuantities[product?.productId]}
                      handleRemoveToCart={handleRemoveToCart}
                      handleQuantityChange={handleQuantityChange}
                      handleUpdateClick={handleUpdateClick}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <Empty />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableContainer>
        </div>
        <div className="flex w-full items-center justify-end text-gray-800">
          <div className="w-[350px] h-auto border-2 text-base">
            <div className="border-b px-5 py-4">
              <h1 className="text-lg font-semibold">Cart Total</h1>
            </div>
            <table className="my-3 mx-3">
              <tr className="border-b">
                <td className="px-4 py-4 w-40">Sub Total</td>
                <td className="px-4 py-4 w-auto">Rs. {subTotal || 0}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-4 w-40">Delivery Charge</td>
                <td className="px-4 py-4 w-auto">Rs. {deliveryCharge || 0}</td>
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
                  Rs. {subTotal + deliveryCharge || 0}
                </td>
              </tr>
            </table>
            <div className="px-3 py-5">
              <Link to="/checkout">
                {" "}
                <Button
                  width={"w-full"}
                  className=" flex-center"
                  label="PROCEED TO CHECKOUT"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
