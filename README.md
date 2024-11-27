# NestJS CRUD Application

This project is a **NestJS CRUD API** that includes two modules: 
- `Auth` module for user registration and login.
- `Product` module for handling CRUD operations on products.

The application uses **Mongoose** as the ODM for MongoDB and includes **authentication** and **authorization** using **JSON Web Tokens (JWT)**. Passwords are hashed securely using **bcrypt**.

---

## Features
1. **Auth Module**
   - User Registration (`/auth/register`)
   - User Login (`/auth/login`)

2. **Product Module**
   - Create, Read, Update, and Delete products (`/products`).

3. **Authentication and Authorization**
   - JWT-based user authentication.
   - Protected routes to ensure only authenticated and authorized users can perform specific actions.

4. **Database**
   - MongoDB with Mongoose for database modeling and interactions.

5. **Password Security**
   - Passwords are hashed using **bcrypt** for secure storage.

6. **Postman Documentation**
   - Explore the API endpoints: [Postman Documentation](https://documenter.getpostman.com/view/26200257/2sAYBVjCXE)

---

## Technologies Used
- **NestJS**: Framework for building scalable Node.js applications.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure authentication and authorization.
- **bcrypt**: For hashing passwords securely.
- **TypeScript**: Typed JavaScript for improved development experience.

---

## Setup and Run Locally

Follow the steps below to set up and run the project on your local machine.

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud instance)
  
### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2.**Install Dependencies**
```bash
npm install
```
3.**Configure Environment Variables Create a .env file in the root directory and add the following variables:**
```bash
DB_URL=mongodb://localhost:27017/nest-crud
JWT_SECRET=your_jwt_secret
PORT=3000
```
4.**Run the Project**
```bash
npm run start:dev
```

## API Endpoints

### Auth Module

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in to get a JWT token.

### Product Module

- **GET** `/products`: Get all products (requires authentication).
- **GET** `/products/:id`: Get a product by ID (requires authentication).
- **POST** `/products`: Create a new product (requires authentication and authorization).
- **PUT** `/products/:id`: Update a product by ID (requires authentication and authorization).
- **DELETE** `/products/:id`: Delete a product by ID (requires authentication and authorization).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
