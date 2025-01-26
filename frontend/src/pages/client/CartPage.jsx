import { XCircle } from "lucide-react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Button from "../../components/utility/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../store/features/cartSlice";


const CartPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);
  
  const { cartItems, status, error } = useSelector((state) => state.cart);
  console.log(cartItems, status, error);

  return (
    <div className="w-full h-auto">
      <Header />

      <div className="w-full py-10 px-10 bg-[#f8f6f3] text-left">
        <div>
          <h1 className="text-5xl font-semibold amiri-quarn py-5">Cart</h1>
          <table className="border w-full text-center my-5 text-[15px] text-gray-800">
            <thead>
              <tr className="bg-white border">
                <th colSpan={2} className="px-5 py-4"></th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.length > 0 && cartItems !== null
                ? cartItems.map((product) => (
                    <tr className="border-b" key={product?._id}>
                      <td className="py-3 px-5" colSpan={2}>
                        <div className="flex items-center justify-around">
                          <XCircle className="text-gray-400 transition-all cursor-pointer hover:text-gray-600" />
                          <img
                            src={
                              product?.imageUrl
                                ? product?.imageUrl
                                : "/public/images/potato-1.webp"
                            }
                            className="size-20"
                            alt="potato"
                          />
                        </div>
                      </td>
                      <td className="py-3">{product?.product?.name}</td>
                      <td className="py-3">{product?.product?.price}</td>
                      <td className="py-3">
                        <input
                          type="number"
                          value={product?.quantity}
                          className="w-16 h-10 pl-4 border outline-none "
                        />
                      </td>
                      <td className="py-3">
                        {parseInt(product?.quantity) * parseInt(product?.product?.price)}
                      </td>
                    </tr>
                  ))
                : ""}
              {/* <tr className="border-b">
                <td className="py-3 px-5" colSpan={2}>
                  <div className="flex items-center justify-around">
                    <XCircle className="text-gray-400 transition-all cursor-pointer hover:text-gray-600" />
                    <img
                      src="/public/images/potato-1.webp"
                      className="size-20"
                      alt="potato"
                    />
                  </div>
                </td>
                <td className="py-3"> Potato</td>
                <td className="py-3">20</td>
                <td className="py-3">
                  <input
                    type="number"
                    className="w-16 h-10 pl-4 border outline-none "
                  />
                </td>
                <td className="py-3">20</td>
              </tr> */}
            </tbody>
            <tfoot>
              <tr className="">
                <td colSpan={6} className="py-3">
                  <div className=" flex items-center justify-end">
                    <Button label="UPDATE CART" className="mr-5" />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
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
