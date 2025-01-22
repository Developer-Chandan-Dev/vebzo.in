import Header from "../../components/dashboard/Header";
import Profile from "../../components/dashboard/settings/Profile";

const SettingPage = ()=>{
    return (
        <div className="flex-1 overflow-y-auto relative z-10 pb-6 bg-gray-900">
        <Header title="Settings" />
  
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <Profile />
          {/* <Notifications /> */}
          {/* <Security /> */}
          {/* <ConnectedAccounts /> */}
          {/* <DangerZone /> */}
        </main>
      </div>
    )
}

export default SettingPage;