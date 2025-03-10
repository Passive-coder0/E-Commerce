import Coupon from "../models/coupon.model.js"
import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
    try {
      const { products, couponCode } = req.body;
  
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(404).json({ error: "Invalid or empty products array" });
      }
  
      let totalAmount = 0;
  
      const lineItems = products.map((product) => {
        const amount = product.price * 100; // multiply by 100 to send the amount as cents to stripe
        totalAmount += amount * product.quantity;
  
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: product.image,
            },
            unit_amount: amount,
          },
        };
      });
  
      let coupon = null;
      if (couponCode) {
        coupon = await coupon.findOne({
          code: couponCode,
          userId: req.user._id,
          isActive: true,
        });
        if (coupon) {
          // If coupon is active, gives dicsount percentage
          totalAmount -= Math.round(
            (totalAmount * coupon.discountPercentage) / 100
          );
        }
      }
  
      // Buying Session, with succes and cancel URLs
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/purchase-success?session_id=(CHECKOUT_SESSION_ID)`,
        cancel_url : `${process.env.CLIENT_URL}/purchase-cancel`,
        discounts: coupon ? [
          {
              coupon : await createStripeCoupon(coupon.discountPercentage),
          }
        ] : [],
        // The fields that we can extract from the session
        metadata: {
          userId:req.user.id.toString(),
          couponCode: couponCode || "",
          products: JSON.stringify(
            products.map((p) => ({
                id: p._id,
                quantity: p.quantity,
                price: p.price,
            }))
          )
        }
      });
      // If purchase is more than 200$, give user a coupon for next purchase
      if(totalAmount >= 200 * 100) {
          await createNewCoupon(req.user._id);
      }
      res.status(200).json({id:session.id, totalAmount: totalAmount / 100})
    } catch (error) {
        console.log("Error in processing checkout:", error);
        res.status(500).json({message: "Error in processing checkout", error: error.message});
    }
  };

  export const checkhoutSuccess = async (req, res) => {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.session.retrieve(sessionId);

        if( session.payment_status === "paid") {
            if(session.metadata.couponCode) {
                // Disable coupon after purchase
                await Coupon.findOneAndUpdate({
                    code: session.metadata.couponCode, userId: session.metadata.userId
                }, {
                   isActive: false, 
                })
            }

            // create a new order
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user:session.metadata.userId,
                products: products.map(product => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100,     // Converts from cents to dollars
                stripeSessionId: sessionId,
            })

            await newOrder.save();
        }
    } catch (error) {
        console.log("Error in processing succesful checkout:", error);
        res.status(500).json({message: "Error in processing successful checkout", error: error.message});
    }
}

  async function createStripeCoupon(discountPercentage) {
      const coupon = await stripe.coupons.create({
          percent_off: discountPercentage,
          duration: "once",
      });
  
      return coupon.id;
  }
  
  async function createNewCoupon(userId) {
      const newCoupon = new Coupon({
          code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          discountPercentage: 10,
          // Expiration date will be 30 days
          expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          userId: userId
      })
  
      await newCoupon.save();
  
      return newCoupon
  }