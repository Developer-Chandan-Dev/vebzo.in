import { useSelector } from "react-redux";
import Spinner from "../../utility/Spinner";
import LogoLeaf from "../../../assets/images/logo-leaf-new.png";
import ItemBoxForHome from "./ItemBoxForHome";

const BestSellingProducts = () => {

  const bsProducts = useSelector((state) => state?.bsItems);

  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Best Selling Products
      </h2>
      <img src={LogoLeaf} alt="Leaf" className="pt-7 pb-4 mx-auto" />

      {bsProducts?.isLoading && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}

      {bsProducts?.error && !bsProducts?.isLoading && (
        <p className="text-red-400">{bsProducts?.error}</p>
      )}

      {!bsProducts?.isLoading && !bsProducts?.error && (
        <div className="flex items-center justify-center flex-wrap gap-5 my-14">
          {bsProducts?.bsItems?.data?.length > 0 &&
            bsProducts?.bsItems?.data !== null &&
            bsProducts?.bsItems?.data.map((product) => (
              <ItemBoxForHome
                key={product?._id}
                _id={product?._id}
                imageUrl={product?.imageUrl}
                category={product?.category}
                name={product?.name}
                averageRating={product?.averageRating}
                price={product?.price}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default BestSellingProducts;
