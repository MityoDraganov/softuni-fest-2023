# Payment Service App APIs

This app allows businesses to sell products and receive payments, while customers can purchase products.

## Endpoints Summary

- User Authentication
- Business Authentication
- Products API
- Payments API

## User Authentication

Endpoints for registering, logging in, and logging out users. Users have a first name, last name, email, and password.

On successful register or login, an access token is returned for authentication.

## Business Authentication

Similar endpoints for business accounts. Businesses have a company name and email.

Register and login return an access token for authenticated requests.

## Products API

CRUD API for managing products. Protected routes require a valid business access token.

Products have a name, description, price, and owner ID linking them to a business.

## Payments API

Handles payments via Stripe and Coinbase.

Charges are created by passing the product ID. This initiates the payment flow.

Webhooks handle payment events from Stripe and Coinbase.

## Database

MongoDB database containing:

- Users collection 
- Businesses collection
- Products collection

## Front-end

Built with React. Routes include:

- Home 
- User and business authentication
- Products listing and detail
- Payment confirmation

Uses context API for state management.

## Back-end

Node/Express REST API with documented endpoints.

Returns JSON responses and JWT tokens for authentication.