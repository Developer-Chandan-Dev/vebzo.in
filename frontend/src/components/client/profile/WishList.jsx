import { useContext } from "react";
import { FavsContext } from "../../../context/FavsContext";
import ItemBox from "../shop/ItemBox";

const WishList = () => {
  const { favs } = useContext(FavsContext);
  console.log(favs);

  return (
    <div className="p-5 flex items-center gap-5 flex-wrap">
      {favs?.favorites && favs?.favorites.length > 0
        ? favs?.favorites.map((item, index) => (
            <ItemBox
              key={index}
              _id={item?._id}
              name={item?.name}
              category={item?.category?.name}
              categoryId={item?.category?._id}
              price={item?.price}
              salesPrice={item?.salesPrice}
              imageUrl={item?.imageUrl}
              stock={item?.stock}
              rating={item.averageRating}
            />
          ))
        : "Not Found or Not Added"}
    </div>
  );
};

export default WishList;
