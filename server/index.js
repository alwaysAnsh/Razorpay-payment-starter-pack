import express from "express";
import "dotenv/config";
import cors from "cors";
// import {
//     ApiError,
//     CheckoutPaymentIntent,
//     Client,
//     Environment,
//     LogLevel,
//     OrdersController,
//     PaymentsController,
// } from "@paypal/paypal-server-sdk";
import bodyParser from "body-parser";
import router from "./routes/payment.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT;

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("this is home back")
})

app.listen(PORT, () => {
    console.log(`Node server listening at http://localhost:${PORT}/`);
}); 


// const {
//     PAYPAL_CLIENT_ID,
//     PAYPAL_CLIENT_SECRET,
//     PORT = 8080,
// } = process.env;

// const client = new Client({
//     clientCredentialsAuthCredentials: {
//         oAuthClientId: PAYPAL_CLIENT_ID,
//         oAuthClientSecret: PAYPAL_CLIENT_SECRET,
//     },
//     timeout: 0,
//     environment: Environment.Sandbox,
//     logging: {
//         logLevel: LogLevel.Info,
//         logRequest: { logBody: true },
//         logResponse: { logHeaders: true },
//     },
// }); 
// const ordersController = new OrdersController(client);
// const paymentsController = new PaymentsController(client);

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
// const createOrder = async (cart) => {
//     const collect = {
//         body: {
//             intent: "CAPTURE",
//             purchaseUnits: [
//                 {
//                     amount: {
//                         currencyCode: "USD",
//                         value: "0.1",
//                     },
//                 },
//             ],
//         },
//         prefer: "return=minimal",
//     }; 

//     try {
//         const { body, ...httpResponse } = await ordersController.ordersCreate(
//             collect
//         );
//         // Get more response info...
//         // const { statusCode, headers } = httpResponse;
//         return {
//             jsonResponse: JSON.parse(body),
//             httpStatusCode: httpResponse.statusCode,
//         };
//     } catch (error) {
//         if (error instanceof ApiError) {
//             // const { statusCode, headers } = error;
//             throw new Error(error.message);
//         }
//     }
// };

// createOrder route
// app.post("/api/orders", async (req, res) => {
//     try {
//         console.log("inside orders appi")
//         // use the cart information passed from the front-end to calculate the order amount detals
//         const { cart } = req.body;
//         const { jsonResponse, httpStatusCode } = await createOrder(cart);
//         console.log(jsonResponse)
//         res.status(httpStatusCode).json(jsonResponse);
//     } catch (error) {
//         console.error("Failed to create order:", error);
//         res.status(500).json({ error: "Failed to create order." });
//     }
// });



/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
// const captureOrder = async (orderID) => {
//     const collect = {
//         id: orderID,
//         prefer: "return=minimal",
//     };

//     try {
//         const { body, ...httpResponse } = await ordersController.ordersCapture(
//             collect
//         );
//         // Get more response info...
//         // const { statusCode, headers } = httpResponse;
//         return {
//             jsonResponse: JSON.parse(body),
//             httpStatusCode: httpResponse.statusCode,
//         };
//     } catch (error) {
//         if (error instanceof ApiError) {
//             // const { statusCode, headers } = error;
//             throw new Error(error.message);
//         }
//     }
// };

// captureOrder route
// app.post("/api/orders/:orderID/capture", async (req, res) => {
//     try {
//         const { orderID } = req.params;
//         const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
//         res.status(httpStatusCode).json(jsonResponse);
//     } catch (error) {
//         console.error("Failed to create order:", error);
//         res.status(500).json({ error: "Failed to capture order." });
//     }
// });


