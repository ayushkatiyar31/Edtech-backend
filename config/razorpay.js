const Razorpay = require("razorpay");

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    console.error("RAZORPAY_KEY or RAZORPAY_SECRET is missing in .env file");
    throw new Error("Razorpay credentials are required");
}

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})