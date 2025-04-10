/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "../../store/features/cartSlice";
import { toast } from "react-toastify";
import useHandleSendingRequest from "../useHandleSendingRequest";
import { clearBuyNow } from "../../store/features/buyNowSlice";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const useCheckout = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("Prayagraj");
    const [village, setVillage] = useState("Bhogwara");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(10);
    const [grandTotal, setGrandTotal] = useState(0);
    const [orderItems, setOrderItems] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authUser = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchCartItems(authUser?._id));
    }, [authUser?._id, dispatch]);

    const { cartItems, status, error } = useSelector((state) => state.cart);
    const { buyItem } = useSelector((state) => state.buyNow);
    
    useEffect(() => {
        if (buyItem?.length > 0) {
            const formattedOrderItems = buyItem?.map((item) => ({
                product: item.productId, // Product ID
                quantity: item.quantity,
                price: item.price,
            }));
            setOrderItems(formattedOrderItems);
        }
        else if (cartItems?.items?.length > 0) {
            const formattedOrderItems = cartItems?.items.map((item) => ({
                product: item.productId, // Product ID
                quantity: item.quantity,
                price: item.price,
            }));

            setOrderItems(formattedOrderItems);
        }
    }, [cartItems, buyItem]);

    
    const calculateGrandTotal = (items) => {
        return (
            items?.length > 0 &&
            items?.reduce((total, item) => {
                return total + item.quantity * item?.price;
            }, 0)
        );
    };
    // Usage
    const GrandTotal = calculateGrandTotal(buyItem.length > 0 ? buyItem : cartItems?.items);

    useEffect(() => {
        setSubTotal(parseInt(GrandTotal));
    }, [GrandTotal]);

    useEffect(() => {
        setGrandTotal(subTotal + deliveryCharge);
    }, [deliveryCharge, subTotal]);

    const { handleSubmit } = useHandleSendingRequest();

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await handleSubmit(
                "POST",
                `${VITE_API_URL}/api/v1/orders`,
                {
                    firstname,
                    lastname,
                    orderItems,
                    shippingAddress: {
                        address,
                        village,
                        city,
                        phone,
                    },
                    paymentMethod: "COD",
                    totalPrice: grandTotal,
                    buyNow : buyItem ? true : false
                }
            );

            if (response?.success === true) {
                if(buyItem){
                    dispatch(clearBuyNow())
                    toast.success(response.message);
                }
                toast.success(response.message);
                navigate("/profile/my-orders");
            } else {
                toast.error(response.message);
            }
            if (response?.includes('Error: Insufficient stock for product:')) {
                toast.error(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { firstname, setFirstname, lastname, setLastname, city, setCity, village, setVillage, address, setAddress, phone, setPhone, notes, setNotes, subTotal, setSubTotal, deliveryCharge, setDeliveryCharge, grandTotal, setGrandTotal, orderItems, setOrderItems, calculateGrandTotal, GrandTotal, onSubmit }
}

export default useCheckout
