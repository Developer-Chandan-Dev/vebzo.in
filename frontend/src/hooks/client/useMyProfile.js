import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHandleSendingRequest from "../useHandleSendingRequest";
import { login, logout } from "../../store/features/userSlice";
import authService from "../../features/auth";
import useFetchData from "../useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;


const useMyProfile = () => {
    const { data, error } = useFetchData(`${VITE_API_URL}/api/v1/auth/me`);

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(data?.user);
    }, [data?.user]);

    useEffect(() => {
        setUsername(user?.username);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setFilePreview(user?.imageUrl);
    }, [user, image]);

    const authUser = useSelector((state) => state.user.user);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            // Create a URL from the selected file
            const reader = new FileReader();
            reader.onloadend = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef(null);

    const handleLogout = async () => {
        const res = await authService.logout();

        if (res.data.success === true) {
            toast.success(res.data.message);
            navigate("/")
        } else {
            toast.error(res.data.message);
        }

        // Dispatch the logout action
        dispatch(logout());
    };

    const { handleSubmit } = useHandleSendingRequest();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("username", username);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("imageUrl", image);

            const res = await handleSubmit(
                "PUT",
                `${VITE_API_URL}/api/v1/auth/me/${user?._id}`,
                formData,
                true
            );

            if (res.success === true) {
                toast.success(res?.message);
                dispatch(login(res?.user?._id, res?.user?.username, res?.user?.email, res?.user?.role, res?.user?.imageUrl))
                setFilePreview(res?.user.imageUrl);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error || "Something went wrong");
        }
    };

    return { user, error, setUser, username, setUsername, email, setEmail, address, setAddress, phone, setPhone, image, setImage, loading, setLoading, filePreview, setFilePreview, authUser, handleFileChange, fileInputRef, handleLogout, handleSubmit, onSubmit };

}

export default useMyProfile
