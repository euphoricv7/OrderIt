const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

const authController = require("../controllers/authController");

router.route("/payment/process").post(authController.protect, processPayment);
router.route("/stripeapi").get(sendStripeApi);

module.exports = router;