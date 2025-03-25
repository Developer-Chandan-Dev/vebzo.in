import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart, updateCart } from "../../store/features/cartSlice";

const useCart = () => {
    const [userId, setUserId] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(10);
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.user.user);
    const { cartItems, status, error } = useSelector((state) => state.cart);

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

        setUpdatedQuantities(updatedItems);
    };

    // Update Redux store & backend when "Update" button is clicked
    const handleUpdateClick = (productId, quantity) => {
        dispatch(updateCart({ userId, productId, quantity })).then((data) => {
            if (data?.payload?.success) {
                toast.success("Item updated successfully");
            }
        }); // Call API & Redux
    };

    return { userId, setUserId, subTotal, setSubTotal, deliveryCharge, setDeliveryCharge, authUser, cartItems, status, error, calculateGrandTotal, handleRemoveToCart, updatedQuantities, setUpdatedQuantities, handleQuantityChange, handleUpdateClick }
}

export default useCart
