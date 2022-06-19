# Simple CRUD API using in-memory database underneath

## Installation

Download the repo, unzip the files if needed, install the dependenies by running
 ```npm install```. To start the app use the following commands:

```npm run start:prod``` to run the app in production mode

```npm run start:dev``` to run the app in development mode

## App operation

The server runs on ```port 3000``` by default (port value stored in .env file which is removed from .gitignore for testing purposes ) and accepts json formatted payload. Requests can be sent on e.g. ```localhost:3000```. Routes and methods are as follows:

## Get a list of all users

### Request

```GET /api/users```

### Response
```Status: 200```
```
[]
```

## Get a user by id

### Request

```GET /api/users/{id}```

### Response
```Status: 200```
```
{
    "id": "49642ab4-4ca6-485e-8008-1def426ff831",
    "username": "thom",
    "age": 52,
    "hobbies": [
        "playing piano",
        "playing guitar",
        "singing"
    ]
}
```

## Create a new user

### Request
```POST /api/users```

Payload:
```
  {
    "username":"jonny",
    "age":50,
    "hobbies":["playing piano","playing guitar"]
  }
```

### Response
Status: 201
```
{
    "id": "29a41a9d-9728-4819-873b-6457ff195f80",
    "username": "jonny",
    "age": 50,
    "hobbies": [
        "playing paino",
        "playing guitar"
    ]
}
```

## Update a user

### Request
```PUT /api/users/{id}```

Payload:
```
{
    "username":"philip",
    "age":50,
    "hobbies":["making noise"]
}
```

### Response
```Status: 200```
```
{
    "id": "29a41a9d-9728-4819-873b-6457ff195f80",
    "username": "philip",
    "age": 50,
    "hobbies": [
        "making noise"
    ]
}
```

## Delete a user

### Request
```DELETE /api/users/{id}```

### Response
```Status: 204 No Content```
