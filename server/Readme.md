# ⚙️ WebNexa – Backend

The WebNexa backend powers the application's core functionality, including API communication, user authentication, database operations, AI integration, and payment processing.

Built using Node.js, Express.js, TypeScript, and PostgreSQL, the backend provides the server-side infrastructure for the WebNexa AI-powered website builder.

## ✨ Features

- **REST API:** Backend API development using Express.js.
- **Authentication:** Secure user authentication and session management using Better Auth.
- **Database Management:** PostgreSQL database integration using Prisma ORM.
- **Cloud Database:** Database hosting through Neon PostgreSQL.
- **AI Integration:** Integration with an AI API using the OpenAI SDK.
- **Payment Integration:** Payment processing infrastructure using Stripe.
- **CORS Configuration:** Cross-origin communication between frontend and backend.
- **Environment Configuration:** Secure configuration using environment variables.
- **TypeScript:** Type-safe and maintainable backend development.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | Backend framework |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| Neon | Cloud database hosting |
| Prisma 7 | ORM and database operations |
| Better Auth | Authentication |
| OpenAI SDK | AI API integration |
| Stripe | Payment processing |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Nodemon | Automatic server restarting |
| tsx | TypeScript execution |

## 📂 Project Structure

```text
server/
│
├── prisma/
│   └── schema.prisma
│
├── dist/
│
├── server.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*Note: This is a representative structure. Update it according to your actual backend folders and files.*

## ⚙️ Installation & Setup

Follow these steps to run the backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Prince7643/WebNexa.git
```

### 2. Navigate to the Backend Directory

```bash
cd server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root directory.

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL
TRUSTED_ORIGIN=http://localhost:5173

# Database Configuration
DATABASE_URL="your_neon_postgresql_connection_string"

# Authentication
BETTER_AUTH_SECRET=your_new_auth_secret
BETTER_AUTH_URL=http://localhost:4000

# AI Configuration
AI_API_KEY=your_ai_api_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Environment Variables Explained

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend server runs |
| `NODE_ENV` | Application environment |
| `TRUSTED_ORIGIN` | Frontend origin allowed to communicate with the backend |
| `DATABASE_URL` | PostgreSQL database connection string |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `BETTER_AUTH_URL` | Base URL of the authentication server |
| `AI_API_KEY` | API key for AI integration |
| `STRIPE_SECRET_KEY` | Stripe secret key for server-side payment operations |
| `STRIPE_WEBHOOK_SECRET` | Secret used to verify Stripe webhook signatures |

**Security:** Never commit your `.env` file to GitHub. Add it to `.gitignore` and use environment variables in your deployment environment.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start the Development Server

```bash
npm run server
```

The backend will run at:

```text
http://localhost:4000
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run server` | Starts the development server using Nodemon and tsx |
| `npm run build` | Compiles TypeScript into JavaScript |
| `npm start` | Starts the compiled production server |
| `npm test` | Placeholder test script (not configured yet) |

**Production build:**

```bash
npm run build
npm start
```

Ensure your TypeScript configuration generates the server entry point at `dist/server.js`, as expected by the start script.

## 🗄️ Database

WebNexa uses PostgreSQL as its primary relational database.

- **Database Provider:** Neon PostgreSQL
- **ORM:** Prisma
- **Database Adapter:** Prisma PostgreSQL Adapter (`@prisma/adapter-pg`)

Prisma is used to interact with the database and manage database models.

To apply development migrations when your Prisma configuration is ready:

```bash
npx prisma migrate dev
```

## 🔐 Authentication

Better Auth is used to manage authentication functionality.

The backend uses environment-based configuration to manage authentication secrets and the application URL.

## 🤖 AI Integration

The backend integrates with an AI API through the OpenAI SDK.

The AI integration provides the server-side foundation for AI-powered website generation in WebNexa.

API credentials are managed through environment variables.

## 💳 Payment Integration

Stripe is integrated to support payment processing.

The backend configuration includes:

- Stripe Secret Key
- Stripe Webhook Secret

Webhook signature verification should be used when handling Stripe webhook events.

## 🔗 Frontend Integration

The WebNexa frontend communicates with the backend through HTTP API requests.

**Frontend URL:**
`http://localhost:5173`

**Backend URL:**
`http://localhost:4000`

The frontend uses Axios for API communication, while the backend uses Express.js to handle incoming requests.

CORS is configured to allow communication between the frontend and backend origins.

## 🔒 Security Practices

- Keep API keys and database credentials private.
- Never expose server-side secrets in frontend code.
- Use `.env` for local environment configuration.
- Configure CORS with trusted frontend origins.
- Verify Stripe webhook signatures.
- Use secure authentication and session handling.
- Use HTTPS in production.

## 🚀 Future Improvements

- Improve API performance and error handling.
- Add automated backend testing.
- Implement production logging and monitoring.
- Improve database query optimization.
- Strengthen API security and validation.
- Optimize backend scalability.

---

⭐ If you find this project interesting, consider giving it a star!
