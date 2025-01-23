/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const UserTr = ({
  _id,
  username,
  email,
  role,
  createdAt,
  isBlocked,
  imageUrl,
  onEditClick,
}) => {
  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
          <img
            src="../../../public/1.jpg"
            alt="User img"
            className="size-10 rounded-full"
          />
          {username}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          <span className="px-3 py-[3px] inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
            {role === "admin"
              ? "Admin"
              : role === "manager"
              ? "Manager"
              : role === "user"
              ? "User"
              : "User"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {createdAt}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          <span
            className={`px-3 py-[3px] inline-flex text-xs leading-5 font-semibold rounded-full ${
              isBlocked === false
                ? "bg-green-800 text-green-100"
                : "bg-red-800 text-red-100"
            }`}
          >
            {isBlocked ? "Inactive" : "Active"}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
            <Edit
              size={18}
              onClick={() => {
                onEditClick({
                  _id,
                  username,
                  email,
                  role,
                  imageUrl,
                  isBlocked,
                  createdAt,
                });
              }}
            />
          </button>
          <button className="text-red-400 hover:text-red-300">
            <Trash2 size={18} />
          </button>
        </td>
      </motion.tr>
    </>
  );
};

export default UserTr;
