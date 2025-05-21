[![Live](https://img.shields.io/badge/Vercel-Live-black?logo=vercel)](https://multi-step-registration-form-sooty.vercel.app/)
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra--UI-2.x-teal?logo=chakraui)](https://chakra-ui.com/)

# User Registration Form (Multi-step)

A clean and modern multi-step user registration form built with **React**, **TypeScript**, and **Chakra UI**. This app demonstrates validation, step navigation, theme toggling, animations, and form submission.

## Live Demo

[Live Vercel Link](https://multi-step-registration-form-sooty.vercel.app/)

---

## Tech Stack

- React + TypeScript
- Chakra UI
- react-hook-form
- Zod (schema-based validation)
- Framer Motion (animations)
- JSON mock API (for interests)
- Vercel (deployment)

---

## Features

- Multi-step form: Step 1 for basic info, Step 2 for avatar upload
- Validation with error messages using Zod
- Dynamic interest list loaded from JSON (via `public/interests.json`)
- Responsive design with light/dark theme toggle
- Smooth animations on component mount (Framer Motion)
- Form data preview before submission
- Reusable form components
- 404 fallback page
- Mock server via json-server for local POST registration testing

---

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/charlestanev/multi-step-registration-form.git
cd multi-step-registration-form
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. (Optional) Start the mock server (for local `db.json` registrations)

```bash
npm run server
```

---

## Folder Structure

```
public/
  interests.json          # Static interests list
  favicon.ico, *.png      # Favicon and PWA icons

src/
  components/
    forms/                # StepOne.tsx, StepTwo.tsx, RegistrationForm.tsx
    ui/                   # Chakra UI theme setup
  pages/
    NotFound.tsx          # 404 fallback page
  types/                  # TypeScript interfaces (optional)
  main.tsx                # Entry point
  App.tsx                 # Main app wrapper

db.json                   # Mock data for local testing
vite.config.ts            # Vite config
```

---

## Requirements Covered

- [x] React + TypeScript + Chakra UI
- [x] react-hook-form + Zod validation
- [x] Dynamic checkbox list from JSON
- [x] Multi-step form (2 steps)
- [x] Avatar upload with preview
- [x] Form validation and error handling
- [x] Local mock server for registrations
- [x] Light/Dark theme support
- [x] Animated transitions with Framer Motion
- [x] Responsive design + 404 fallback
- [x] Deployed publicly on Vercel

---

## Used in

- Job task for Front-End Developer @ Blackdeep Technologies

---

## License

MIT — free to use and modify.
