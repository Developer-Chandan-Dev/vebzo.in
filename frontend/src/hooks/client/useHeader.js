import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const useHeader = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.user.user);
    const { cartItems } = useSelector((state) => state.cart);

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

    useEffect(() => {
        if (authUser?._id) {
            dispatch(fetchCartItems(authUser?._id));
        }
    }, [authUser?._id, dispatch]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return { subTotal, setSubTotal, isOpen, setIsOpen, location, authUser, cartItems, calculateGrandTotal, grandTotal, toggleMenu }
}

export default useHeader
