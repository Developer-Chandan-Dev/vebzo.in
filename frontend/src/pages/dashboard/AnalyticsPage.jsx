import OverviewCards from "../../components/dashboard/analytics/OverviewCards";
import ProductPerformance from "../../components/dashboard/analytics/ProductPerformance";
import RevenueChart from "../../components/dashboard/analytics/RevenueChart";
import UserRentation from "../../components/dashboard/analytics/UserRentation";
import Header from "../../components/dashboard/Header";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6 text-left">
      <Header title="Analytics Dashboard" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Overview Cards */}
        <OverviewCards />

        {/* CHARTS */}
        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          {/* <ChannelPerformance /> */}
          <ProductPerformance />
          <UserRentation />
          {/* <CustomerSegmentation /> */}
        </div>
        {/* <AIPoweredInsights /> */}
      </main>
    </div>
  );
};

export default AnalyticsPage;
