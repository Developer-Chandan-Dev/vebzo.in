import Spinner from "../../utility/Spinner";
import { useSelector } from "react-redux";
import Leaf from "../../../assets/images/logo-leaf-new.png";
import ItemBoxForHome from "./ItemBoxForHome";

const TrendingProducts = () => {
  const trendingProducts = useSelector((state) => state?.trendingItems);

  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Trending Products
      </h2>
      <img src={Leaf} alt="Leaf" className="pt-7 pb-4 mx-auto" />
      {trendingProducts?.isLoading && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}

      {trendingProducts?.error && !trendingProducts?.isLoading && (
        <p className="text-red-400">{trendingProducts?.error}</p>
      )}

      {!trendingProducts?.isLoading && !trendingProducts?.error && (
        <div className="flex items-center justify-center flex-wrap gap-5 my-14">
          {trendingProducts?.trendingItems?.data?.length > 0 &&
            trendingProducts?.trendingItems?.data !== null &&
            trendingProducts?.trendingItems?.data.map((product) => (
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

export default TrendingProducts;
