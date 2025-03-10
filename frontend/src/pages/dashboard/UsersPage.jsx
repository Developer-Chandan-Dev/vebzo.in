import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import Header from "../../components/dashboard/Header";
import StatCard from "../../components/dashboard/common/StatCard";
import UsersTable from "../../components/dashboard/user/UsersTable";
import UserActivityHeartmap from "../../components/dashboard/user/UserActivityHeartMap";
import UserDemograpichsChart from "../../components/dashboard/user/UserDemograpichsChart";
import UserGrowChart from "../../components/dashboard/user/UserGrowChart";
import ChangeUserDetailsPopup from "../../components/dashboard/user/ChangeUsersDetailsPopup";
import useFetchData from "../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const UsersPage = () => {
  document.title = "Admin Dashboard - Users";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/user-cards`
  );

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user details
    setIsOpen(true); // Activate the popup
  };

  const handlePopupModelClose = () => {
    setSelectedUser(null); // Set the selected user details
    setIsOpen(false); // Activate the popup
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={
              loading ? "Loading..." : data?.data?.totalUsers.toLocaleString()
            }
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={loading ? "Loading" : data?.data?.newUsers.toLocaleString()}
            color="#108981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={
              loading ? "Loading" : data?.data?.activeUsers.toLocaleString()
            }
            color="#F59E08"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={
              loading ? "Loading" : data?.data?.inactiveUsers.toLocaleString()
            }
            color="#EF4444"
          />
        </motion.div>

        <UsersTable onEditClick={handleEditClick} />

        {/* USER CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <UserGrowChart />
          <UserActivityHeartmap />
        </div>
        <UserDemograpichsChart />

        {isOpen && (
          <ChangeUserDetailsPopup
            user={selectedUser}
            isOpen={isOpen}
            togglePopup={togglePopup}
            onClose={handlePopupModelClose}
          />
        )}
      </main>
    </div>
  );
};

export default UsersPage;
