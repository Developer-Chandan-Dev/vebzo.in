/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { logout } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useDeleteOrderMutation, useFetchMyOrdersQuery, useUpdateOrderMutation } from "../../services/apiSlice";

const useMyOrders = (params) => {
    const [myOrders, setMyOrders] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [order_id, setOrder_Id] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')

    // const socket = useSocket();

    const { data, error, isLoading, refetch } = useFetchMyOrdersQuery(params);
    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    useEffect(() => {
        setMyOrders(data?.order);
    }, [data?.order]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrder({ orderId, updateData: { status: newStatus } }).unwrap();
            // ✅ Data updated successfully, UI will auto-update because of invalidatesTags
            console.log("Status updated!");
        } catch (error) {
            console.error("Update failed:", error)
        }
    }

    const handleDelete = async (orderId) => {
        console.log(orderId, '39');
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        try {
            await deleteOrder(orderId).unwrap();
            // ✅ Order deleted successfully, UI will auto-update because of invalidatesTags
            console.log("Order deleted!");
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    if (error?.includes("Not Authorized") || error?.includes("no token")) {
        // Dispatch the logout action
        dispatch(logout());
        navigate("/login");
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handlePopupOpen = (id) => {
        setIsOpen(true);
        setOrder_Id(id);
    };

    return {
        myOrders, refetch, setMyOrders, handleStatusChange, isOpen, setIsOpen, order_id, setOrder_Id, handleDelete, togglePopup, handlePopupOpen, isLoading, error, searchTerm, setSearchTerm, isUpdating, isDeleting
    }
}

export default useMyOrders
