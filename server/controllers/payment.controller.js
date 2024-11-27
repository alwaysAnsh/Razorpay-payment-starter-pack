import { createRazorpayInstance } from "../config/razorpay.config.js";
import dotenv from 'dotenv'
dotenv.config();
import crypto from 'crypto-browserify'

const razorpayInstance = createRazorpayInstance();




export const createOrder = async (req, res) => {
    const { amount } = req.body;
    console.log("amount: ", amount)

    if(!amount){
        console.log("course id and amount not found: ", amount)
        return res.status(404).json({
            success: false,
            message: "courseid or amount not found"
        })
    }
    

    //create order
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt order 1"
    }

    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if(err){
                console.error("Error creating Razorpay order:", err);
                return res.status(500).json({
                    success: false,
                    message: "something went wrong in creating the order",
                    error: err.message
                })
            }
            return res.status(200).json({
                success: true,
                message: "order created succesfully",
                order
            })
        })
    } catch (error) {
        console.error("Unexpected error:", error); // Catch unexpected errors
    return res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
        error: error.message // Optional: Include the error message
    });
    }
}

export const verifyPayment = async (req, res ) => {
    const {order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // create hmac object
    const hmac = crypto.createHmac("sha256", secret)

    hmac.update(order_id + '|' + payment_id)

    const generatedSignature = hmac.digest("hex")

    if(generatedSignature === signature){
        //db operation can be done herer
        return res.status(200).json({
            success: true,
            message: "payment verification suceess"
        })
    }else{
        return res.status(500).json({
            success: false,
            message: "payment not completed. Payment verification failed."
        })
    }

}