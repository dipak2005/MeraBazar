# MeraBazar
This is online platform for shopping



## 1. Project Overview

**MeraBazar** is a full-stack online shopping platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports multiple user roles: buyers, sellers, and admins. It provides features like product browsing, seller registration, admin approval, customer accounts, cart and orders, payments (PayPal), wishlist, reviews, and comprehensive management dashboards.

***

##Live Website: MeraBazar 
- https://merabazar.onrender.com/

## 2. Repo \& Directory Structure

### Top-level:

- `client/` (Frontend React app)
- `server/` (Backend Node/Express app)
- `README.md` (Project intro)
- `.gitignore` (Excludes sensitive files, e.g., .env)

***

### 2.1. Client Directory Structure (Frontend)

- **public/**: Static assets (favicon, manifest).
- **dist/**: Built/compiled output for deployment.
- **src/**: Application source code
    - **assets/**: Images, icons, and digital assets.
    - **auth-slice/**: Redux authentication state management.
    - **common/**: Shared utilities/functions (e.g. `CheckAuth`).
    - **components/**:
        - **admin-view/**: Admin dashboard components.
        - **auth/**: Registration and login layouts for both sellers and buyers.
        - **css/**: CSS modules for UI styling.
        - **seller-view/**: Seller-specific dashboard/layout components.
        - **shopping-view/**: Buyer shopping/homepage components (product details, cart, payment).
        - **ui/**: Shared UI controls/widgets.
    - **config/**: Configuration files for client app (API endpoints, constants).
    - **pages/**:
        - **admin-view/**: Admin dashboard/pages.
        - **auth/**: Seller/Buyer authentication pages.
        - **not-found/**: Custom 404 error page.
        - **seller-view/**: Seller dashboard pages.
        - **shopping-view/**: Buyer homepage, account, product browsing, payment success/cancel.
        - **UnAuthPage.jsx**: Unauthorized error page.
    - **store/**: Redux store setup and feature slices (cart, wishlist).
    - **App.jsx / main.jsx**: React root components, routing logic.
    - **App.css / index.css**: Global styles.
- **package.json / package-lock.json**: Dependencies and npm scripts.
- **vite.config.js**: Build tool configuration.

***

### 2.2. Server Directory Structure (Backend)

- **controllers/**: Request handlers for different routes (CRUD logic, business rules).
- **helper/**: Payment integration helpers (PayPal setup/workflow).
- **models/**: Mongoose schemas for all entities:
    - **BannerModel.js**: Homepage promotional banners.
    - **CartModel.js**: Shopping cart schema.
    - **OrderModel.js**: Purchases and status tracking.
    - **ProductModel.js**: Item listing schema.
    - **ReviewModel.js**: Buyer reviews for products.
    - **SellerModel.js**: Seller identity/status, admin approval.
    - **UserAddressModel.js**: Buyer/seller addresses.
    - **UserModel.js**: Authentication/roles.
    - **WishListModel.js**: Wishlist items for buyers.
- **routes/**:
    - **admin/**: Seller approval, banner management, admin dashboard.
    - **auth/**: Registration, login, authentication.
    - **common/**: Shared utilities.
    - **seller/**: Seller dashboard, products, orders.
    - **shop/**: Buyer shopping features—cart, wishlist, checkout.
- **app.js**: Express server entry point, middleware setup.
- **package.json / package-lock.json**: Dependencies (Express, Mongoose, PayPal REST SDK, etc).
- **.gitignore**: Excludes sensitive configs like `.env`.

***

## 3. Features

### 3.1. Authentication \& User Roles

- **Buyer registration \& login** (`/auth`)
- **Seller registration \& login**: Seller dashboard, product management, order handling
- **Admin**: Can approve sellers, create banners, manage users
- **JWT-based authentication**—backend verifies tokens, frontend uses Redux state for auth flows

***

### 3.2. Buyer-Facing Features

- **Home Page**: Dynamic banners, product categories
- **Product Browsing**: Search, filter, list, and view product details
- **WishList**: Add/remove products to wishlist
- **Cart**: Add/remove products, view cart, checkout
- **Order Placement**: Place orders, view order history
- **Profile Management**: Update user info, manage addresses
- **Review Products**: Submit, edit, and view reviews
- **Payment Integration**: PayPal, with success and cancel routes
- **Notifications**: Toast messages for key actions (React-Toastify)

***

### 3.3. Seller-Facing Features

- **Dashboard**: Analytics, order and product stats
- **Product Management**: Add, update, view listings
- **Order Management**: View orders received, update statuses
- **Approval Flow**: Must be approved by admin before product selling
- **Profile Settings**: Seller details, authentication

***

### 3.4. Admin Features

- **Seller Approval**: View seller list, approve new sellers
- **Banner Management**: Add/edit homepage banners
- **Product Oversight**: Monitor all product listings
- **Order Oversight**: Platform-wide orders monitoring
- **Buyer Management**: Oversee buyers, troubleshoot issues

***

## 4. Data Models (Key Entities)

### UserModel

- Fields: name, email, password (hashed via bcryptjs), role (buyer/seller/admin), etc.


### SellerModel

- Fields: seller details, approval status


### ProductModel

- Product name, description, price, category, seller reference, ratings, image URLs


### OrderModel

- Buyer reference, seller reference, product references, status, payment info


### CartModel

- Buyer reference, product references, quantities


### WishListModel

- Buyer reference, product references


### ReviewModel

- Buyer, product, review, rating


### BannerModel

- Title, image URL, banner/order priority


### UserAddressModel

- Buyer reference, addresses, zip, city

***

## 5. Backend APIs (Representative):

**Authentication:**

- `POST /api/auth/register` — Register buyer/seller
- `POST /api/auth/login` — Authenticate user

**Shop:**

- `GET /api/shop/products` — List products
- `GET /api/shop/product/:id` — Product details
- `POST /api/shop/cart` — Add to cart
- `GET /api/shop/cart` — View cart
- `POST /api/shop/wishlist` — Add/remove item
- `GET /api/shop/wishlist` — List wishlist items
- `POST /api/shop/review` — Submit review

**Orders:**

- `POST /api/shop/order` — Place order
- `GET /api/shop/order/:id` — Order details

**Sellers:**

- `GET /api/seller/products` — Seller product list
- `POST /api/seller/product` — Add new product
- `GET /api/seller/orders` — Seller orders

**Admin:**

- `GET /api/admin/sellers` — List sellers (pending/approved)
- `POST /api/admin/seller/approve` — Approve a seller
- `GET /api/admin/banners` — List banners
- `POST /api/admin/banner` — Create/edit banner

**Payments:**

- `POST /api/paypal/payment` — Create PayPal payment
- `GET /api/paypal/success` — Success callback
- `GET /api/paypal/cancel` — Cancel callback

All routes are protected with authentication middleware as appropriate.

***

## 6. Frontend Workflows

- **React-Router**: `/`, `/auth`, `/shop`, `/cart`, `/wishlist`, `/seller`, `/admin`, `/payment-success`, `/payment-cancel`, etc.
- **Redux Toolkit**: State slices for `auth`, `cart`, `wishlist`, etc. Dispatch actions for login, product fetch, cart operations, payment status changes.
- **RESTful calls via Axios**: Communicate with server APIs.

***

## 7. Payment Integration

- Uses **PayPal REST SDK** on server for payments.
- Payment helpers setup through `/server/helper/`.
- Routes handle PayPal transaction, success/cancel redirects.

***

## 8. Error Handling

- Custom 404 Page (“NotFound”)
- Custom Unauthorized Page (“UnAuthPage”)
- Toast notifications (via React-Toastify) for UI feedback.

***

## 9. Configuration \& Deployment

- **Frontend:** Vite (`vite.config.js`), build/preview scripts, .env for API endpoints.
- **Backend:** Express/Nodemon, MongoDB setup, .env for database and PayPal keys.
- **Sensitive files:** Managed via `.gitignore` and not tracked (e.g., .env)

***

## 10. Security

- Passwords hashed with bcryptjs.
- JWT for secure API access.
- Role-based route protection (buyer/seller/admin).

***

## 11. Contributing

- **Coding Standards:** ESLint, modular folders, separation of concerns.
- **Type Safety:** Can easily extend to TypeScript.
- **README:** Project intro, basic usage, getting started steps.

***

## 12. Advanced Features \& Extensibility

- Extensible for other payment providers (Stripe, Razorpay—start with `/helper` and route extension).
- Modular user roles—can add delivery users or expand admin powers.
- Add more analytics to dashboards (see seller and admin UI/file structure for hooks).
- Expand product categories, support for digital downloads, auction, etc.

***

## 13. Troubleshooting

- **Database connectivity:** Check MongoDB URI in `.env`.
- **PayPal issues:** Confirm API keys, transaction logs in helper.
- **State bugs:** Debug Redux slices, check action logs in devtools.
- **Static assets:** Validate all relative paths to images, icons.
- **Deployment:** Ensure both server and client are started (use `npm run build` for client, `nodemon app.js` for server).

***

## 14. Best Practices

- Keep `.env` secrets out of public repo.
- Commit regularly, use branches for features.
- Use PRs and code reviews for future changes.
- Modularize every new user-facing feature for easy scaling.

***



