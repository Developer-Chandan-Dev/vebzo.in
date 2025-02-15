/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UpdateUserForm from "./UpdateUserForm";
import UpdateUserPassword from "./UpdateUserPassword";
import { UserCircle, X } from "lucide-react";
import { useSelector } from "react-redux";

const ProfileUpdatePopup = ({ onClose }) => {
  const [changeInfo, setChangeInfo] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  const authUser = useSelector((state) => state.user.user);
  const handleChangeInfoClick = () => {
    setChangePassword(false);
    setChangeInfo(true);
  };

  const handlePasswordUpdateClick = () => {
    setChangePassword(true);
    setChangeInfo(false);
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
  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[400px] md:w-[600px] px-6 pt-5 pb-10 h-auto bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6">
        <div className=" flex items-center justify-between">
          {authUser?.imageUrl ? (
            <img src={authUser?.imageUrl} alt="User" className="size-10 rounded-full overflow-hidden" />
          ) : (
            <UserCircle className="size-8" />
          )}

          <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
            <X size={18} className="" onClick={onClose} />
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          {/* <h2 className="text-2xl font-semibold text-gray-50 mb-3">
            User Info
          </h2> */}

          <div className="flex items-center gap-2 my-5">
            <button
              className={`px-6 rounded-md py-2 border text-[crimson] border-[crimson] font-semibold transition-all hover:text-white hover:bg-[crimson] ${
                changeInfo && "bg-[crimson] text-white"
              } hover:shadow-md shadow-[crimson]`}
              onClick={handleChangeInfoClick}
            >
              Change Info
            </button>
            <button
              className={`px-6 rounded-md py-2 border text-[crimson] border-[crimson] font-semibold transition-all hover:text-white hover:bg-[crimson] hover:shadow-md shadow-[crimson] ${
                changePassword && "bg-[crimson] text-white"
              }`}
              onClick={handlePasswordUpdateClick}
            >
              Change Password
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            {changeInfo && <UpdateUserForm />}
            {changePassword && <UpdateUserPassword />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileUpdatePopup;
