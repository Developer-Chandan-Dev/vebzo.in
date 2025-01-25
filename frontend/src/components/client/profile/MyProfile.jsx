/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../utility/Button";
import authService from "../../../features/auth";
import { logout } from "../../../store/features/userSlice";
import useFetchData from "../../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const MyProfile = () => {
  const { data, error, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/auth/me`
  );
  const user = data?.user;

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(data?.user?.email || "");
  const [address, setAddress] = useState(data?.user?.address || "");
  const [phone, setPhone] = useState(data?.user?.phone || "");
  const [image, setImage] = useState(data?.user?.imageUrl || null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setImage(user?.imageUrl);
  }, [user]);

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
    if (res.data.sucess === true) {
      console.log(res.data.message);
    } else {
      console.log(res.data.error);
    }

    // Dispatch the logout action
    dispatch(logout());
  };
  return (
    <>
      <div
        className="w-full h-40 "
        style={{ background: "linear-gradient(45deg, #247715, #1b9b9b5e)" }}
      ></div>
      <div className="flex items-start justify-start px-10 gap-10">
        <div className="w-32 h-32 relative">
          <div
            className="w-28 h-28 border-4 border-slate-50 bg-green-200 rounded-full absolute -top-5 overflow-hidden"
            style={{
              boxShadow: "0 10px 20px silver",
            }}
          >
            <img
              src={filePreview}
              className="w-full h-full object-fit"
              alt=""
            />
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
      <div className="w-full px-20 py-10">
        <form className="mx-auto text-gray-800">
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
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              type="text"
              className="inputBox px-3 h-32 w-full py-3 rounded-lg border drop-shadow outline-slate-500 mb-5"
              placeholder="Your address..."
              minLength={10}
              maxLength={10}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="file"
              className="inputBox px-3 w-full py-3 rounded-lg border drop-shadow outline-slate-500 mb-5"
              accept="image/*"
              minLength={10}
              maxLength={10}
              ref={fileInputRef}
              onChange={handleFileChange}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inputBox w-full py-[10px] mt-5 border rounded-3xl bg-gray-800 hover:bg-black text-white font-semibold"
          >
            {/* {loading ? <SmallSpinner /> : "Register"} */}
            Save
          </button>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default MyProfile;
