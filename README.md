# 🚀 WebNexa – AI-Powered Website Builder

<p align="center">
  <strong>Build websites faster with the power of AI.</strong>
</p>

<p align="center">
  An AI-powered website builder designed to simplify website creation through intelligent generation and a modern development experience.
</p>

<p align="center">
  <a href="https://web-nexa-nu.vercel.app/">
    <strong>🌐 Live Demo – WebNexa</strong>
  </a>
</p>

---

## 📖 About the Project

**WebNexa** is an AI-powered website builder that aims to make website creation easier and faster. It integrates AI capabilities with a modern web application to provide users with an interactive website-building experience.

The project combines a React-based frontend with a Node.js backend, providing authentication, database management, AI API integration, and payment processing infrastructure.

## 🌐 Live Application

**Try WebNexa:** https://web-nexa-nu.vercel.app/

## ✨ Key Features

- 🤖 **AI-Powered Website Generation** – Generate websites using AI integration.
- 🔐 **User Authentication** – Authentication and session management using Better Auth.
- 🎨 **Modern User Interface** – Clean and interactive frontend experience.
- ⚡ **Fast Performance** – Built with React, TypeScript, and Vite.
- 🔗 **Backend API Integration** – Frontend and backend communication using Axios and Express.
- 🗄️ **Database Management** – PostgreSQL database hosted on Neon using Prisma ORM.
- 💳 **Payment Integration** – Stripe integration for payment processing.
- 📱 **Responsive Interface** – Modern styling with Tailwind CSS.

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| React Router DOM | Routing |
| Axios | API communication |
| Better Auth | Authentication |
| Lucide React | Icons |
| Sonner | Notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express 5 | Backend framework |
| TypeScript | Type safety |
| PostgreSQL | Database |
| Neon | Cloud database hosting |
| Prisma 7 | ORM |
| Better Auth | Authentication |
| OpenAI SDK | AI API integration |
| Stripe | Payment processing |
| CORS | Cross-origin communication |

## 🏗️ Project Architecture

WebNexa follows a frontend-backend architecture where the frontend communicates with the backend through HTTP API requests.

```text
                 WebNexa Application
                         |
             +-----------+-----------+
             |                       |
         Frontend                 Backend
       React + Vite          Node.js + Express
             |                       |
             |      HTTP / Axios     |
             +-----------------------+
                         |
          +--------------+--------------+
          |              |              |
       Better Auth    AI API          Stripe
          |              |              |
          +--------------+--------------+
                         |
                    PostgreSQL
                         |
                       Neon
```

## 📂 Repository Structure

```text
WebNexa/
│
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── server/                 # Node.js backend
│   ├── prisma/
│   ├── server.ts
│   ├── package.json
│   └── README.md
│
└── README.md               # Main documentation
```

*Adjust the folder names if your actual repository uses a different structure.*

## ⚙️ Getting Started

Follow these instructions to run WebNexa locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL database (or a Neon PostgreSQL instance)
- Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd WebNexa
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=4000
NODE_ENV=development

TRUSTED_ORIGIN=http://localhost:5173

DATABASE_URL=your_postgresql_connection_string

BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:4000

AI_API_KEY=your_ai_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the backend:

```bash
npm run server
```

Backend URL: `http://localhost:4000`

### 3. Setup the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the client directory:

```env
VITE_BASEURL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## 📜 Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build frontend |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### Backend

| Command | Description |
|---|---|
| `npm run server` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |

## 🔐 Environment Variables & Security

WebNexa uses environment variables to manage application configuration and sensitive credentials.

- Never commit `.env` files.
- Keep API keys and database credentials private.
- Never expose backend secrets in frontend code.
- Configure production environment variables through your hosting provider.
- Use HTTPS for production deployments.

## 🚀 Future Enhancements

- More AI-powered website generation capabilities.
- Additional website templates.
- Enhanced website editing and customization.
- Improved application performance.
- Additional payment and subscription features.

## 📸 Screenshots

Add actual screenshots of WebNexa here to showcase its interface and functionality.

```markdown
![WebNexa Homepage](./screenshots/homepage.png)
```

## 📚 Documentation

For detailed implementation and setup instructions:

- **Frontend Documentation:** [Client README](./client/README.md)
- **Backend Documentation:** [Server README](./server/README.md)

## 👨‍💻 Author

**Prince Kumar**

- GitHub: https://github.com/Prince7643
- LinkedIn:https://www.linkedin.com/in/prince-kumar-0bb2a4277

---

<p align="center">
  <strong>Built with ❤️ by Prince Kumar</strong>
</p>

<p align="center">
  ⭐ If you find WebNexa interesting, consider giving this repository a star!
</p>
