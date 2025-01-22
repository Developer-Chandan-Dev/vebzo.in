import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";

const UserProfilePage = () => {
  return (
    <div className="w-full h-auto">
      <Header />
      <div className="h-auto py-10 px-10 flex justify-center text-left text-gray-700 gap-10">
        <div
          className="w-72 h-96 border rounded-md"
          style={{ boxShadow: "0 15px 20px silver" }}
        ></div>
        <div className="px-5  flex items-start w-[550px] gap-5">
          <div className="w-40 h-40 border"></div>
          <div className="px-3 w-[300px]">
            <button className="px-3 py-2 border rounded">Manager</button>
            <h3 className="py-1 text-lg font-semibold">Candidate Name</h3>
            <p className="py-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
              vero quod nostrum debitis deleniti sit odio placeat vitae
              laboriosam qui. Maiores consequuntur eaque veniam dolorum
              distinctio, voluptatibus ullam porro deleniti.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
