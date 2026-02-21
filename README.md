# E-Commerce Dashboard

A responsive E-Commerce web application built with React, Vite, and Tailwind CSS.

## Features

- **Authentication**: User registration and login with session management (5-minute timeout).
- **Dashboard**: User-specific dashboard with quick links.
- **Product Listing**: Browse products fetched from Fake Store API with search functionality.
- **Cart Management**: Add to cart, update quantities, remove items, and view totals.
- **User Profile**: View and edit user details.
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **Icons**: Lucide React
- **API**: Fake Store API

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the URL shown in the terminal).

## Usage

1.  **Register** a new account.
2.  **Login** with your credentials.
3.  Browse **Products** and add items to your **Cart**.
4.  Manage your **Cart** or update your **Profile**.
5.  Session will automatically expire after 5 minutes of inactivity (simulated).

## Project Structure

- `src/components`: Reusable UI components.
- `src/context`: React Context for Auth and Cart.
- `src/layouts`: Layout components (Navbar).
- `src/pages`: Application pages.
- `src/utils`: Utility functions.
