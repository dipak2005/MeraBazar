const WishListModel = require("../../models/WishListModel");
const UserModel = require("../../models/UserModel");

// Add product to wishlist
const addToWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    let wishlist = await WishListModel.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishListModel({ userId, items: [{ productId }] });
    } else {
      const exists = wishlist.items.some(
        (item) => item.productId.toString() === productId
      );

      if (exists) {
        return res.status(200).json({
          success: true,
          message: "Product already in wishlist",
          data: wishlist,
        });
      }

      wishlist.items.push({ productId });
    }

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get wishlist
const getWishList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required!",
      });
    }

    const wishlist = await WishListModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "title salePrice image discount price description",
    });

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found!",
        data: [],
      });
    }

    const newWishlist = wishlist.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      salePrice: item.productId.salePrice,
      image: item.productId.image,
      discount: item.productId.discount,
      price: item.productId.price,
      description:item.productId.description,
    }));

    res.status(200).json({
      success: true,
      data: newWishlist,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete product from wishlist
const deleteWishList = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required!",
      });
    }

    const wishlist = await WishListModel.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "No wishlist found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: wishlist.items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { addToWishList, getWishList, deleteWishList };
