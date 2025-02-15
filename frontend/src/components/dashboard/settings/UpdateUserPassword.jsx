import { useState } from "react";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";

const UpdateUserPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleSubmit } = useHandleSendingRequest();
  const handlePasswordUpdate = async () => {
    const res = await handleSubmit();
    console.log(res);
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
            type="text"
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
            type="text"
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
            type="text"
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
