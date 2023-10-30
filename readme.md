# Payment Service App

##📊
[Final results - Лист1.pdf]
(https://github.com/MityoDraganov/softuni-fest-2023/files/13210116/Final.results.-.1.pdf)
### Certificates
<br>
Kamen Kanev
https://github.com/MityoDraganov/softuni-fest-2023/assets/106108077/00290a85-ca04-41cd-ad86-0d4225a07547
<br>
Mityo Draganov
https://github.com/MityoDraganov/softuni-fest-2023/assets/106108077/4a8e89f2-314b-4bf5-8281-8eef8577c6d2
<br>
Stefan Todorov
https://github.com/MityoDraganov/softuni-fest-2023/assets/106108077/160c468d-3e0b-4e5b-95ea-db02eaff6e60
<br>
<br>




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

## Enviroment Variables Needed To Build The Project

Required configuration values to run the application:

## JWT

```
JWT_SECRET=asoiducan93284c9rew 
```

Secret key used for signing JWT tokens.

## Stripe

```
STRIPE_SECRET_KEY=sk_test_51O5pvaBcIDK19xymlkZratC5q9Q7DyCLouourw5EG1zTvc38ST9N6Oc9XfdYiCZkNstUjYMeSL3aGh9tRCyFd96y00xpReLbE0
```

API key for interacting with Stripe. Used for payments.

## Coinbase

```
COINBASE_API_KEY=5d62bc60-cc46-432e-be15-b194ac0d6d5a
```

API key for Coinbase Commerce charges and webhooks.

## URLs 

```
PAYMENT_SUCCESS_URL=http://localhost:3000/payment/success
PAYMENT_CANCEL_URL=http://localhost:3000/payment/cancel/
```

Redirect URLs for Stripe/Coinbase checkout.
