import React, { useState } from "react";
import { Star } from "lucide-react"; // or use font-awesome
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewReviews, getReviews } from "../../../store/shop/reviewSlice";
import { useEffect } from "react";

const ProductReview = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [averageReview, setAverageReview] = useState(0);
  const { reviewList } = useSelector((state) => state.reviewProduct);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to write a review.");
    if (!rating || !comment.trim())
      return toast.warn("Please rate and review first.");

    try {
      dispatch(
        addNewReviews({
          productId: product?._id,
          userId: user?.id,
          username: user?.username,
          reviewMessage: comment,
          reviewVal: rating,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          setRating(0);
          setComment("");
          dispatch(getReviews(product?._id));
          toast.success("Review Added Successfully!");
        }
      });
    } catch (e) {
      toast.error(data?.payload?.message);
    }
  };

  useEffect(() => {
    const averageReview =
      reviewList && reviewList.length > 0
        ? reviewList.reduce(
            (sum, reviewItem) => sum + reviewItem.reviewVal,
            0
          ) / reviewList.length
        : 0;
    setAverageReview(averageReview);
  }, [reviewList]);

  useEffect(() => {
    if (product?._id) {
      dispatch(getReviews(product?._id));
    }
  }, [dispatch, product?._id]);

  return (
    <div className="mt-4">
      <h5 className="mb-3">Rate & Review this product</h5>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => {
                console.log(star);
                setRating(star);
              }}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className={`me-1 cursor-pointer ${
                star <= (hoveredStar || rating) ? "text-warning" : "text-muted"
              }`}
            />
          ))}
        </div>

        <textarea
          className="form-control my-3"
          placeholder="Write your review here..."
          value={comment}
          id="review-box"
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />

        <button disabled={comment.trim() === ""} className="btn btn-outline-primary btn-sm" type="submit">
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      {reviewList && reviewList.length > 0 && (
        <div className="border-top pt-3 row bg-light">
          <h6 className="mb-2">Customer Reviews</h6>
          {reviewList.map((review) => (
            <div key={review._id} className="mb-3 ">
              <div className="user d-flex ">
                <div
                  className="d-flex align-items-center justify-content-center ms-2 rounded-circle bg-primary"
                  style={{ width: "30px", height: "30px" }}
                >
                  <b className="text-white" style={{ fontSize: "14px" }}>
                    {review?.username[0].toUpperCase()}
                  </b>
                </div>{" "}
                &nbsp;&nbsp;
                <div className="d-flex align-items-center mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`me-1 small ${
                        s <= review.reviewVal ? "text-warning" : "text-muted"
                      }`}
                      size={14}
                    />
                  ))}
                </div>
              </div>
              <p className="mb-1 small pl-4">{review.reviewMessage}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReview;
