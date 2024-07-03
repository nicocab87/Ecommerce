const { Router } = require("express");
const PaymentController = require("../controllers/payment.controller");

const router = Router()

router.post('/api/paymentsIntents', PaymentController.makePaymentIntent)

module.exports = router