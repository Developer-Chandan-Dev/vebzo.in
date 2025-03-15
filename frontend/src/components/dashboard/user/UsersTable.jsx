/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { MoveLeft, MoveRight, RefreshCwIcon, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import UserTr from "./UserTr";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import Spinner from "../../utility/Spinner";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";
import useUsersTable from "../../../hooks/users/useUsersTable";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const UsersTable = ({ onEditClick }) => {
  const [usersData, setUsersData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [role, setRole] = useState("");
  const [checkRoleFilter, setCheckRoleFilter] = useState(false);
  const [status, setStatus] = useState("");
  const [checkStatusFilter, setCheckStatusFilter] = useState(false);

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 8,
      query: searchText.length > 0 ? searchText : "",
      role: role.length > 0 ? role : "",
      isBlocked: status.length > 0 ? status : "",
    }),
    [currentPage, searchText, role, status]
  );

  const { data, loading, error, refreshData } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/users`,
    params
  );

  const {
    handlePageClick,
    handleEnterKeyPress,
    handleToggleRoleFilter,
    handleFilterByRole,
    handleToggleStatusFilter,
    handleFilterByStatus
  } = useUsersTable({
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchText,
    checkRoleFilter,
    setRole,
    setCheckRoleFilter,
    checkStatusFilter,
    setStatus,
    setCheckStatusFilter
  });

  useEffect(() => {
    setUsersData(data?.data);
  }, [data?.data]);

  // Create an array of page numbers (e.g., [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pageNumbers.push(i);
  }

  const { handleDelete } = useHandleDeletewithSweetAlert();

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users List</h2>
        <div className="">
          <button
            className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
            onClick={() => setActiveSearchBox(true)}
          >
            <Search className="size-5 font-bold" />
          </button>
          <div
            className={`${
              activeSearchBox ? "flex" : "hidden"
            } sm:flex items-center justify-center absolute left-0 bg-gray-800 top-0 w-full py-3 sm:relative gap-2`}
          >
            <button
              className="w-auto px-3 gap-2 h-9 border flex-center text-gray-500 transition-all hover:text-gray-400 rounded-md border-gray-600"
              title="Refresh"
              onClick={refreshData}
            >
              <span className="hidden sm:block">Refresh</span>
              <RefreshCwIcon className="size-4" />
            </button>
            <div className="relative ">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyDown={handleEnterKeyPress}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button
              className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
              onClick={() => setActiveSearchBox(false)}
            >
              <X className="size-5 font-bold" />
            </button>
          </div>
        </div>
      </div>

      {loading && !error && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}
      {error && !loading && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
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
                <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer"
                    onChange={handleToggleRoleFilter}
                    checked={checkRoleFilter}
                  />
                  {!checkRoleFilter && <span>Role</span>}

                  {checkRoleFilter && (
                    <select
                      className="bg-gray-700 px-1 outline-gray-500 py-1 rounded-md text-[14px]"
                      value={role}
                      onChange={handleFilterByRole}
                    >
                      <option value="">Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  )}
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer"
                    onChange={handleToggleStatusFilter}
                    checked={checkStatusFilter}
                  />
                  {!checkStatusFilter && <span>Status</span>}

                  {checkStatusFilter && (
                    <select
                      className="bg-gray-700 px-1 outline-gray-500 py-1 rounded-md text-[14px]"
                      value={status}
                      onChange={handleFilterByStatus}
                    >
                      <option value="">Status</option>
                      <option value="false">Active</option>
                      <option value="true">InActive</option>
                     </select>
                  )}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {usersData !== null && usersData?.length > 0
                ? usersData.map((user) => (
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
                      handleDelete={handleDelete}
                      setUsersData={setUsersData}
                      usersData={usersData}
                    />
                  ))
                : ""}
            </tbody>
          </table>
          <div className="px-5 py-2 flex items-center w-full gap-3 mt-5">
            <button
              className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
                currentPage > 1 ? "flex-center" : "hidden"
              }`}
              onClick={() => setCurrentPage(currentPage > 1 && currentPage - 1)}
            >
              <MoveLeft size="16" />
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
                  page === currentPage
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
                currentPage < pageNumbers.length ? "flex-center" : "hidden"
              }`}
              onClick={() =>
                setCurrentPage(
                  currentPage < pageNumbers.length && currentPage + 1
                )
              }
            >
              <MoveRight size="16" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
