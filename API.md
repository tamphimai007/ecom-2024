# API Endpoints Summary

## Authentication

| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "email": "tam@tam", "password": "1234" }`         |
| `/api/register`                     | POST   | Register user      | `{ "email": "tam@tam", "password": "1234" }`         |
| `/api/current-user`                 | POST   | Get current user   | None                                                 |
| `/api/current-admin`                | POST   | Get current admin  | None                                                 |

## Category

| Endpoint                            | Method | Description            | Body                        |
|-------------------------------------|--------|------------------------|-----------------------------|
| `/api/category`                     | POST   | Create category         | `{ "name": "Test1" }`       |
| `/api/category`                     | GET    | Get categories          | None                        |
| `/api/category/:id`                 | DELETE | Delete category by ID   | None                        |

## Product

| Endpoint                            | Method | Description            | Body                                                                                  |
|-------------------------------------|--------|------------------------|---------------------------------------------------------------------------------------|
| `/api/product`                      | POST   | Create product          | `{ "title": "TEST", "description": "test", "price": 10000, "quantity": 20, "categoryId": 2, "images": [] }` |
| `/api/product/:id`                  | GET    | Get product by ID       | None                                                                                  |
| `/api/product/:id`                  | DELETE | Delete product by ID    | None                                                                                  |
| `/api/productby`                    | POST   | Get products by filters | `{ "sort": "price", "order": "asc", "limit": 2 }` or `{ "sort": "quantity", "order": "desc", "limit": 2 }` |
| `/api/search/filters`               | POST   | Search with filters     | `{ "query": "mouse" }`, `{ "price": [100, 600] }`, or `{ "category": [1, 2] }`        |

## User Management

| Endpoint                            | Method | Description               | Body                                                       |
|-------------------------------------|--------|---------------------------|------------------------------------------------------------|
| `/api/users`                        | GET    | Get all users             | None                                                       |
| `/api/change-status`                | POST   | Change user status        | `{ "id": 1, "enabled": false }`                            |
| `/api/change-role`                  | POST   | Change user role          | `{ "id": 1, "role": "user" }`                              |
| `/api/user/cart`                    | POST   | Add to cart               | `{ "cart": [{ "id": 1, "count": 2, "price": 100 }, { "id": 5, "count": 1, "price": 200 }] }` |
| `/api/user/cart`                    | GET    | Get cart                  | None                                                       |
| `/api/user/cart`                    | DELETE | Delete cart               | None                                                       |
| `/api/user/address`                 | POST   | Add user address          | `{ "address": "korat" }`                                   |
| `/api/user/order`                   | POST   | Place an order            | None                                                       |
| `/api/user/order`                   | GET    | Get user orders           | None                                                       |

## Admin

| Endpoint                            | Method | Description               | Body                              |
|-------------------------------------|--------|---------------------------|-----------------------------------|
| `/api/user/order`                   | PUT    | Update order status        | `{ "orderId": 35, "orderStatus": "Completed" }` |
| `/api/admin/orders`                 | GET    | Get all orders             | None                              |
