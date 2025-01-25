import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const WishList = () => {
  return (
    <div className="p-5 flex items-center gap-5 flex-wrap">
      <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
        {/* <Link to={`/shop/${_id}`}> */}
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          <img
            // src={imageUrl ? imageUrl : "/public/images/1.jpg"}
            className="w-full h-full object-fit cursor-pointer"
            // alt={name}
          />
        </div>
        {/* </Link> */}
        <div className="flex-center flex-col py-5">
          <p>Vegitables</p>
          <h4 className="text-lg font-semibold py-1">Potato</h4>
          <div className="flex-center">
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
          </div>
          <p className="mt-1">Rs. 10</p>
        </div>
      </div>
      <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
        {/* <Link to={`/shop/${_id}`}> */}
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          <img
            // src={imageUrl ? imageUrl : "/public/images/1.jpg"}
            className="w-full h-full object-fit cursor-pointer"
            // alt={name}
          />
        </div>
        {/* </Link> */}
        <div className="flex-center flex-col py-5">
          <p>Vegitables</p>
          <h4 className="text-lg font-semibold py-1">Potato</h4>
          <div className="flex-center">
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
          </div>
          <p className="mt-1">Rs. 10</p>
        </div>
      </div>
      <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
        {/* <Link to={`/shop/${_id}`}> */}
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          <img
            // src={imageUrl ? imageUrl : "/public/images/1.jpg"}
            className="w-full h-full object-fit cursor-pointer"
            // alt={name}
          />
        </div>
        {/* </Link> */}
        <div className="flex-center flex-col py-5">
          <p>Vegitables</p>
          <h4 className="text-lg font-semibold py-1">Potato</h4>
          <div className="flex-center">
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
          </div>
          <p className="mt-1">Rs. 10</p>
        </div>
      </div>
      <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
        {/* <Link to={`/shop/${_id}`}> */}
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          <img
            // src={imageUrl ? imageUrl : "/public/images/1.jpg"}
            className="w-full h-full object-fit cursor-pointer"
            // alt={name}
          />
        </div>
        {/* </Link> */}
        <div className="flex-center flex-col py-5">
          <p>Vegitables</p>
          <h4 className="text-lg font-semibold py-1">Potato</h4>
          <div className="flex-center">
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
          </div>
          <p className="mt-1">Rs. 10</p>
        </div>
      </div>
      <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
        {/* <Link to={`/shop/${_id}`}> */}
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          <img
            // src={imageUrl ? imageUrl : "/public/images/1.jpg"}
            className="w-full h-full object-fit cursor-pointer"
            // alt={name}
          />
        </div>
        {/* </Link> */}
        <div className="flex-center flex-col py-5">
          <p>Vegitables</p>
          <h4 className="text-lg font-semibold py-1">Potato</h4>
          <div className="flex-center">
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
            <Star className="text-yellow-500 fill-yellow-300" size="18" />
          </div>
          <p className="mt-1">Rs. 10</p>
        </div>
      </div>
    </div>
  );
};

export default WishList;
