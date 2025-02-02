/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, Trash2, User, UserCircle } from "lucide-react";
import { formatDate } from "../../../utils/dateUtils";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";
const VITE_API_URL = import.meta.env.VITE_API_URL;

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
  const { handleDelete } = useHandleDeletewithSweetAlert();
  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="User img"
              className="size-9 rounded-full border border-gray-600"
            />
          ) : (
            <UserCircle className="size-9 text-gray-200" />
          )}

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
          {formatDate(createdAt)}
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
          <button
            className="text-red-400 hover:text-red-300"
            onClick={() =>
              handleDelete(`${VITE_API_URL}/api/v1/users/${_id}`, username)
            }
          >
            <Trash2 size={18} />
          </button>
        </td>
      </motion.tr>
    </>
  );
};

export default UserTr;
