# Payment Service App

## Overview

- Allows businesses to sell products and receive payments
- Customers can purchase products via Stripe, Coinbase
- Users can have purchase history
- Integrates Stripe Checkout, Subscriptions, and Coinbase Charges  

## Endpoints

### Businesses

- `POST /businesses/register` - Register business
- `GET /businesses/logout` - Logout business
- `GET /businesses/getAll` - Get all businesses

### Users

- `POST /users/register` - Register user
- `POST /users/login` - Login user
- `GET /users/logout` - Logout user
- `GET /users/purchases/:id` - Get purchase history for user

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID 
- `POST /products/create` - Create product 
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Payments

- `POST /pay/:id` - Stripe checkout session
- `POST /pay/coinbase/:id` - Coinbase charge
- `POST /stripe-webhook` - Handle Stripe webhooks
- `POST /coinbase-webhook` - Handle Coinbase webhooks

## Models

- User
  - firstName
  - lastName 
  - email
  - hashedPassword
- Business 
  - companyName
  - email
  - hashedPassword
- Product
  - name
  - description
  - price
  - owner (Business)

## Services

- Authentication
  - JWT used for access tokens
  - Login/logout invalidate tokens
- Bcrypt password hashing
- Stripe and Coinbase integrations
- Purchase history utility
