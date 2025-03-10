/* eslint-disable react/prop-types */
import { CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CartTr = ({
  productId,
  name,
  price,
  quantity,
  imageUrl,
  handleRemoveToCart,
  handleQuantityChange,
  handleUpdateClick,
}) => {
  return (
    <>
      <tr className="border-b">
        <td className="py-3 px-5" colSpan={2}>
          <div className="flex items-center justify-around">
            <XCircle
              className="text-gray-400 transition-all cursor-pointer hover:text-gray-600"
              onClick={() => handleRemoveToCart(productId)}
            />
            <img
              src={imageUrl ? imageUrl : "/public/images/potato-1.webp"}
              className="size-20"
              alt="potato"
            />
          </div>
        </td>
        <td className="py-3">
          <Link to={`/shop/${productId}`}>{name}</Link>
        </td>
        <td className="py-3">{price}</td>
        <td className="py-3">
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) =>
              handleQuantityChange(productId, Number(e.target.value))
            }
            className="w-16 h-10 pl-4 border outline-none "
          />
        </td>
        <td className="py-3">{parseInt(quantity) * parseInt(price)}</td>
        <td className="">
          <CheckCircle2
            className={`size-7 text-white fill-green-400 opacity-45 hover:opacity-100 cursor-pointer`}
            onClick={() => handleUpdateClick(productId, quantity)}
          />
        </td>
      </tr>
    </>
  );
};

export default CartTr;
