import { useState, useEffect } from "react";
import useFetchData from "../../../hooks/useFetchData";
import ItemBox from "./ItemBox";
import Spinner from "../../utility/Spinner";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const RelatedProducts = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState(null);

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/products/category/${categoryId}`
  );

  useEffect(() => {
    setRelatedProducts(data?.data);
  }, [data?.data]);

  return (
    <section className="w-full px-10 py-10 flex-center flex-col">
      <h2 className="text-xl font-semibold mb-10">Related Products</h2>
      {loading && <Spinner />}
      <div className="flex items-center gap-5 flex-wrap">
        {relatedProducts !== null && relatedProducts?.length > 0 && !loading
          ? relatedProducts.map(({ _id, name, category, price, imageUrl, averageRating }) => (
              <ItemBox
                key={_id}
                _id={_id}
                name={name}
                category={category?.name}
                categoryId={category?._id}
                price={price}
                imageUrl={imageUrl}
                rating={averageRating}
              />
            ))
          : "Nothing found"}
      </div>
    </section>
  );
};

export default RelatedProducts;
