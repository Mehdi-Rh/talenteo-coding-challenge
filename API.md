# Employee Mock API Documentation

## Base URL

```
https://69944054fade7a9ec0f4c5fe.mockapi.io/api/v1
```

All endpoints are relative to this base URL.

---

## 1) Get Employees

**GET** `/employees`

### Query Parameters (optional)

- `page`: number  
- `limit`: number  
- `search`: string (filters by `firstName` or `lastName`)

### Example

```
GET /employees?page=1&limit=10&search=Eldridge
```

### Response (200)

```json
[
  {
    "createdAt": "2026-02-16T19:33:24.690Z",
    "firstName": "Eldridge",
    "lastName": "Ritchie",
    "email": "Danial.Hilll76@yahoo.com",
    "jobTitle": "Central Assurance Strategist",
    "department": "Movies",
    "gender": "female",
    "dateOfBirth": "1968-05-28T03:15:07.927Z",
    "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/79.jpg",
    "registratonNumber": 72,
    "id": "1"
  }
]
```

---

## 2) Get Employee By ID

**GET** `/employees/:id`

### Example

```
GET /employees/1
```

### Response (200)

```json
{
  "createdAt": "2026-02-16T19:33:24.690Z",
  "firstName": "Eldridge",
  "lastName": "Ritchie",
  "email": "Danial.Hilll76@yahoo.com",
  "jobTitle": "Central Assurance Strategist",
  "department": "Movies",
  "gender": "female",
  "dateOfBirth": "1968-05-28T03:15:07.927Z",
  "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/79.jpg",
  "registratonNumber": 72,
  "id": "1"
}
```

---

## 3) Create Employee

**POST** `/employees`

### Request Body

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "jobTitle": "Frontend Developer",
  "department": "Engineering",
  "gender": "female",
  "dateOfBirth": "1995-06-15T00:00:00.000Z",
  "registratonNumber": 100
}
```

### Response (201)

Returns the created employee object including `id` and `createdAt`.

---

## 4) Update Employee (Partial Update)

**PATCH** `/employees/:id`

### Request Body

```json
{
  "jobTitle": "Lead Frontend Developer"
}
```

### Response (200)

Returns the updated employee object.

---

## 5) Delete Employee

**DELETE** `/employees/:id`

### Example

```
DELETE /employees/1
```

### Response (200)

Returns the deleted employee object.
