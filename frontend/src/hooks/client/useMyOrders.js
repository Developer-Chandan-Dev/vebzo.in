import { useEffect, useState } from "react";
import useHandleSendingRequest from "../useHandleSendingRequest";
import useHandleDeletewithSweetAlert from "../useHandleDeleteWithSweetAlert";
import { logout } from "../../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const useMyOrders = () => {
    const [myOrders, setMyOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [order_id, setOrder_Id] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')

    // const socket = useSocket();

    const orderItems = useSelector((state) => state?.myOrders);
    // const status = useSelector((state) => state.order.status);

    useEffect(() => {
        setMyOrders(orderItems?.orderItems);
        setLoading(orderItems?.isLoading);
        setError(orderItems?.error)
    }, [orderItems?.error, orderItems?.isLoading, orderItems?.orderItems]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit } = useHandleSendingRequest();

    const handleCancelingOrder = async (_id, status) => {
        setLoading2(true);
        try {
            const response = await handleSubmit(
                "PUT",
                `${VITE_API_URL}/api/v1/orders/${_id}/status`,
                { status: status }
            );

            if (response.success === true) {
                console.log(myOrders, response);
                setMyOrders(
                    myOrders.filter((item) =>
                        item?._id === _id ? (item.status = response.status) : "Not match"
                    )
                );

                setLoading2(false);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            setLoading2(false);
        }
    };

    if (error?.includes("Not Authorized") || error?.includes("no token")) {
        // Dispatch the logout action
        dispatch(logout());
        navigate("/login");
    }

    const { handleDelete } = useHandleDeletewithSweetAlert();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handlePopupOpen = (id) => {
        setIsOpen(true);
        setOrder_Id(id);
    };
    // const handleSetSearchText = () => {
    //     setSearchText(searchTerm.trim());
    // }
    // const handleEnterKeyPress = (event) => {
    //     if (event.key === "Enter") {
    //         handleSetSearchText(); // Trigger the search function when Enter key pressed
    //     }
    // }

    return {
        myOrders, setMyOrders, handleCancelingOrder, isOpen, setIsOpen, order_id, setOrder_Id, handleDelete, togglePopup, handlePopupOpen, loading, error, loading2, setLoading2, searchTerm, setSearchTerm
    }
}

export default useMyOrders
