# TechStore - Premium Electronics E-Commerce Showcase

A highly polished, modern Next.js + TypeScript e-commerce storefront showcasing premium electronics. This application was built to demonstrate a deep understanding of Next.js architectural patterns, sophisticated UI/UX principles, performance optimization, and rigorous SEO integration.

## 🚀 Live Local Setup

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Project Requirements & Features Implemented

This project successfully fulfills all the requirements for the **Next.js + AI Developer Task**:

- [x] **Home Page**: Features a stunning animated hero section with an abstract blob background and a highlighted bento-grid featured products layout.
- [x] **Product Listing**: Includes real-time client-side searching, category filtering, and price sorting, alongside beautiful pulsing empty states.
- [x] **Product Detail**: Utilizes dynamic routing (`/products/[id]`), a simulated image gallery, sticky layout, and a related products section.
- [x] **Cart**: Full state management handling quantities and removals. Replaces standard alerts with a professional, fully-simulated checkout success flow.
- [x] **Login & Guest Auth**: Features a completely local authentication flow. Allows for standard login (with input validation) and a seamless "Continue as Guest" experience.
- [x] **About/Contact Page**: Combines company mission statements with a highly responsive, validated contact form featuring a success animation.

## 🛠 Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript (Strict mode)
* **Styling**: Tailwind CSS v4 + native CSS `@keyframes`
* **Animations**: Framer Motion
* **State Management**: Zustand (with localStorage persistence)
* **Icons**: Lucide React
* **Data Layer**: Mocked Static JSON Database

---

## 🎯 Evaluation Focus Breakdown

### 1. Next.js Basics & Architecture
- **App Router Mastery**: Deep utilization of the App Router hierarchy (`/app`).
- **Component Strategy**: Intelligent separation of Server Components (for SEO and data-fetching) and Client Components (marked with `'use client'` for interactivity, state, and framer-motion animations).
- **Dynamic Routing**: Effectively uses `[id]` parameters to render distinct product pages dynamically.

### 2. SEO Awareness
- **Dynamic Metadata**: Every page uses Next.js `Metadata` objects. The dynamic product detail page uses `generateMetadata()` to automatically inject the specific product's Title and Description into the `<head>`, ensuring perfect indexing.
- **Semantic HTML**: Strict adherence to semantic web principles (correct usage of `<main>`, `<section>`, `<nav>`, and cascading `<h1>` to `<h3>` header structures).
- **Accessibility**: Includes `aria-labels` on icon buttons and appropriate `alt` tags on all `next/image` components.

### 3. Clean Code & TypeScript
- **Strong Typing**: Absolute adherence to TypeScript interfaces. Created a central `src/types/index.ts` file modeling the `Product`, `CartItem`, and `User`.
- **Reusable Components**: High modularity. Reusable components like `ProductCard`, `CartItem`, `Input`, and `Textarea` enforce DRY principles and ensure sweeping design changes are effortless.
- **Clean State Management**: Implemented `Zustand` to orchestrate global state cleanly instead of prop-drilling or dealing with complex Context providers.

### 4. Performance Thinking
- **Image Optimization**: All images utilize `next/image` for automatic webp conversion, lazy loading, and intelligent responsive sizing using `sizes` props to prevent layout shifts (CLS).
- **Client/Server Balance**: Kept heavy logic on the server where possible, only shipping interactive JavaScript payloads down for specific client-side interactivity (like the shopping cart or search filters).
- **Font Optimization**: Uses the native Next.js font loader (`next/font/google` or Geist) to load typography without render-blocking requests.

### 5. AI Usage Quality
AI (via advanced pair programming) was strategically leveraged to:
- Rapidly bootstrap the complex `Zustand` state logic and `localStorage` persistence.
- Generate sophisticated math for framer-motion spring animations and native CSS keyframe background blobs.
- Audit the codebase in real-time to ensure React hydration errors were caught and corrected.
- Iteratively elevate the design from a standard layout into a highly premium, Silicon-Valley aesthetic (Apple-inspired spacing, typography, and bento-grids).
