# user-Listing-app

This is a User Listing Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to manage their tasks by adding, updating, and deleting them. The front end is implemented using React.js for a user-friendly interface, and the back end is built with Node.js and Express.js. MongoDB is used as the database to store users.


## Features



- Sign up and Sign in functionality for users.
- Add new users with name, email, and other details.
- Display the list of users with options to update user information or delete them.
- Form validation to ensure users enter valid data for user details.
- RESTful APIs for communication between front-end and back-end.
- Error handling and appropriate status codes for API responses.
- MongoDB used as the database to store user information.
- Pagination for managing large user lists.
- Responsive design for optimal use on different devices.

## Installation

To run the application locally, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/jithinjoshi/user-Listing-app.git
```

2. Navigate to the project directory and install dependencies using npm:

```bash
cd your-repo
npm install
```

3. Create a `.env` file in the root directory and provide the necessary environment variables, such as MongoDB connection string and JWT access token secret, and Refresh token secret.
```
PORT
MONGODB
ACCESSTOKEN_SECRET
REFRESHTOKEN_SECRET
```
4. Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:7000`.

## RESTful APIs

The application uses RESTful APIs to communicate between the front-end and back-end. Here are the API endpoints:

- `GET /api/user/users` - Get all users.
- `POST/api/user/users` - Create users.
- `PUT /api/user/users/:id` - Update user.
- `DELETE /api/user/users/:id` - delete an existing user by ID.
- `DELETE /api/user/getSingleuser/:id` - get single user
- `POST/api/auth/signup` - Sign up.
- `POST/api/auth/signin` - Sign in.
- `GET/api/auth/refresh` - Create new refresh token.
- `POST/api/auth/signout` - Signout .


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to this project by opening issues or pull requests. If you have any questions or feedback, please don't hesitate to contact us. Happy task managing!
