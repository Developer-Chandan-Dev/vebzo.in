import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
import useFetchData from "../../../hooks/useFetchData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const UpdateUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  const { data, loading } = useFetchData(`${VITE_API_URL}/api/v1/auth/me`);

  const { handleSubmit } = useHandleSendingRequest();

  useEffect(() => {
    setUsername(data?.user.username);
    setEmail(data?.user?.email);
    setPhone(data?.user?.phone);
    setAddress(data?.user?.address);
    setUserId(data?.user?._id);
  }, [data?.user]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await handleSubmit(
        "PUT",
        `${VITE_API_URL}/api/v1/auth/me/${userId}`,
        {
          username,
          email,
          phone,
          address,
        }
      );
      
      if (res) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96 h-auto py-5 border border-gray-600 rounded-md">
      <h2 className="text-center my-4 text-xl font-semibold">Update Info</h2>
      <form
        className="flex items-center justify-center flex-col"
        onSubmit={handleUpdateInfo}
      >
        <div>
          <input
            type="text"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            minLength={10}
            maxLength={10}
            required
          />
        </div>
        <div>
          <textarea
            className="px-3 w-full sm:w-72 py-2 rounded-md drop-shadow border  border-slate-500 outline-slate-500 my-2 bg-gray-700 text-gray-50"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="ml-2 mt-4">
          <button className="px-8 rounded-md py-2 border text-[crimson] border-[crimson] font-semibold transition-all hover:text-white hover:bg-[crimson] hover:shadow-md shadow-[crimson]">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
