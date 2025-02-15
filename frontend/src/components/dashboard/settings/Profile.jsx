import { User, UserCircle, UserIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useSelector } from "react-redux";

const Profile = ({ onEditClick }) => {
  const authUser = useSelector((state) => state.user.user);
  console.log(authUser);
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6 ">
        {authUser?.imageUrl ? (
          <>
            <img
              src={authUser?.imageUrl}
              alt="Profile"
              className="rounded-full w-20 h-20 object-cover mr-4"
            />
          </>
        ) : (
          <UserCircle className="size-20 text-indigo-400" />
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {authUser?.username}
          </h3>
          <p className="text-gray-400">{authUser?.email}</p>
        </div>
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        onClick={() => onEditClick()}
      >
        Edit Profile
      </button>
    </SettingSection>
  );
};

export default Profile;
