const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post('/checkoutRoute', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.bookName, // Use the provided book name
            },
            unit_amount: item.price * 100, // Converting price to cents
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/order_history`,
      cancel_url: `http://localhost:3000/order_history`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "An error occurred while creating checkout session" });
  }
});

module.exports = router;
