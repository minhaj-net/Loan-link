
# LoanLink - Comprehensive Loan Management System

LoanLink is a robust and user-friendly web application designed to streamline the loan management process. It serves three distinct user roles: Borrowers, Managers, and Admins, facilitating a seamless flow from loan application to approval and repayment. Built with modern web technologies, LoanLink ensures security, performance, and an intuitive user experience.

## 🚀 Live Demo

**[https://loanlink-proj.netlify.app/](https://loanlink-proj.netlify.app/)**  
*(Deployment URL to be added)*

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Login & Registration**: Powered by Firebase Authentication.
- **Role-Based Access Control**: specialized dashboards for Admins, Managers, and Borrowers.
- **Private Routes**: Ensures sensitive pages are accessible only to authorized users.

### 👥 User Roles & Dashboards

#### **Borrower**
- **Apply for Loans**: Easy-to-use loan application forms.
- **Track History**: View "My Loans" to see application status (Pending, Approved, Rejected).
- **Profile Management**: Manage personal details.
- **Repayment**: Securely pay loan fees or installments via integrated payment gateways.

#### **Manager**
- **Loan Processing**: Review, Approve, or Reject pending loan applications.
- **Manage Loans**: Overview of all active and past loans.
- **Profile Management**: Dedicated manager profile.

#### **Admin**
- **System Overview**: Comprehensive dashboard overview.
- **User Management**: Manage all users within the system.
- **Full Loan Control**: Create, Update, and Delete loan types and records.
- **Application Oversight**: Audit all loan applications.

### 💳 Payments
- **Stripe Integration**: Secure and reliable payment processing for application fees and loan repayments.
- **Payment Status**: Instant feedback on payment success or failure.

## 🛠️ Technologies Used

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4, [DaisyUI](https://daisyui.com/)
- **Backend/Auth**: [Firebase](https://firebase.google.com/)
- **State Management**: [React Query (@tanstack/react-query)](https://tanstack.com/query/latest)
- **Forms**: React Hook Form
- **Routing**: React Router 7
- **Animations**: Framer Motion, AOS (Animate On Scroll)
- **Notifications**: React Hot Toast, SweetAlert2
- **Icons**: Lucide React, React Icons

## 📦 Key NPM Packages

| Package | Purpose |
| :--- | :--- |
| `firebase` | Backend services and Authentication |
| `@stripe/stripe-js` | Stripe payment gateway integration |
| `react-router` | Client-side routing |
| `@tanstack/react-query` | Data fetching and server state management |
| `react-hook-form` | Performant form validation and handling |
| `tailwindcss` | Utility-first CSS framework |
| `framer-motion` | Production-ready animation library |
| `aos` | Animate on Scroll library |
| `sweetalert2` | Beautiful, responsive, customizable replacements for JavaScript's popup boxes |

## 💻 Installation & Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Firebase Account (for config)

### Steps

1.  **Clone the Repository**
    ```bash
   https://github.com/minhaj-net/Loan-link.git
    cd loan-link
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your Firebase and Stripe configuration keys:
    ```env
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_sender_id
    VITE_APP_ID=your_app_id
    # Add other necessary keys
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```


---

*Developed by [Minhajur Rahman MERN Stack Developer]*
