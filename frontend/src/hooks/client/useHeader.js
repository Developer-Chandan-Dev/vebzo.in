import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FavsContext } from "../../context/FavsContext";

const useHeader = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const {favsCount } = useContext(FavsContext)

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return { subTotal, setSubTotal, favsCount, isOpen, setIsOpen, location, authUser, cartItems, calculateGrandTotal, grandTotal, toggleMenu }
}

export default useHeader
