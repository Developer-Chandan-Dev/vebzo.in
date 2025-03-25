/* eslint-disable react/prop-types */
import { Star, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../store/features/reviewSlice";
import Empty from "../../utility/Empty";

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const { reviewItems, isLoading } = useSelector((state) => state?.review);

  return (
    <div className="px-4 py-5">
      <h3 className="text-lg font-semibold py-3">Reviews</h3>
      <ul className="">
        {isLoading && "Loading..."}
        {reviewItems.length > 0 && reviewItems !== null && !isLoading
          ? reviewItems.map((item, index) => (
              <li key={index} className="my-3">
                <div className="flex items-center gap-3">
                  {item?.userId?.imageUrl ? (
                    <img
                      src={item?.userId?.imageUrl}
                      className="w-7 h-7 rounded-full overflow-hidden border "
                      alt=""
                    />
                  ) : (
                    <UserCircle2 className="text-gray-600" />
                  )}

                  <span className=" italic text-sm">
                    {item?.userId?.username}
                  </span>
                  <div className="flex items-center gap-[2px]">
                    {[...Array(parseInt(5))].map((_, index) => {
                      index += 1;
                      return (
                        <Star
                          key={index}
                          className={`size-4 text-gray-400 ${
                            index <= item?.rating
                              ? "fill-yellow-300 text-yellow-600 "
                              : ""
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className="ml-3 mt-2">{item.comment}</p>
              </li>
            ))
          : <Empty/>}
      </ul>
    </div>
  );
};

export default Reviews;
