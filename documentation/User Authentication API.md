# User Authentication API

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

## Logout User

**Endpoint:** 

```
GET /users/logout
```

**Response:**
```json
204 No Content
```

# Business Authentication API

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

## Logout Business

**Endpoint:**

```
GET /businesses/logout
```

**Response:** 
```json
204 No Content
```