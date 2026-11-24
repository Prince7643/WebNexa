# 🚀 WebNexa – AI Website Builder (Frontend)

WebNexa is an AI-powered website builder that helps users create websites with the power of artificial intelligence. It provides a modern and user-friendly interface to interact with AI-powered website generation functionality.

The frontend is built using React, TypeScript, and Tailwind CSS, with authentication, API integration, and a responsive user interface.

## ✨ Features

- **AI-Powered Website Generation:** Interact with AI functionality to generate websites.
- **Authentication:** User authentication and account management using Better Auth.
- **API Integration:** Communicate with the backend using Axios.
- **Modern UI:** Clean and interactive user interface.
- **Responsive Styling:** Built using Tailwind CSS.
- **Client-Side Routing:** Navigate between application pages using React Router.
- **Notifications:** Display application feedback using Sonner.
- **Icon Library:** Consistent icons using Lucide React.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building user interfaces |
| TypeScript | Type safety |
| Vite 7 | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive design |
| React Router DOM 7 | Client-side routing |
| Axios | HTTP requests and API integration |
| Better Auth | Authentication |
| Better Auth UI | Authentication interface components |
| Lucide React | Icons |
| Sonner | Toast notifications |
| ESLint | Code quality and linting |

## 📂 Project Structure

```text
client/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*Note: Update the directory structure to match your actual source code.*

## ⚙️ Installation & Setup

Follow these steps to run the frontend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Prince7643/WebNexa.git
```

### 2. Navigate to the Frontend Directory

```bash
cd client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the frontend project.

```env
VITE_BASEURL=http://localhost:4000
```

**Environment Variable:**

| Variable | Description |
|---|---|
| `VITE_BASEURL` | Base URL of the WebNexa backend API |

Make sure the backend server is running on the configured URL.

### 5. Start the Development Server

```bash
npm run dev
```

The application will start at:

```text
http://localhost:5173
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds the application |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run preview` | Previews the production build |

## 🔗 Backend Integration

The WebNexa frontend communicates with its backend through API requests using Axios.

The backend base URL is configured through the `VITE_BASEURL` environment variable.

```typescript
const BASE_URL = import.meta.env.VITE_BASEURL;
```

**Note:** The backend server must be configured and running for API-dependent functionality to work correctly.

## 🔐 Security Notes

- Never commit `.env` files containing sensitive information.
- Add `.env` to `.gitignore`.
- Do not expose private API keys or authentication secrets in frontend code.
- Use environment variables for environment-specific configuration.

## 🚀 Future Improvements

- Enhance website generation and customization.
- Improve the website editing experience.
- Add more templates and design options.
- Optimize frontend performance and user experience.

⭐ If you like this project, consider giving it a star!
