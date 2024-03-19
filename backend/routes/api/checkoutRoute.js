const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "book1" }],
  [2, { priceInCents: 20000, name: "book2" }],
]);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "An error occurred while creating checkout session" });
  }
});

module.exports = router;