import {React, useEffect} from "react";
import axios from 'axios'
import courses from "../utils/courses.js";

export const Razorpay = () => {

    const loadScript = (src) => {
        return new Promise((resolve) => {
          // Create a new <script> element
          const script = document.createElement("script");
          script.src = src; // Set the script's source to the provided URL
          script.async = true; // Optional: Makes the script load asynchronously
      
          // Event listener: When the script loads successfully
          script.onload = () => {
            resolve(true); // Resolve the promise with 'true'
          };
      
          // Event listener: If the script fails to load
          script.onerror = () => {
            resolve(false); // Resolve the promise with 'false'
          };
      
          // Append the <script> to the <body> to start loading
          document.body.appendChild(script);
        });
      };

      const onPayment = async (price, name) => {
        try {
          // Step 1: Send request to backend to create an order
          const options = {
            // courseId: 1, // Replace with dynamic course ID if needed
            amount: price , // Amount in paise (Razorpay requires amount in paise)
          };
      
          const res = await axios.post("http://localhost:8080/api/create-order", options);
          const data = res.data;
      
          console.log("Order creation response: ", data);
      
          if (!data.order.id) {
            alert("Failed to create an order. Please try again.");
            return;
          }
      
          // Step 2: Configure Razorpay Payment Modal
          const paymentObject = new window.Razorpay({
            key: "rzp_test_BZPTGEEZTiS8c0", // Replace with your Razorpay test/live key
            order_id: data.order.id, // Razorpay Order ID returned from backend
            amount: data.order.amount, // Amount to be paid (converted to paise)
            currency: data.order.currency, // INR by default
            name: "Data Science Bootcamp", // Course Name
            description: "Course Purchase",
            handler: function (response) {
              console.log("Payment successful response:", response);
      
              // Step 4: Verify payment on the backend
              const verificationData = {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              };
      
              axios
                .post("http://localhost:8080/api/verify-payment", verificationData)
                .then((verificationRes) => {
                  if (verificationRes.data.success) {
                    alert("Payment successful and verified!");
                  } else {
                    alert("Payment verification failed.");
                  }
                })
                .catch((err) => {
                  console.error("Verification error:", err);
                  alert("An error occurred during payment verification.");
                });
            },
            
          });
      
          // Step 3: Open Razorpay Payment Modal
          paymentObject.open();
        } catch (error) {
          console.error("Error in onPayment: ", error);
          alert("An error occurred while processing your payment. Please try again.");
        }
      };
      

      useEffect(() => {
        const load = loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!load){
            console.log("scraipt not loaded")
        }
        if(load){
            console.log("script loaded")
        }
      }, [])



  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 p-6 bg-gray-100">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-lg w-80 p-4 transform hover:scale-105 transition-transform duration-300"
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold text-blue-600">{course.price}</span>
              <span className="text-sm text-gray-500">{course.instructor}</span>
            </div>
            <button onClick = {() => onPayment(course.price, course.title, course.id)} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


