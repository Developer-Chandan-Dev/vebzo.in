import { useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import Sidebar from "../../components/client/Sidebar";
import Container from "../../components/client/shop/Container";
import { Helmet } from "react-helmet";

const ShopPage = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(50);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Helmet>
        <title>Shop Organic Products Online - Vebzo</title>
        <meta
          name="description"
          content="Browse our wide range of organic fruits, vegetables, pulses, and spices. Fresh from local farms to your home. Shop now on ApnaMarket."
        />
      </Helmet>
      <div>
        <Header />
        <div className="flex max-w-7xl items-start justify-center gap-10 px-4 sm:px-5 md:px-7 lg:px-10 py-10 bg-white relative">
          <Sidebar
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            searchText={searchText}
            setSearchText={setSearchText}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            toggleFilter={toggleFilter}
            setToggleFilter={setToggleFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Container
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            searchText={searchText}
            setSearchText={setSearchText}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            toggleFilter={toggleFilter}
            setToggleFilter={setToggleFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ShopPage;
