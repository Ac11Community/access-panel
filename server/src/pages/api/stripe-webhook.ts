import type { APIRoute } from 'astro';

import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
});

export const post: APIRoute = async ({ request }) => {
  const stripeEvent = await request?.json();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      stripeEvent && Buffer.from(stripeEvent),
      request.headers.get('stripe-signature') || "",
      import.meta.env.STRIPE_WH_SECRET
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
          items: [{ plan: import.meta.env.STRIPE_PLAN_ID }],
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
