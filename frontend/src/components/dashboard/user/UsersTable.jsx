import { motion } from "framer-motion";
import { Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import UserTr from "./UserTr";

const USER_DATA = [
  {
    _id: 1,
    username: "John Doe",
    imageUrl: "/public/images/potato-1.webp",
    email: "john@example.com",
    role: "user",
    isBlocked: false,
    createdAt: "12/01/2024",
  },
  {
    _id: 2,
    username: "Jane Smith",
    imageUrl: "/public/images/potato-1.webp",
    email: "jane@example.com",
    role: "admin",
    isBlocked: false,
    createdAt: "12/01/2024",
  },
  {
    _id: 3,
    username: "Bob Johnson",
    imageUrl: "/public/images/potato-1.webp",
    email: "bob@example.com",
    role: "user",
    isBlocked: false,
    createdAt: "12/01/2024",
  },
  {
    _id: 4,
    username: "Alice Brown",
    imageUrl: "/public/images/potato-1.webp",
    email: "alice@example.com",
    role: "user",
    isBlocked: false,
    createdAt: "12/01/2024",
  },
  {
    _id: 5,
    username: "Charlie Wilson",
    imageUrl: "/public/images/potato-1.webp",
    email: "charli@example.com",
    role: "manager",
    isBlocked: true,
    createdAt: "12/01/2024",
  },
];

const UsersTable = ({ onEditClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USER_DATA);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = USER_DATA.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <UserTr
                key={user._id}
                _id={user?._id}
                username={user?.username}
                email={user?.email}
                role={user?.role}
                imageUrl={user?.imageUrl}
                createdAt={user?.createdAt}
                isBlocked={user?.isBlocked}
                onEditClick={onEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersTable;
