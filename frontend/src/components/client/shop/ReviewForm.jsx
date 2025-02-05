import { useState } from "react";
import { Star } from "lucide-react";
import Button from "../../utility/Button";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { handleSubmit } = useHandleSendingRequest();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="w-full border border-gray-300 text-gray-600 px-5 py-5">
      <h2 className="text-xl font-semibold py-1">Add a review</h2>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="flex items-center gap-3 py-3">
        <p>
          Your Rating <span>*</span>
        </p>
        <div className="flex items-center gap-1">
          <Star className=" size-5  text-gray-500" />
          <Star className=" size-5  text-gray-500" />
          <Star className=" size-5  text-gray-500" />
          <Star className=" size-5  text-gray-500" />
          <Star className=" size-5  text-gray-500" />
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
      {/* <div className="flex items-center my-2 w-full gap-2">
        <input
          type="text"
          className="w-1/2 h-12 border outline-gray-300 px-3 py-2"
          placeholder="Your name"
          required
        />
        <input
          type="email"
          className="w-1/2 h-12 border outline-gray-300 px-3 py-2 "
          placeholder="Your email"
          required
        />
      </div> */}
      {/* <div className="flex items-center gap-2 my-4">
        <input type="checkbox" id="stockCommentAuthorDetails" />
        <label htmlFor="stockCommentAuthorDetails">
          {" "}
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </div> */}
      <Button label="Submit" type={"submit"} />
    </form>
  );
};

export default ReviewForm;
