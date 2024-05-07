import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoombookedSchema = new Schema({
    roomId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    roomNo:{
        type: String,
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Booked",
    }
}, { timestamps: true });

const Roombooked = mongoose.model("Roombooked", RoombookedSchema);

export default Roombooked;
