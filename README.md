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

NEXTY is a modern, responsive e-commerce web application built with Next.js. It provides a seamless shopping experience with features like product browsing, detailed product views, and a user-friendly interface.

## Features

- Responsive design for various device sizes
- Product listing with pagination
- Detailed product pages with image galleries
- Shopping cart functionality 404
- User authentication (Login) 404
- Wishlist for saving favorite items 404
- Dark mode support

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Icons**: Icon library for React applications
- **Next/Image**: Next.js Image component for optimized image loading
- **Next/Link**: Next.js Link component for client-side navigation
- **useState and useEffect hooks**: For state management and side effects in functional components

## Project Structure

The project is structured as follows:

- `components/`: Reusable React components
  - `Header.js`: Navigation header component
  - `ProductCard.js`: Individual product display component
  - `ProductList.js`: Component for listing multiple products
- `pages/`:
  - `index.js`: Home page with product listing
  - `product/[id].js`: Dynamic route for individual product pages
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

### Viewing Product Details

- Click on a product card to view its detailed information.
- On the product detail page, you can view multiple product images, description, price, and other relevant information.

### Using the Shopping Cart

- Click the "Add to cart" button on a product card or product detail page to add items to your cart.
- Access your cart by clicking the cart icon in the header. 404

### Managing Wishlist

- Click the heart icon on a product card to add it to your wishlist.
- Access your wishlist by clicking the "Wishlist" link in the header. 404

### User Authentication

- Click the "Login" link in the header to access the login page.
- (Note: Implement user authentication functionality as needed) 404

## API Integration

The project uses a mock API for product data. Update the API endpoint in the `fetchProducts` function in `pages/index.js` and the `getProduct` function in `pages/product/[id].js` if you're integrating with a different backend.

## Styling

The project uses Tailwind CSS for styling. Global styles are defined in `globals.css`. You can customize the theme by modifying the `tailwind.config.js` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
