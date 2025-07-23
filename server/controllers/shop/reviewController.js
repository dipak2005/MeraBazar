const ProductModel = require("../../models/ProductModel");
const OrderModel = require("../../models/OrderModel");
const ReviewModel = require("../../models/ReviewModel");

const addProductReview = async (req, res) => {
  try {
    /*
    productId: String,
    userId: String,
    username: String,
    revieMessage: String,
    reviewVal: Number,
    */
    const { productId, userId, username, reviewMessage, reviewVal } = req.body;

    console.log("Incoming Review Payload:", req.body);

    if (typeof reviewVal !== "number" || reviewVal < 1 || reviewVal > 5) {
  return res
    .status(400)
    .json({ success: false, message: "Invalid rating value. Must be 1-5." });
}

    const order = await OrderModel.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase  product to review it.",
      });
    }

    const chekExistingReview = await ReviewModel.findOne({
      productId: productId.toString(),
      userId: userId.toString(),
    });

    if (chekExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You alredy reviewed this product!",
      });
    }

    const newReview =  new  ReviewModel({
      productId,
      userId,
      username,
      reviewMessage,
      reviewVal,
    });

    await newReview.save();

    const reviews = await ReviewModel.find({ productId }).sort({
      createdAt: -1,
    });
    const totalReviewLength = reviews.length;

    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewVal, 0) /
      totalReviewLength;

   await ProductModel.findByIdAndUpdate(productId, { averageReview });


    res.status(200).json({
      success: true,
      data: newReview,
      averageReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { addProductReview, getProductReview };
