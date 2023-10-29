# Auth API

## Business Endpoints

- `POST /businesses/register` - Register new business
- `POST /businesses/login` - Login business
- `GET /businesses/logout` - Logout business  
- `GET /businesses/getAll` - Get all businesses

## User Endpoints

- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/logout` - Logout user
- `GET /users/purchases/:id` - Get user purchases 

## Register Business

**Endpoint:** 

```
POST /businesses/register
```

**Body:**

```json
{
  "email": "business@email.com",
  "companyName": "Acme Co", 
  "password": "password123" 
}
```

**Response:**

```json
{
  "email": "business@email.com",
  "companyName": "Acme Co",
  "_id": "61f3c492b84e8d6fdf339dc9",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Registers a new business user with the provided email, company name and password.

Returns the new user object with auto-generated id and JWT access token.

## Login Business

**Endpoint:**

```  
POST /businesses/login
```

**Body:** 

```json
{
  "email": "business@email.com",
  "password": "password123" 
}
```

**Response:**

```json
{
  "email": "business@email.com",
  "companyName": "Acme Co",
  "_id": "61f3c492b84e8d6fdf339dc9",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Logs in an existing business user with the provided email and password. 

Returns the user object with id and new JWT access token.

## Logout Business  

**Endpoint:**

```
GET /businesses/logout
```

**Response:**

```
204 No Content
```

Logs out the currently logged in business user by deleting their access token.

## Get All Businesses

**Endpoint:** 

```
GET /businesses/getAll
```

**Response:**

```json
[
  {
    "_id": "61f3c492b84e8d6fdf339dc9",
    "email": "business1@email.com",
    "companyName": "Acme Co"
  },
  {  
    "_id": "61f4c492b84e8d6fdf339dc0",
    "email": "business2@email.com",
    "companyName": "Globex Corp"
  }
] 
```

Returns an array of all registered business user objects.

## Register User

**Endpoint:**

```
POST /users/register 
```

**Body:**

```json
{
  "email": "user@email.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123" 
}
```

**Response:** 

```json
{
  "email": "user@email.com",
  "firstName": "John",
  "lastName": "Doe",
  "_id": "61f3c234b84e8d6fdf339dc7",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Registers a new user with the provided email, name, and password.  

Returns the new user object with auto-generated id and JWT access token.

## Login User

**Endpoint:** 

```
POST /users/login
```

**Body:**

```json 
{
  "email": "user@email.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "email": "user@email.com", 
  "firstName": "John",
  "lastName": "Doe",
  "_id": "61f3c234b84e8d6fdf339dc7",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."   
}
```

Logs in an existing user with the provided email and password.

Returns the user object with id and new JWT access token. 

## Logout User

**Endpoint:**

```
GET /users/logout  
```

**Response:**

```
204 No Content
```

Logs out the currently logged in user by deleting their access token.

## Get Purchase History

**Endpoint:**

```
GET /users/purchases/:id
```

**Response:** 

```json
[
  {
    "_id": "61f4d350b84e8d6fdf339dca",
    "product": {
      "_id": "61f3dd2eb84e8d6fdf339dc8",
      "name": "Product 1"
    },  
    "datePurchased": "2023-01-29T18:17:04.285Z", 
    "business": {
      "_id": "61f3c492b84e8d6fdf339dc9",
      "companyName": "Acme Co"
    }
  }
]
```

Returns the purchase history for the user with the given id.