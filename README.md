# College ERP Project

### Maintained by BYTE

A comprehensive and modern **College ERP** system built with Next.js that streamlines academic and administrative processes. This project leverages a powerful stack—including Prisma, Redux, TanStack Query, Zod, NextAuth, and Entraid Login—to deliver a robust, scalable, and secure ERP solution backed by MariaDB hosted on vercel.

---

### Live Link: [erp.ishaanminocha.in](https://erp.ishaanminocha.in)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Variables](#3-environment-variables)
  - [4. Database Setup with Prisma](#4-database-setup-with-prisma)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

---

## Overview

The **College ERP Project** is designed to simplify and enhance the management of college operations. Whether you're managing student records, faculty details, course enrollments, or scheduling, this ERP system integrates the latest web technologies to offer an intuitive, responsive, and secure experience.

Built with Next.js and supported by an extensive set of libraries and tools, the project emphasizes:

- **Scalability:** Easily adaptable for growing needs.
- **Security:** Robust authentication and authorization mechanisms.
- **Developer Experience:** Modern tooling and best practices for rapid development.
- **Performance:** Optimized data fetching and state management.

---

## Features

- **User Authentication & Authorization:**  
  Secure login using NextAuth integrated with Entraid Login for streamlined college user authentication.

- **Database Management:**  
  Leveraging Prisma ORM with MariaDB for efficient data modeling and migrations.

- **State Management:**  
  Powerful global state management with Redux Toolkit.

- **Data Fetching & Caching:**  
  Seamless server state synchronization with TanStack Query.

- **Schema Validation:**  
  Robust request and response validation using Zod.

- **Responsive UI & Modern Architecture:**  
  Developed with Next.js, ensuring both server-side rendering (SSR) and static site generation (SSG) for optimal performance.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Backend & ORM:** [Prisma](https://www.prisma.io) with [MariaDB](https://mariadb.org)
- **Authentication:** [NextAuth](https://next-auth.js.org) & Entraid Login
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Validation:** [Zod](https://zod.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Library:** [Shadcn UI](https://shadcn.com) and [Tremor](https://tremor.so)

---

## Prerequisites

Before setting up the project locally, ensure you have installed:

- **Node.js** (v16 or above)
- **npm**, **yarn**, or **pnpm**
- **MariaDB** (either locally installed or accessible remotely)
- **Git**

---

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/bytemait/erp.git
cd erp
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory of the project based on the provided `.env.example`.

````

Note: Replace placeholder values (e.g., `<app-client-id>`, `<app-client-secret>`, etc.) with your actual configuration details.

### 4. Database Setup with Prisma

Generate Prisma Client and run migrations to set up your database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
````

Seed the database with starter data:

```bash
npx prisma db seed
```

---

## Running the Project

### Development Server

Start the Next.js development server:

```bash
npm run dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

### Production Build

Build and start the production version:

```bash
npm run build
npm start
```

---

## Contributing

Contributions are welcome! If you'd like to contribute to the College ERP Project, please follow these guidelines:

1. **Fork the Repository:**  
   Click on the Fork button at the top right of this page to create your own copy of the repository.

2. **Create a Branch:**  
   Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Implement Your Changes:**  
   Make sure your code adheres to the project's coding standards. If applicable, include tests for your changes.

4. **Commit and Push:**  
   Commit your changes with clear and descriptive commit messages.

   ```bash
   git commit -m "Add feature: description of your feature"
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request:**  
   Navigate to the repository on GitHub and open a pull request against the master branch. Provide a clear description of your changes and any relevant screenshots or documentation.

6. **Review & Merge:**  
   Your pull request will be reviewed by the maintainers. Once approved, it will be merged into the master branch.

---

Happy coding! 🎓🚀
