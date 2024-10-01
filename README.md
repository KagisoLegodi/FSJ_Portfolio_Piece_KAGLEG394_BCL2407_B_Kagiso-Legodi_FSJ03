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

NEXTY is a modern, responsive e-commerce web application built with Next.js. It provides a seamless shopping experience with features like product browsing, searching, sorting, and category filtering. The project showcases a clean, user-friendly interface designed to enhance the online shopping experience.

## Features

- Responsive design for various device sizes
- Product listing with pagination
- Search functionality for products
- Sort options (price low to high, high to low)
- Category filtering
- Dark mode support

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Icons**: Icon library for React applications
- **Next/Image**: Next.js Image component for optimized image loading
- **Next/Link**: Next.js Link component for client-side navigation
- **useState and useEffect hooks**: For state management and side effects in functional components
- **External API**: For fetching product and category data (https://next-ecommerce-api.vercel.app)

## Project Structure

The project is structured as follows:

- `components/`: Reusable React components
  - `Header.js`: Navigation header component
  - `ProductList.js`: Component for displaying individual products
  - `SearchBar.js`: Search input component
  - `SortOptions.js`: Sorting options component
  - `CategoryFilter.js`: Category filter component
- `pages/`:
  - `index.js`: Home page with product listing, search, sort, and filter functionality
- `lib/`:
  - `fetchProducts.js`: Function to fetch products from the API
  - `fetchCategories.js`: Function to fetch categories from the API
- `layout.js`: Root layout component
- `globals.css`: Global styles and Tailwind CSS imports

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/KagisoLegodi/KAGLEG394_JSE2407_B_Kagiso-Legodi_FSJ02.git
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

### Searching Products

- Use the search bar at the top of the page to search for products by name or description.
![example](https://github.com/user-attachments/assets/b304e0de-01a3-4107-9abb-5b8e5c3a51f1)

### Sorting Products

- Use the sort dropdown to sort products by price (low to high or high to low).
![example 2](https://github.com/user-attachments/assets/3503d57e-9456-4f51-98a7-326c7c9f96e3)


### Filtering by Category

- Use the category dropdown to filter products by specific categories.
![example 3](https://github.com/user-attachments/assets/b0775de5-ad94-4d89-8234-93475631539c)

### Resetting Filters

- Click the "Reset All Filters" button to clear all search, sort, and category filters.

[ ![example 4](https://github.com/user-attachments/assets/1e79a072-3148-4ab3-9f6b-2eb3372be63d)



 ]

## API Integration

The project uses an external API for product and category data. The API endpoints are:

- Products: `${process.env.NEXT_PUBLIC_API_URL}/api/products`
- Categories: `${process.env.NEXT_PUBLIC_API_URL}/api/categories`

Update these endpoints in the `fetchProducts` function in `lib/fetchProducts.js` and the `fetchCategories` function in `lib/fetchCategories.js` if you're integrating with a different backend.

## Styling

The project uses Tailwind CSS for styling. Global styles are defined in `globals.css`. You can customize the theme by modifying the `tailwind.config.js` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
