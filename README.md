# Hansy Real Estate — Demo Repository

<div align="center">

**Egypt's premier real estate platform — demo showcase**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Demo repository notice

This repository is a **demo version** of the Hansy Real Estate project, published for portfolio and demonstration purposes.

- **Not the full production codebase** — Some features, integrations, and sensitive logic have been removed or simplified for privacy and security.
- **Content may differ** — Sample or placeholder content may be used in place of live data and assets.
- **Full project** — To see the complete application and full feature set, use the link below.

### See the full project

**[🔗 View the full Hansy Real Estate project →](https://hansyrealestate.com/)**

---

## About the project

**Hansy Real Estate** is a modern real estate platform for the Egyptian market. It helps users discover properties, compounds, and developers, with support for Arabic and English, authentication, search, and property management flows.

This demo includes the core structure, UI components, and main pages to illustrate the architecture and stack used in the full project.

---

## Tech stack

| Category         | Technologies                                                |
| ---------------- | ----------------------------------------------------------- |
| **Framework**    | Next.js 15 (App Router), React 19                           |
| **Language**     | TypeScript                                                  |
| **Styling**      | Tailwind CSS 4                                              |
| **UI**           | Radix UI, shadcn/ui–style components, Lucide & Tabler icons |
| **State & data** | TanStack Query, React Hook Form, Zod                        |
| **Auth**         | NextAuth.js v5                                              |
| **i18n**         | next-intl (Arabic / English)                                |
| **Other**        | Embla Carousel, date-fns, DOMPurify, Sonner                 |

---

## Project structure (high level)

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routes (ar, en)
│   │   ├── (auth)/         # Login, register, forget/reset password
│   │   ├── (root)/         # Main app pages
│   │   └── [...rest]/      # Dynamic routes (properties, compounds, etc.)
│   └── api/                # API routes (auth, locations, wishlist, etc.)
├── components/
│   ├── layout/             # Header, footer, sidebar, etc.
│   ├── ui/                  # Reusable UI primitives
│   ├── shared/              # Shared components (buttons, modals, etc.)
│   └── features/            # Feature-specific components
├── lib/
│   ├── apis/                # API clients (properties, compounds, developers, etc.)
│   ├── actions/             # Server actions
│   ├── schemas/             # Zod schemas
│   ├── types/               # TypeScript types
│   └── constants/           # Nav links, config, etc.
├── hooks/                   # Custom React hooks
├── i18n/                    # next-intl messages (ar.json, en.json)
├── providers/               # React Query, etc.
└── middleware.ts            # Locale & auth middleware
```

---

## Getting started

### Prerequisites

- **Node.js** 20+
- **npm** (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/hansy-website-muhammad-samir.git
cd hansy-website-muhammad-samir

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses the default locale; you can switch to Arabic via the locale prefix (e.g. `/ar`).

### Build & production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## What’s included in this demo

- Next.js 15 App Router and project structure
- Internationalization (Arabic / English) with next-intl
- Auth flows (login, register, forget/reset password) — structure only; backend may be stubbed or removed
- Property, compound, and developer listing/search structure
- Global search UI and routing
- Reusable UI components and layout (header, footer, etc.)
- Responsive layout and Tailwind-based styling

Some features, API integrations, and content have been **omitted or simplified** in this repo. The link at the top of this README points to the full project where you can see the complete experience.

---

## License

This demo repository is for portfolio and demonstration purposes.  
For licensing of the full Hansy Real Estate project, please contact the repository owner.

---

<div align="center">

**Hansy Real Estate** — _Find your dream home_

</div>
