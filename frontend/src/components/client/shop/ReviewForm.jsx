/* eslint-disable react/prop-types */
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../utility/Button";
import Reviews from "./Reviews";
import { useDispatch } from "react-redux";
import {
  addNewReview,
  fetchReviews,
} from "../../../store/features/reviewSlice";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const dispatch = useDispatch();

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please give rating.");
    }

    dispatch(
      addNewReview({
        productId,
        rating,
        comment,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchReviews(productId));
        toast.success("Review Added successfully.");
        setComment("");
        setRating(0);
      }
      if (data?.payload?.success === false) {
        dispatch(fetchReviews(productId));
        toast.error(data?.payload?.message);
      }
    });
  };

  return (
    <>
      <Reviews productId={productId} />
      <form
        className="w-full border border-gray-300 text-gray-600 px-5 py-5 mt-5"
        onSubmit={handleAddReview}
      >
        <h2 className="text-xl font-semibold py-1">Add a review</h2>
        <div className="flex items-center gap-3 py-3">
          <p>
            Your Rating <span>*</span>
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <Star
                  key={index}
                  className={`size-5 text-gray-400 cursor-pointer ${
                    index <= (hover || rating)
                      ? "fill-yellow-300 text-yellow-500"
                      : ""
                  }`}
                  onClick={() => handleClick(index)}
                  onMouseMove={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave()}
                />
              );
            })}
          </div>
        </div>
        <label htmlFor="review-textarea" className="py-1">
          Your Review <span>*</span>
        </label>
        <textarea
          name="review-textarea"
          className="w-full h-32 border px-3 py-3 mb-2 outline-gray-300 resize-none"
          id="review-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <Button label="Submit" type={"submit"} />
      </form>
    </>
  );
};

export default ReviewForm;
