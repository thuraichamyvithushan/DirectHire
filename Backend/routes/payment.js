const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51Om8diJsNbczZewU9AG1eUdCQHZxPzQ9GizNeJOskO7U9Ef3AYrPDy2U460nbWOQuXSlrhxxFxDwXz8hYfJnrW6800ukl5S74q");

// POST endpoint for making a payment
router.post("/payment", (req, res) => {
    const { product, token } = req.body;
    const transactionKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            amount: product.price,
            currency: "lkr",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "An error occurred while processing the payment." });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occurred while creating customer." });
    });
});

// GET endpoint for retrieving all payments
router.get("/payments", (req, res) => {
    stripe.charges.list(
        { limit: 10 }, // Adjust the limit as per your requirements
        (err, charges) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "An error occurred while fetching payments." });
            }
            res.json(charges);
        }
    );
});

module.exports = router;
