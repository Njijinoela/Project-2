# Agro-Field Web Application

## Overview

Agro-Field is a web application designed to connect farmers with product buyers. It allows users to sign up, log in, and manage agricultural product listings in an intuitive and user-friendly interface. The platform offers role-based navigation, ensuring tailored experiences for farmers and admins.

---

## Features

- **Landing Page**: Welcoming users with an overview of the platform and navigation options to sign up or log in.
- **Authentication**:
  - Login functionality with role selection (Farmer or Admin).
  - Registration form for new users with password matching validation.
- **Product Management**:
  - Farmers can add their products, including images, descriptions, prices, and locations.
  - Products are stored in context for dynamic rendering.
- **Role-Based Navigation**:
  - Farmers navigate to product management.
  - Admins view and manage all product listings.

---

## File Structure

1. **Components**:

   - **LoginPage.jsx**: Login form with role-based navigation.
   - **SignUp.jsx**: Registration form with password validation and role selection.
   - **ProductForm.jsx**: Product submission form for farmers, allowing image uploads and detailed product information.
   - **LandingPage.jsx**: Introductory page guiding users to log in or sign up.

2. **Context**:

   - **ProductContext.jsx**: Context API implementation to manage product state across the application.

3. **Styling**:
   - CSS files in the `styles` folder for each component, ensuring consistent and modular design.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <project-phase-4>
   cd my-Dealer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm run dev
   ```

---

## Usage

1. **Visit Landing Page**: Start at the homepage to log in or sign up.
2. **Sign Up**: Register as a Farmer or Admin with a valid email, phone number, and password.
3. **Log In**: Enter your credentials and select your role.
4. **Product Management**:
   - Farmers can add and view their products.
   - Admins can view all product listings.

---

## Technical Details

- **Frontend Framework**: React.js
- **State Management**: Context API (`ProductContext`)
- **Routing**: React Router
- **File Upload**: Image preview functionality implemented in the product form.
- **Role-Based Navigation**: Conditional rendering and navigation based on the user role.

---

## Future Enhancements

- Backend integration for persistent data storage.
- Admin dashboard for product moderation.
- Improved security (e.g., authentication tokens, hashed passwords).
- Enhanced product filtering and search capabilities.

---

## License

This project is open-source. Feel free to use, modify, and distribute.
