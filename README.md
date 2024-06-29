
E-commerce Website Project
Overview
This project is an e-commerce website built with the MERN stack (MongoDB, Express.js, React, Node.js), incorporating Bootstrap and Ant Design for the UI, along with Material-UI components. It includes features such as payment integration using Braintree, JWT token-based user authentication, product filtering and searching, detailed product views with similar product recommendations, and an admin panel for managing the website.

Deployment
Check out the live project .
https://e-commerce-front-tawny.vercel.app

Features

User Authentication: Secure login and registration using JWT tokens.

Product Filtering and Searching: Users can filter products by price and categories, and search for various products.

Product Details: Detailed view of each product, including similar product recommendations.

Admin Panel: Admin interface for managing products, categories, orders, and users.

Payment Integration: Secure payment processing using Braintree.

File Uploads: Product images are uploaded and stored in the MongoDB database via the file system.

Technologies Used
Frontend: React, Bootstrap, Ant Design, Material-UI
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Payment Gateway: Braintree


Installation
Clone the repository:

bash
git clone https://github.com/your-username/ecommerce-website.git
cd ecommerce-website
Install dependencies for the backend:

bash
cd backend
npm install
Install dependencies for the frontend:

bash
cd ../frontend
npm install
Set up environment variables:
Create a .env file in the root directory of the backend and add the following variables:

makefile
Copy code
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
BRAINTREE_MERCHANT_ID=<Your Braintree Merchant ID>
BRAINTREE_PUBLIC_KEY=<Your Braintree Public Key>
BRAINTREE_PRIVATE_KEY=<Your Braintree Private Key>
Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend server:

bash
cd ../frontend
npm start


Project Structure

ecommerce-website/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── reducers/
│   │   ├── actions/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── store.js
│   │   └── ...
│   └── package.json
│
├── README.md
└── ...



Key Features Explained
User Authentication
Users can register and log in securely.
JWT tokens are used to verify user sessions.
Tokens are stored in local storage for enhanced security.
Product Filtering and Searching
Users can filter products by price range and categories.
Search functionality allows users to find products by name or description.
Product Details
Each product has a detailed view page showing all relevant information.
Similar products are displayed based on categories and tags.
Admin Panel
Accessible only to users with admin privileges.
Admins can manage products, categories, orders, and user roles.
Payment Integration
Braintree is used to handle payment processing securely.
Users can make payments using various methods supported by Braintree.
File Uploads
Product images are uploaded through a file system interface.
Images are stored in MongoDB, allowing easy retrieval and management.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
MERN Stack
Bootstrap
Ant Design
Material-UI
Braintree
Contact
For any inquiries, please contact 
satyamtiwari87090@gmail.com.

Thank you for checking out our e-commerce website project! We hope you find it useful and informative. Happy coding!
