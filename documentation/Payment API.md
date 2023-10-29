# Payment API

## Overview

Handles payments via Stripe, Coinbase Commerce, and OpenNode.

Endpoints:

- `POST /pay/:id` - Stripe checkout
- `POST /pay/coinbase/:id` - Coinbase charge
- `POST /stripe-webhook` - Stripe webhook
- `POST /coinbase-webhook` - Coinbase webhook
- `POST /pay/opennode/:id` - OpenNode charge (commented out)

## Stripe Payments

**Endpoint:**

```
POST /pay/:id
```

- Uses Stripe secret key 
- Calls `createSession()` to make Checkout Session
- Session contains price data, URLs, etc
- Redirects to Stripe hosted checkout

**Client Usage:**

1. Receive Checkout `session` object
2. Redirect user to `session.url` 
3. User enters payment details on Stripe page
4. User redirected back to `success_url`

## Coinbase Payments 

**Endpoint:**

```
POST /pay/coinbase/:id 
```

- Uses Coinbase API key and client
- Calls `createCharge()` to make Charge
- Charge contains price, description, redirect URL
- Redirects to Coinbase hosted checkout


## OpenNode Payments

**Endpoint:**

```
POST /pay/opennode/:id
```

- Uses OpenNode credentials 
- Calls `createCharge()` to make Charge request
- Returns checkout URL to redirect user to
- Would need webhook handling

## Webhooks:

- Verifies webhook signature
- Handles `charge:confirmed` and `charge:failed` events  