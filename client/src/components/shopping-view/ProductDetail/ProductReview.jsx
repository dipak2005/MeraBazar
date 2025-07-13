import React, { useState } from "react";
import { Star } from "lucide-react"; // or use font-awesome
import { useSelector } from "react-redux";

const ProductReview = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return alert("Please rate and review.");
    const newReview = {
      id: Date.now(),
      rating,
      comment,
      user: user.username[0].toUpperCase(), // Replace with logged-in user
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-4">
      <h5 className="mb-3">Rate & Review this product</h5>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className={`me-1 cursor-pointer ${
                star <= (hoveredStar || rating) ? "text-warning" : "text-muted"
              }`}
            />
          ))}
        </div>

        <textarea
          className="form-control mb-2"
          placeholder="Write your review here..."
          value={comment}
          id="review-box"
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />

        <button className="btn btn-outline-primary btn-sm" type="submit">
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="border-top pt-3 row bg-light">
          <h6 className="mb-2">Customer Reviews</h6>
          {reviews.map((review) => (
            <div key={review.id} className="mb-3 ">
              <div className="user d-flex ">
                <div
                  className="d-flex align-items-center justify-content-center ms-2 rounded-circle bg-primary"
                  style={{ width: "30px", height: "30px" }}
                >
                  <b className="text-white" style={{ fontSize: "14px" }}>
                    {review.user?.charAt(0).toUpperCase()}
                  </b>
                </div> &nbsp;&nbsp;
                <div className="d-flex align-items-center mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`me-1 small ${
                        s <= review.rating ? "text-warning" : "text-muted"
                      }`}
                      size={14}
                    />
                  ))}
                </div>
              </div>
              <p className="mb-1 small pl-4">{review.comment}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReview;
