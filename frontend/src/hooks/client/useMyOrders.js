import { useEffect, useState } from "react";
import useHandleSendingRequest from "../useHandleSendingRequest";
import useHandleDeletewithSweetAlert from "../useHandleDeleteWithSweetAlert";
import { logout } from "../../store/features/userSlice";
import useFetchDataWithPagination from "../useFetchDataWithPagination";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const useMyOrders = () => {
    const [myOrders, setMyOrders] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [order_id, setOrder_Id] = useState(null);

    const { data, loading, error, refreshData } = useFetchDataWithPagination(
        `${VITE_API_URL}/api/v1/orders/my-orders`
    );

    useEffect(() => {
        setMyOrders(data?.order);
    }, [data?.order]);

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

    return {
        myOrders, setMyOrders,handleCancelingOrder, isOpen, setIsOpen, order_id, setOrder_Id, handleDelete, togglePopup, handlePopupOpen, loading, error, refreshData, loading2, setLoading2
    }
}

export default useMyOrders
