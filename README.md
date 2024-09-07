# Culinary Cruise

Culinary Cruise is a full-stack food delivery application that provides a seamless user experience for browsing, ordering, and paying for meals online. The project is built using React for the frontend, Node.js for the backend, and MongoDB for the database, with Stripe integrated for payment processing.

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Admin Panel](#admin-panel)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Live Deployment](#live-deployement-)

## Frontend

The frontend of Culinary Cruise is built using React, providing a dynamic and responsive user interface. The frontend handles user interactions, routing, and integrates with the backend API for data fetching and user authentication.

### Dependencies

- **axios**: For making HTTP requests to the backend API.
- **react-toastify**: For displaying toast notifications to users.
- **react-router-dom**: For handling routing within the React application.

### Features

- User authentication with JWT.
- Browse and search for food items.
- Add and remove items from the cart.
- Handle payments using Stripe.
- Responsive design for various devices.

### Running the Frontend
 To start the frontend:
```bash
  cd culinary-cruise
  npm install
  npm run dev
  ```

# Backend
  The backend of Culinary Cruise is powered by Node.js and Express, with MongoDB as the database. It manages user authentication, handles API requests, and integrates with Stripe for processing payments.

### Dependencies

- **mongoose**: For interacting with MongoDB and managing data models.
- **jsonwebtoken**: For securely transmitting information between the frontend and backend.
- **bcrypt**: For hashing and storing passwords securely.
- **cors**: For enabling Cross-Origin Resource Sharing (CORS).
- **dotenv**: For managing environment variables.
- **body-parser**: For parsing incoming request bodies in JSON format.
- **multer**: For handling file uploads.
- **stripe**: For integrating payment functionality.
- **validator**: For validating and sanitizing input data.
- **nodemon**: For automatic server restarts during development.

### Features

- User registration and login with JWT-based authentication.
- Food item management (CRUD operations).
- Cart management (adding and removing items).
- Payment processing using Stripe.
- Secure API endpoints with proper validation and error handling.

### Running the Backend

To start the backend:

```bash
cd backend
npm install
npm run server
```

## Admin Panel

The admin panel is a React-based interface for managing the Culinary Cruise website. It allows administrators to add, edit, and remove food items, as well as monitor orders and manage user data.

### Features

- Add new food items with images and descriptions.
- Edit existing food items.
- Remove food items from the menu.
- Monitor user orders and update order statuses.

### Running the Admin Panel

To start the admin panel:

```bash
cd admin-culinary
npm install
npm start
```

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/yourusername/culinary-cruise.git
```

## Install dependencies for both frontend, backend, and admin panel

```bash
Copy code
cd culinary-cruise
npm install

cd backend
npm install

cd admin-culinary
npm install
```

# Start the development servers
```bash
Frontend: npm run dev inside the frontend directory.
Backend: npm run server inside the backend directory.
Admin Panel: npm start dev inside the admin directory.
```

# Screenshots

### Items added in the cart
  ![image](https://github.com/user-attachments/assets/58ca501d-bd15-49b8-ba45-4d9c1b7fa87b)

### Delivery page
  ![image](https://github.com/user-attachments/assets/3e6bf687-9206-40b0-a603-cc66ae72ac89)

### For managing the website admin panel is created : for adding food and removing food
![image](https://github.com/user-attachments/assets/e2909876-5249-4303-af40-38c1f8161a30)


```bash
### Payment portal : use this dummy card details
Dummy payment : Card Number : 4000 0035 6000 0008
```
## Live Deployement :
  https://culinary-cruise-front-end.onrender.com/
