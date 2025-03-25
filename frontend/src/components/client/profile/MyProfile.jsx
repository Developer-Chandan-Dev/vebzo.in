/* eslint-disable no-unused-vars */
import { UserIcon } from "lucide-react";
import Button from "../../utility/Button";
import SmallSpinner from "../../utility/SmallSpinner";
import useMyProfile from "../../../hooks/client/useMyProfile";

const MyProfile = () => {
  const {
    user,
    error,
    setUser,
    username,
    setUsername,
    email,
    setEmail,
    address,
    setAddress,
    phone,
    setPhone,
    image,
    setImage,
    loading,
    setLoading,
    filePreview,
    setFilePreview,
    authUser,
    handleFileChange,
    fileInputRef,
    handleLogout,
    handleSubmit,
    onSubmit,
  } = useMyProfile();

  return (
    <>
      <div
        className="w-full h-40"
        style={{
          backgroundImage: 'url("/public/images/bg.jpeg")',
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex items-start justify-start px-10 gap-1 sm:gap-10 flex-wrap sm:flex-nowrap">
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
        <div className="flex items-center w-full justify-between gap-x-7 relative sm:pt-4 flex-wrap gap-1">
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
        {error && <p>{error}</p>}
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
