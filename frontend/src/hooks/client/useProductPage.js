import { useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "../../store/features/cartSlice";
import useFetchData from "../useFetchData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const useProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [productId, setProductId] = useState("");
    const [productData, setProductData] = useState(null);
    const [showDescription, setShowDescription] = useState(true);
    const [showReview, setShowReview] = useState(false);

    const authUser = useSelector((state) => state.user.user);

    const { id } = useParams();
    const { data, loading } = useFetchData(
        `${VITE_API_URL}/api/v1/products/details/${id}`
    );

    useEffect(() => {
        setProductId(data?.data?._id);
    }, [data?.data?._id]);

    useEffect(() => {
        setProductData(data?.data);
    }, [data?.data]);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                userId: authUser?._id,
                productId,
                quantity: parseInt(quantity),
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(authUser?._id));
                toast.success("Product is added to cart");
            }
        });
    };


    const handleShowDescription = () => {
        setShowDescription(true);
        setShowReview(false);
    };

    const handleShowReviews = () => {
        setShowDescription(false);
        setShowReview(true);
    };

    return {data, quantity, loading, setQuantity, productId, setProductId, productData, setProductData, showDescription, setShowDescription, showReview, setShowReview, handleAddToCart, handleShowDescription, handleShowReviews }
}

export default useProductPage
