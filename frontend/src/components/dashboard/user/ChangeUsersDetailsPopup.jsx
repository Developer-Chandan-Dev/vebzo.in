/* eslint-disable react/prop-types */
import "./style.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Edit2, User2Icon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";

const ChangeUserDetailsPopup = ({ user, isOpen, onClose,togglePopup }) => {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "");
  const [blocked, setBlocked] = useState(user.isBlocked || false);
  const [image, setImage] = useState(user.profilePic || null);
  const [filePreview, setFilePreview] = useState(null);

  const fileInputRef = useRef(null);
  const popupRef = useRef();
  console.log(isOpen);

  const { handleSubmit } = useHandleSendingRequest();

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await handleSubmit(
      "PUT",
      `/api/v1/users/update/${user._id}`,
      {
        role,
        isBlocked: blocked,
      }
    );
    if (response.success === true) {
      toast.success(response.message);
    } else {
      console.log(response);
    }
  };

  const popupVariants = {
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  console.log(popupVariants, popupRef);
  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-100 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      ref={popupRef}
      initial="closed"
      animate={"open"}
      exit="closed"
      variants={popupVariants}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-auto sm:h-[550px] bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-400 mb-6">
        <div className=" flex items-center justify-between">
          <h1 className="text-white">Change User Details</h1>
          <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
            <X size={18} className="" onClick={togglePopup} />
          </div>
        </div>

        <form
          className="sm:flex py-6 gap-3 text-[14px] text-gray-300 font-medium"
          onSubmit={onSubmit}
        >
          <div className="w-full sm:w-80 h-full flex items-center mt-6 justify-start flex-col">
            <div className="w-40 h-40 drop-shadow border border-slate-500 outline-slate-500 rounded-md relative mainImageBox overflow-hidden">
              {filePreview ? (
                <img
                  src={filePreview}
                  className="w-full h-full"
                  alt="User Pic"
                />
              ) : (
                <User2Icon className="w-full h-full" />
              )}

              <div
                className="absolute w-8 h-8 top-3 drop-shadow right-3 bg-slate-600 rounded-md flex-center cursor-pointer editButton"
                title="Edit"
              >
                <Edit2
                  size={20}
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full mt-4 sm:mt-0 sm:w-80 h-full ">
            <div>
              <input
                type="text"
                className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={true}
                required
              />
            </div>
            <div className="mt-2">
              <input
                type="email"
                className="px-3  w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2  bg-gray-700"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
                required
              />
            </div>

            <div className="my-2">
              <label htmlFor="role" className="ml-4 my-4 text-slate-100">
                Role:
              </label>
              <br />
              <select
                name="role"
                id="role"
                className="px-3  w-full sm:w-72 py-2 drop-shadow rounded-md border border-slate-500 outline-slate-500 my-2  bg-gray-700"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="my-3">
              <label htmlFor="blocked" className="ml-2 text-slate-100">
                Status:
              </label>
              <br />
              <select
                name="blocked"
                id="blocked"
                className="px-3 w-full sm:w-72 py-2 drop-shadow rounded-md border  border-slate-500 outline-slate-500 my-2  bg-gray-700"
                required
                value={blocked}
                onChange={(e) => setBlocked(e.target.value)}
              >
                <option value="">Choose Status</option>
                <option value={true}>Blocked</option>
                <option value={false}>Unblocked</option>
              </select>
            </div>

            <div className="ml-2 mt-4">
              <button className="px-6 rounded-md py-2 border text-[crimson] border-[crimson] font-semibold transition-all hover:text-white hover:bg-[crimson] hover:shadow-md shadow-[crimson]">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ChangeUserDetailsPopup;
// Rim jhim gire shawan, bahak bahak jaye man
