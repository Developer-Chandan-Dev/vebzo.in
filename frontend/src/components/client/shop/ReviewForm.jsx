/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../utility/Button";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
import useFetchData from "../../../hooks/useFetchData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState(null);

  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/reviews/${productId}`
  );

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  const { handleSubmit } = useHandleSendingRequest();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await handleSubmit(
        "POST",
        `${VITE_API_URL}/api/v1/reviews/`,
        {
          productId: productId,
          comment: review,
          rating,
        }
      );

      toast.success(res);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <form
      className="w-full border border-gray-300 text-gray-600 px-5 py-5 mt-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold py-1">Add a review</h2>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
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
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      ></textarea>
      <Button label="Submit" type={"submit"} />
    </form>
  );
};

export default ReviewForm;
