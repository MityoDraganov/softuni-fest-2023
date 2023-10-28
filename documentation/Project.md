# Payment Service App

## Overview

Payment service allowing businesses to sell products and receive payments. Customers can purchase products via Stripe or Coinbase.

Built with:

- Node/Express backend restful API
- React front-end
- MongoDB database

## Endpoints

**Backend API**

Documented APIs:

- User Authentication
- Business Authentication
- Products
- Payments 

**Front-end Routes**

- `/` - Home page
- `/users/register` - User sign up 
- `/users/login` - User login
- `/users/shop` - Products listing
- `/users/shop/:id` - Single product 
- `/business/register` - Business sign up
- `/business/products` - Business product management
- `/learn-more` - About page
- `/payment-successful` - Payment confirmation

## User Authentication

Register, login, logout endpoints. 

Returns access token on register/login.

## Business Authentication 

Register, login, logout endpoints.

Returns access token for business user.

## Products API

CRUD API for products. 

Protected routes require valid business access token.

## Payments API 

Integrations:

- Stripe Checkout
- Coinbase Charges
- OpenNode (TODO)

Initiate charges via product ID.

## Database

MongoDB database with:

- Users collection
- Businesses collection
- Products collection

## React App

Main routes:

- Home page
- User and business auth
- Products listing and detail
- About page
- Payment confirmation

Uses context for state management.
