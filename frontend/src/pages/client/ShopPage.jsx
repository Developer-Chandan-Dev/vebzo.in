import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import Sidebar from "../../components/client/Sidebar";
import Container from "../../components/client/shop/Container";

const ShopPage = () => {
  return (
    <div>
      <Header />
      <div className="flex max-w-7xl items-start justify-center gap-10 px-10 py-10">
        <Sidebar />
        <Container />
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
