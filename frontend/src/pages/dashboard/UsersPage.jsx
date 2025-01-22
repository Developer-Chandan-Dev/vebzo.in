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

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = () => {
  document.title = "Admin Dashboard - Users";

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user details
    setIsPopupActive(true); // Activate the popup
  };

  const handlePopupModelClose = () => {
    setIsPopupActive(false);
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
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userStats.newUsersToday.toLocaleString()}
            color="#108981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E08"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
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

        {isPopupActive && (
          <ChangeUserDetailsPopup
            user={selectedUser}
            onClose={handlePopupModelClose}
          />
        )}
      </main>
    </div>
  );
};

export default UsersPage;
