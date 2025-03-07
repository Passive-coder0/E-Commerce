import Stripe from "stripe";
import dotenv from "dotenv";
//Config Stripe Payment (Unused here)

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);