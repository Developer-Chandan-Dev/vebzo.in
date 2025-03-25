import { useState } from "react";
import { useSelector } from "react-redux";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
import { toast } from "react-toastify";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const UpdateUserPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authUser = useSelector((state) => state.user.user);

  const { handleSubmit } = useHandleSendingRequest();
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await handleSubmit(
        "PUT",
        `${VITE_API_URL}/api/v1/auth/update-password/${authUser?._id}`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );
      if (res.success === true) {
        toast.success(res.message);
      } else {
        toast.error(res);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="w-96 h-auto py-5 border border-gray-600 rounded-md">
      <h2 className="text-center my-4 text-xl font-semibold">
        Update Password
      </h2>
      <form
        className="flex items-center justify-center flex-col"
        onSubmit={handlePasswordUpdate}
      >
        <div>
          <input
            type="password"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Old Password"
            minLength={6}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="New Password"
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Confirm Password"
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="ml-2 mt-4">
          <button className="px-8 rounded-md py-2 border text-[crimson] border-[crimson] font-semibold transition-all hover:text-white hover:bg-[crimson] hover:shadow-md shadow-[crimson]">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPassword;
