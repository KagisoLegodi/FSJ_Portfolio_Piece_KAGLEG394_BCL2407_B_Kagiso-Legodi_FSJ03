# NEXTY E-Commerce Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Usage](#usage)
7. [API Integration](#api-integration)
8. [Styling](#styling)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

NEXTY is a modern, responsive e-commerce web application built with Next.js. It provides a seamless shopping experience with features like product browsing, searching, sorting, category filtering, and a comprehensive review system. The project showcases a clean, user-friendly interface designed to enhance the online shopping experience.

## Features

- Responsive design for various device sizes
- Product listing with pagination
- Search functionality for products
- Sort options (price low to high, high to low)
- Category filtering
- Dark mode support
- User authentication
- Product review system (add, edit, delete reviews)

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Icons**: Icon library for React applications
- **Next/Image**: Next.js Image component for optimized image loading
- **Next/Link**: Next.js Link component for client-side navigation
- **useState and useEffect hooks**: For state management and side effects in functional components
- **Firebase**: For backend services including authentication and database
- **External API**: For fetching product and category data (https://next-ecommerce-api.vercel.app)

## Project Structure

The project is structured as follows:

- `components/`: Reusable React components
  - `Header.js`: Navigation header component
  - `ProductList.js`: Component for displaying individual products
  - `SearchBar.js`: Search input component
  - `SortOptions.js`: Sorting options component
  - `CategoryFilter.js`: Category filter component
  - `ReviewForm.js`: Form for adding and editing reviews
  - `ReviewList.js`: Component for displaying product reviews
- `pages/`:
  - `index.js`: Home page with product listing, search, sort, and filter functionality
  - `product/[id].js`: Product details page with reviews
- `lib/`:
  - `fetchProducts.js`: Function to fetch products from the API
  - `fetchCategories.js`: Function to fetch categories from the API
  - `firebase.js`: Firebase configuration and initialization
  - `auth.js`: Authentication utilities
- `app/api/`: API routes
  - `products/[id]/route.js`: API route for fetching product details including reviews
  - `reviews/route.js`: API routes for adding, editing, and deleting reviews
- `layout.js`: Root layout component
- `globals.css`: Global styles and Tailwind CSS imports

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/your-username/nexty-ecommerce.git
   cd nexty-ecommerce
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```
   NEXT_PUBLIC_API_URL=https://next-ecommerce-api.vercel.app
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

### Browsing Products

- The home page (`/`) displays a grid of products.
- Use the pagination controls at the bottom of the page to navigate through product listings.

### Searching Products

- Use the search bar at the top of the page to search for products by name or description.

### Sorting Products

- Use the sort dropdown to sort products by price (low to high or high to low).

### Filtering by Category

- Use the category dropdown to filter products by specific categories.

### Resetting Filters

- Click the "Reset All Filters" button to clear all search, sort, and category filters.

### User Authentication

- Click the "Sign In" button to log in or create an account.
- Once logged in, you can access your profile and leave product reviews.

### Product Reviews

- On a product details page, logged-in users can view existing reviews and add their own reviews.
- Users can edit or delete their own reviews.
- Reviews include a rating (out of 5 stars), comment, and the reviewer's name.

## API Integration

The project uses both an external API for product and category data, and Firebase for user authentication and review management. The API endpoints are:

- Products: `${process.env.NEXT_PUBLIC_API_URL}/api/products`
- Categories: `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
- Reviews: `/api/reviews` (handled by Firebase)

Update these endpoints in the respective files if you're integrating with a different backend.

## Styling

The project uses Tailwind CSS for styling. Global styles are defined in `globals.css`. You can customize the theme by modifying the `tailwind.config.js` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
