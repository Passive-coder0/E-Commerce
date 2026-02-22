import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
    try {
      const cartItems = req.user.cartItems || [];
      const productIds = cartItems
        .map((item) => item.product)
        .filter(Boolean);

      const products = await Product.find({ _id: { $in: productIds } });

      const cartProducts = products.map((product) => {
        const item = cartItems.find(
          (cartItem) => cartItem.product?.toString() === product._id.toString(),
        );

        return { ...product.toJSON(), quantity: item?.quantity || 1 };
      });

      res.json(cartProducts);

    } catch (error) {
      console.log("server error in getCartProducts: " + error.message);
      res
        .status(501)
        .json({
          message: "Server error in getCartProducts",
          error: error.message,
        });
    }
  };
  
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.product?.toString() === productId,
    );

    // If it exists just increase the quantity
    if (existingItem) {
      existingItem.quantity += 1;
    }
    // If doesn't then just create a new one
    else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller: " + error.message);
    res
      .status(500)
      .json({ message: "Server error in addToCart", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    }
    // Removes the item and ignores others
    else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product?.toString() !== productId,
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("server error in removeAllFromCart: " + error.message);
    res
      .status(501)
      .json({
        message: "Server error in removeAllFromCart",
        error: error.message,
      });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product?.toString() === productId,
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.product?.toString() !== productId,
        );
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product  not found" });
    }
  } catch (error) {
    console.log("server error in updateQuantity: " + error.message);
    res
      .status(501)
      .json({
        message: "Server error in updateQuantity",
        error: error.message,
      });
  }
};
