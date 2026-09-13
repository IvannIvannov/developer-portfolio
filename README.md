# Ivan Ivanov — Developer Portfolio

A modern developer portfolio built to showcase my projects, technical skills, services and approach to building web applications.

The portfolio includes interactive project case studies, an AI-powered project planner and a complete contact enquiry flow.

---

## Features

- Responsive portfolio interface
- Interactive project carousel
- Individual project case study pages
- About and services sections
- Animated technology stack showcase
- AI-powered project planner
- Multi-step project enquiry form
- Contact form email delivery
- Cloudflare Turnstile protection
- Rate limiting and input validation
- Responsive mobile navigation
- Mobile-optimized layouts
- SEO and social sharing metadata

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### AI

- Cloudflare Workers AI

### Services

- Cloudflare Turnstile
- Nodemailer
- Cloudinary

---

## AI Project Planner

The portfolio includes an interactive AI project planner that allows visitors to describe a project idea and receive a structured project plan.

The generated plan can then be transferred directly into the contact enquiry flow together with the original project brief.

The AI functionality is handled through Cloudflare Workers AI.

---

## Contact System

The contact flow includes:

- Multi-step project enquiry form
- Server-side validation
- Email delivery
- Cloudflare Turnstile verification
- Rate limiting
- Environment-based API configuration
- AI project plan integration

---

## Project Structure

```text
developer-portfolio/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   └── sections/
│   ├── data/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/IvannIvannov/developer-portfolio.git
```

Install the frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Install the backend dependencies:

```bash
cd server
npm install
```

Start the backend development server:

```bash
npm run dev
```

---

## Production Build

Build the frontend:

```bash
npm run build
```

Build the backend:

```bash
cd server
npm run build
```

Start the compiled backend:

```bash
npm start
```

---

## Environment Variables

The project uses environment variables for API configuration and third-party services.

Environment files are excluded from version control.

Example configuration files should be used when setting up the project locally.

---

## Projects

The portfolio contains selected development projects with dedicated case study pages, project previews and links to live applications where available.

---

## Author

**Ivan Ivanov**

Frontend Developer

GitHub: [github.com/IvannIvannov](https://github.com/IvannIvannov)

---

## Status

The portfolio is currently being prepared for production deployment.
