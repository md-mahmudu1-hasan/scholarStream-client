# 🎓 ScholarStream

# Live URL : https://scoller-auth.web.app/

**A Robust, Role-Based Platform for Global Scholarship Management and Application.**

ScholarStream:AI revolutionizes the way students discover, apply for, and manage global scholarships. Utilizing modern web technologies, it features a secure payment system, advanced server-side search, and dedicated dashboards for students, moderators, and administrators.

## ✨ Features at a Glance

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Security** | Role-Based Access Control (RBAC) | Dedicated dashboards for **Admin**, **Moderator**, and **Student** roles. |
| **Authentication** | JWT & Firebase Auth | Secure login/registration with password validation and **Google Social Login**. |
| **Discovery** | Advanced Search & Filter | Server-side implementation of **Search, Filter (Category/Location), and Sort (Fees/Date)** on the All Scholarships page, including **Pagination**. |
| **Payment** | Stripe Integration | Secure checkout process for application fees, saving application status based on payment success/failure. |
| **UX/UI** | Responsive & Animated | Unique, consistent design with responsive layouts and **Framer Motion** animations on the Home page. |
| **Management** | Comprehensive Dashboards | Tools for managing users, applications, reviews, and scholarships, complete with **Admin Analytics (Charts)**. |

---

## 🛠️ Technology Stack

This project is built using a powerful and modern stack optimized for performance and maintainability.

| Role | Technology | Key Packages |
| :--- | :--- | :--- |
| **Frontend Core** | React | `react`, `react-router` |
| **Styling** | Tailwind CSS | `@tailwindcss/vite` |
| **Data Management** | TanStack Query (React Query) | `@tanstack/react-query`, `axios` |
| **UX Enhancements** | Framer Motion, Charts | `framer-motion`, `chart.js`, `recharts` |
| **Forms** | React Hook Form | `react-hook-form` |
| **Backend & Auth** | Firebase | `firebase`, JWT for API security |
| **Payments** | Stripe | Stripe SDK/API integration |

---

## 🔒 Role-Based Dashboard Access

The platform uses a single `/dashboard` route with conditional content rendering based on the user's verified role (protected by `verifyAdmin` and `verifyModerator` middleware).

### 1. 👑 Admin Features

* **Manage Users:** Control user roles (Promote/Demote) and deletion.
* **Manage Scholarships:** CRUD operations (Add, Update, Delete) on all scholarship listings.
* **Analytics:** Visualize platform data (Total Users, Fees Collected, Application Counts) using Charts.

### 2. 🛡️ Moderator Features

* **Manage Applied Applications:** Review applications, provide Feedback, and update Application Status (`Processing`, `Completed`, `Rejected`).
* **All Reviews:** Moderate and delete inappropriate student reviews.

### 3. 🧑‍🎓 Student Features

* **My Applications:** Track application status, Pay fees, Edit/Delete pending applications, and access detailed information.
* **Add Review:** Post ratings and comments for completed applications.
* **My Reviews:** View, Edit, or Delete submitted reviews.

---

## 🌐 Core Pages

### Home
* Hero section with **Framer Motion** effects.
* Dynamic display of the **Top 6 Scholarships**.
* Testimonials and Contact/FAQ sections.

### All Scholarships
* Main discovery page with server-side **Search, Filter, Sort, and Pagination**.
* Detailed card view: University Name, Category, Fees, Location, and **View Details** button.

### Scholarship Details
* Comprehensive data display (World Rank, Deadline, Stipend, etc.).
* Prominent **Apply for Scholarship** button leading to the Stripe Checkout page.
* Dedicated **Reviews Section** showing all user ratings and comments.

### Payment Flow
* **Checkout Page:** Secure payment portal using Stripe.
* **Payment Success Page:** Confirmation with application details and link to "My Applications".
* **Payment Failed Page:** Error notification and option to "Return to Dashboard" to retry payment.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [Your-Repo-Link]
    cd scholarstream-ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    * Configure your Firebase credentials.
    * Set up your Stripe Publishable and Secret keys.
    * Define your JWT secret.
4.  **Run the project:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

> 💡 **Need help or want to contribute?** Feel free to open an issue or submit a pull request!