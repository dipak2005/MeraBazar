const paypal = require("../../helper/paypal");
const OrderModel = require("../../models/OrderModel");
const ProductModel = require("../../models/ProductModel");
const CartModel = require("../../models/CartModel");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // totalprice
    const totalPrice = cartItems.reduce((acc, item) => {
      const basePrice = parseFloat(item.salePrice || item.price || 0);
      return acc + basePrice * item.quantity;
    }, 0);

    // discount amount
    const discount = cartItems.reduce((acc, item) => {
      const discountRate = item?.discount || 0;
      const base = parseFloat(item.salePrice || 0);
      const itemDiscount = ((base * discountRate) / 100) * item.quantity;
      return acc + itemDiscount;
    }, 0);

    const deliveryCharge = totalPrice > 500 ? 0 : 40;
    const grandTotal = totalPrice - discount + deliveryCharge;

     const itemList = cartItems.map((item) => {
      const basePrice = parseFloat(item.salePrice || item.price || 0);
      return {
        name: item.title,
        sku: item.productId,
        price: basePrice.toFixed(2),
        currency: "USD",
        quantity: item.quantity,
      };
    });

    // const calculatedTotal = itemList.reduce((acc, item) => {
    //   return acc + parseFloat(item.price) * item.quantity;
    // }, 0);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/shop/paypal-return",
        cancel_url: "http://localhost:3000/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: itemList,
          },
          amount: {
            currency: "USD",
            total: grandTotal.toFixed(2),
          },
          description: "MeraBazar Order",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        const newlyCreatedOrder = new OrderModel({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount: grandTotal.toFixed(2),
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCardId = order.cartId;
    await CartModel.findByIdAndDelete(getCardId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });

    if (!orders.length) {
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

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
