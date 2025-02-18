/* eslint-disable no-unused-vars */
import { XCircle } from "lucide-react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Button from "../../components/utility/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  updateCart,
} from "../../store/features/cartSlice";
import { toast } from "react-toastify";
import CartTr from "../../components/client/cart/CartTr";

const CartPage = () => {
  const [userId, setUserId] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user.user);
  const { cartItems, status, error } = useSelector((state) => state.cart);
  console.log(cartItems);
  useEffect(() => {
    dispatch(fetchCartItems(authUser?._id));
  }, [authUser?._id, dispatch]);

  useEffect(() => {
    setUserId(authUser?._id);
  }, [authUser]);

  const calculateGrandTotal = (cartItems) => {
    return (
      cartItems?.items?.length > 0 &&
      cartItems?.items?.reduce((total, item) => {
        return total + item.quantity * item?.price;
      }, 0)
    );
  };

  // Usage
  const grandTotal = calculateGrandTotal(cartItems);

  useEffect(() => {
    setSubTotal(parseInt(grandTotal));
  }, [grandTotal]);

  const handleRemoveToCart = async (productId) => {
    dispatch(
      removeFromCart({ userId: authUser?._id, productId: productId })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(authUser?._id));
        toast.success("Cart item is deleted successfully");
      }
    });
  };

  const [updatedQuantities, setUpdatedQuantities] = useState([]);

  useEffect(() => {
    setUpdatedQuantities(cartItems?.items ? cartItems?.items : cartItems);
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    // Update cartItems.items correctly
    const updatedItems = cartItems?.items?.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    console.log(updatedItems, "Updated Items");
    setUpdatedQuantities(updatedItems);
  };

  console.log(updatedQuantities, cartItems?.items);

  // Update Redux store & backend when "Update" button is clicked
  const handleUpdateClick = (productId, quantity) => {
    console.log(quantity, productId);
    dispatch(updateCart({ userId, productId, quantity })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item updated successfully");
      }
    }); // Call API & Redux
  };

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
                <th className="px-5 py-4 text-left" colSpan={2}>
                  Subtotal
                </th>
                {/* <th className="px-5 py-4">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {updatedQuantities && updatedQuantities.length > 0
                ? updatedQuantities.map((product) => (
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
                : ""}
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
                <td className="px-4 py-4 w-auto">Rs. {subTotal}</td>
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
                <td className="px-4 py-4 w-auto">
                  Rs. {subTotal + deliveryCharge}
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
