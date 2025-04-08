import { useState, useEffect, useMemo } from "react";
import useFetchData from "../../../hooks/useFetchData";
import ItemBox from "./ItemBox";
import Spinner from "../../utility/Spinner";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const RelatedProducts = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState(null);

  const params = useMemo(
    () => ({
      limit: 4,
    }),
    []
  );

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/products/category/${categoryId}`,
    params
  );
  
  useEffect(() => {
    setRelatedProducts(data?.data);
  }, [data?.data]);
  
  return (
    <section className="w-full px-5 sm:px-10 py-10 flex-center flex-col">
      <h2 className="text-xl font-semibold mb-10">Related Products</h2>
      {loading && <Spinner />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex items-center gap-5 px-3 flex-wrap">
        {relatedProducts !== null && relatedProducts?.length > 0 && !loading
          ? relatedProducts.map(
              ({
                _id,
                name,
                category,
                price,
                salesPrice,
                imageUrl,
                averageRating,
                stock
              }) => (
                <ItemBox
                  key={_id}
                  _id={_id}
                  name={name}
                  category={category?.name}
                  categoryId={category?._id}
                  price={price}
                  salesPrice={salesPrice}
                  imageUrl={imageUrl}
                  rating={averageRating}
                  stock={stock}
                />
              )
            )
          : ""}
      </div>
    </section>
  );
};

export default RelatedProducts;
