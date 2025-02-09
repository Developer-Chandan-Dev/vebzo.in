/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import Button from "../../utility/Button";
import SmallSpinner from "../../utility/SmallSpinner";
import authService from "../../../features/auth";
import { logout } from "../../../store/features/userSlice";
import useFetchData from "../../../hooks/useFetchData";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const MyProfile = () => {
  const { data, error } = useFetchData(`${VITE_API_URL}/api/v1/auth/me`);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(data?.user?.email || "");
  const [address, setAddress] = useState(data?.user?.address || "");
  const [phone, setPhone] = useState(data?.user?.phone || "");
  const [image, setImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setFilePreview(user?.imageUrl);
    setUser(data?.user);
  }, [data?.user, image, user]);

  const dispatch = useDispatch();
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
    console.log(res);
    if (res.data.sucess === true) {
      toast.success(res.data.message);
      <Navigate to="/"/>
    } else {
      toast.error(res.data.message);
    }

    // Dispatch the logout action
    dispatch(logout());
  };

  const { handleSubmit } = useHandleSendingRequest();

  const onSubmit = async (e) => {
    e.preventDefault();
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
      setFilePreview(res?.user.imageUrl);
      setLoading(false);
    } else {
      console.log(res);
      toast.error(res?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full h-40"
        style={{
          backgroundImage: 'url("/public/images/bg.jpeg")',
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex items-start justify-start px-10 gap-10">
        <div className="w-32 h-32 relative">
          <div
            className="w-28 h-28 border-4 border-slate-50 bg-white flex-center rounded-full absolute -top-5 overflow-hidden"
            style={{
              boxShadow: "0 10px 20px silver",
            }}
          >
            {filePreview ? (
              <img
                src={filePreview}
                className="w-full h-full object-fit"
                alt=""
              />
            ) : (
              <UserIcon className="size-12 text-gray-500" />
            )}
          </div>
        </div>
        <div className="flex items-center w-full justify-between gap-x-7 relative pt-4">
          <div>
            <h3 className="text-lg font-semibold">Profile</h3>
            <p>User profile route is this.</p>
          </div>
          <div>
            <Button sm={true} onClick={handleLogout} label="Logout" />
          </div>
        </div>
      </div>
      <div className="w-full px-5 sm:px-10 md:px-20 py-10">
        <form className="mx-auto text-gray-800" onSubmit={onSubmit}>
          {/* <div> */}
          <div>
            <input
              type="text"
              className="inputBox px-3 w-full py-3 rounded-lg border drop-shadow outline-slate-500 "
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="inputBox px-3 w-full py-3 rounded-lg border drop-shadow outline-slate-500 my-5"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="inputBox px-3 w-full py-3 rounded-lg border drop-shadow outline-slate-500 mb-5"
              placeholder="Your phone no."
              minLength={10}
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <textarea
              type="text"
              className="inputBox px-3 h-32 w-full py-3 rounded-lg border drop-shadow outline-slate-500 mb-5"
              placeholder="Your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              className="inputBox px-3 w-full py-3 rounded-lg border drop-shadow outline-slate-500 mb-5"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="inputBox w-full py-[10px] mt-5 border rounded-3xl bg-gray-800 hover:bg-black text-white font-semibold"
          >
            {loading ? <SmallSpinner /> : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MyProfile;
