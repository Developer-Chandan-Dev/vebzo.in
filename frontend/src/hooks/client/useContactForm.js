import { useState } from "react";
import { toast } from "react-toastify";
import useHandleSendingRequest from "../useHandleSendingRequest";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { handleSubmit } = useHandleSendingRequest();
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await handleSubmit(
            "POST",
            `${VITE_API_URL}/api/v1/contact-messages/add`,
            { name, email, message }
        );
        if (response?.success === true) {
            toast.success(response?.message); 2
            setLoading(false);
            setName("");
            setEmail("");
            setMessage("");
        } else {
            toast.error(response?.message);
            setLoading(false);
        }
    };

    return { name, setName, email, setEmail, message, setMessage, loading, onSubmit }
}

export default useContactForm
