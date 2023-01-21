import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15"
});

const stripeSecret = process.env.STRIPE_WH_SECRET || "";
const stripePlan = process.env.STRIPE_PLAN_ID || "";

export default async (request: VercelRequest, _response: VercelResponse) => {
    const stripeEvent = request?.body 
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      stripeEvent && Buffer.from(stripeEvent),
      request && request.headers && request.headers['stripe-signature'] || "",
      stripeSecret
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Invalid stripe signature";
    return new Response(JSON.stringify({ message: `Webhook Error: ${errorMessage}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { object: stripeCustomer }  = (event?.data ?? {}) as {object: { id:string, billing_reason: string }};

  let statusCode = 200;
  
  switch (stripeEvent.type) {

    case "customer.subscription.deleted": {
      // perform action on delete
      break;
    }
    // if new payment renew the key
    case "invoice.payment_succeeded": {
      if (["manual", "subscription_cycle", "subscription_update"].includes(stripeCustomer.billing_reason)) {
        // perform uptime add on a11y engine
        
      }

      break;
    }

    case "customer.created": {
      const stripeSubscription = await stripe.subscriptions.create(
        {
          customer: stripeCustomer.id,
          items: [{ plan: stripePlan }],
          trial_period_days: 7
        }
      );
      console.log(stripeSubscription);
      // perform account usage update

      statusCode = 200;
      break;
    }

    default:{
      statusCode = 200
    }
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
