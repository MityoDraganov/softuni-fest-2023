
# Products API
## Headers
All endpoints require:

- `Content-Type: application/json`
## Get All Products

**Endpoint:**


```
GET /products
```

**Response:**

```json
[
  {
    "_id": "63fda3b3f7b9641b766a99cb",
    "name": "Product 1",
    "description": "Description for product 1", 
    "price": 99.99,
    "owner": "63fd9f7df7b9641b766a99c5"
  },
  {
    "_id": "63fda3cff7b9641b766a99cc",  
    "name": "Product 2",
    "description": "Description for product 2",
    "price": 149.99,
    "owner": "63fd9f7df7b9641b766a99c5"
  }
]
```

## Create Product

**Endpoint:** 

```
POST /products/create
```
## Headers
- `X-Authorization: {token}` with a valid business access token 

**Body:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99 
}
```

**Response:**

```json
{
  "_id": "63fda56ef7b9641b766a99cd",
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "owner": "63fd9f7df7b9641b766a99c5" 
}
```

## Get Product by ID

**Endpoint:**

```
GET /products/:id
```

**Response:**

```json
{
  "_id": "63fda56ef7b9641b766a99cd",
  "name": "New Product",
  "description": "Product description", 
  "price": 49.99,
  "owner": "63fd9f7df7b9641b766a99c5"
}
```
## Get Products by Owner 

**Endpoint:**

```
GET /products/getByOwner/:id
```

**Response:**

```json
[
  {
    "_id": "63fda3b3f7b9641b766a99cb",
    "name": "Product 1",
    "description": "Description for product 1", 
    "price": 99.99,
    "owner": "63fd9f7df7b9641b766a99c5"
  },
  {
    "_id": "63fda3cff7b9641b766a99cc",  
    "name": "Product 2",
    "description": "Description for product 2",
    "price": 149.99,
    "owner": "63fd9f7df7b9641b766a99c5"
  }
]
```

Retrieves all products belonging to the specified owner ID.

## Update Product

**Endpoint:**

```
PUT /products/edit/:id
``` 
## Headers
- `X-Authorization: {token}` with a valid business access token that owns the product

**Body:**

```json
{
  "name": "Updated Name",
  "description": "New description",
  "price": 29.99
}
```

**Response:**

```json
{
  "_id": "63fda56ef7b9641b766a99cd",
  "name": "Updated Name", 
  "description": "New description",
  "price": 29.99,
  "owner": "63fd9f7df7b9641b766a99c5"
}
```

## Delete Product

**Endpoint:**

```
DELETE /products/delete/:id 
```
## Headers
- `X-Authorization: {token}` with a valid business access token that owns the product

**Response:**

204 No Content
