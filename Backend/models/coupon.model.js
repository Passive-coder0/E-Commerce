import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,  // Note: "required" was misspelled as "requiered"
        unique: true,
    },
    discountPercentage: {
        type: Number,
        required: true,  // Fixed spelling
        min: 0,
        max: 100,
    },
    expirationDate: {
        type: Date,
        required: true,  // Fixed spelling
    },
    isActive: {
        type: Boolean,
        required: true,  // Fixed spelling
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Put 'User' in quotes
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;