# Course Selling Website

A Node.js and Express.js application for selling courses, with JWT-based authentication and MongoDB for data persistence. This application includes routes for both admins and users, allowing for course creation, updating, deletion, and purchasing.

## Features

- JWT-based authentication for admins and users
- Admin functionalities: create, update, delete courses, and view all users and their purchased courses
- User functionalities: view all published courses, purchase courses, and view purchased courses
- Data persistence with MongoDB

## Requirements

- Node.js
- MongoDB

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/subx6789/course-selling-website.git
   cd course-selling-website

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Create a .env file in the root directory and add the following environment variables:**

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   ```

4. **Start the server**

   ```bash
   npm start
   ```

The server will start on http://localhost:3000.

# Usage

## Admin Routes

1. **Admin Signup**

- Endpoint: `POST /admin/signup`
- Request Body:
  ```json
  {
    "username": "admin",
    "password": "pass"
  }
  ```
- Response:
  ```json
  {
    "message": "Admin created successfully"
  }
  ```

2. **Admin Signin**

- Endpoint: `POST /admin/signin`
- Request Body:
  ```json
  {
    "username": "admin",
    "password": "pass"
  }
  ```
- Response:
  ```json
  {
    "token": "your-token"
  }
  ```

3. **Create Course**

- Endpoint: `POST /admin/createCourse`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Request Body:
  ```json
  {
    "title": "course title",
    "description": "course description",
    "price": 100,
    "imageLink": "https://linktoimage.com"
  }
  ```
- Response:
  ```json
  {
    "message": "Course created successfully",
    "courseId": "new course id"
  }
  ```

4. **Get All Courses**

- Endpoint: `GET /admin/courses`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "courses": [
      {
        "id": "1",
        "title": "course title",
        "description": "course description",
        "price": 100,
        "imageLink": "https://linktoimage.com",
        "published": true
      }
    ]
  }
  ```

5. **Update Course**

- Endpoint: `PUT /admin/updateCourse/:courseId`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Request Body:
  ```json
  {
    "title": "Updated Course Title",
    "description": "Updated Course Description",
    "price": 150,
    "imageLink": "https://updatedlinktoimage.com"
  }
  ```
- Response:
  ```json
  {
    "message": "Course updated successfully"
  }
  ```

6. **Delete Course**

- Endpoint: `DELETE /admin/deleteCourse/:courseId`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "message": "Course deleted successfully"
  }
  ```

7. **Get All Users**

- Endpoint: `GET /admin/showUsers`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "users": [
      {
        "username": "user1",
        "purchasedCourses": [
          {
            "title": "course title",
            "description": "course description",
            "price": 100,
            "imageLink": "https://linktoimage.com"
          }
        ]
      }
    ]
  }
  ```

## User Routes

1. **User Signup**

- Endpoint: `POST /users/signup`
- Request Body:
  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```
- Response:
  ```json
  {
    "message": "User created successfully"
  }
  ```

2. **User Signin**

- Endpoint: `POST /users/signin`
- Request Body:
  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```
- Response:
  ```json
  {
    "token": "your-token"
  }
  ```

3. **Get All Published Courses**

- Endpoint: `GET /users/courses`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "courses": [
      {
        "id": "1",
        "title": "course title",
        "description": "course description",
        "price": 100,
        "imageLink": "https://linktoimage.com",
        "published": true
      }
    ]
  }
  ```

4. **Purchase Course**

- Endpoint: `POST /users/courses/:courseId`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "message": "Course purchased successfully"
  }
  ```

5. **Get Purchased Courses**

- Endpoint: `GET /users/purchasedCourses`
- Headers:
- `Authorization`: `Bearer <your-token>`
- Response:
  ```json
  {
    "purchasedCourses": [
      {
        "id": "1",
        "title": "course title",
        "description": "course description",
        "price": 100,
        "imageLink": "https://linktoimage.com",
        "published": true
      }
    ]
  }
  ```

# Project Structure

    ```bash

    course-selling-website/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── adminController.js
    │   └── usercontroller.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── admin.js
    │   ├── user.js
    │   └── course.js
    ├── routes/
    │   ├── adminRoutes.js
    │   └── userRoutes.js
    ├── .env
    ├── package.json
    ├── package-lock.json
    └── server.js
    ```

# License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
