const OrderModel = require("../../models/OrderModel");

const getAllOrdersofAllUsers = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrdersBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await OrderModel.find({
      "cartItems.sellerId": sellerId
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this seller!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching seller orders",
    });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await OrderModel.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order Status is updated Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllOrdersofAllUsers,
  updateOrderStatus,
  getOrderDetailsForSeller,
  getOrdersBySellerId
};
