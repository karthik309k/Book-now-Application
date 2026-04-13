# BookNow - Event Exploration & Management

BookNow is a modern, responsive web application designed for users to discover, explore, and manage their favorite events. Built with React and powered by Vite, it offers a seamless and interactive experience for event enthusiasts.

## 🚀 Features

- **Secure Authentication**: Integrated login system utilizing JWT tokens and secure cookie management.
- **Interactive Event Discovery**: Browse through a curated list of events on the Home Page.
- **Personalized Selections**: Save your favorite events to a dedicated "Favourites" section for easy access.
- **Protected Routes**: Secure navigation ensures that only authenticated users can access personalized features.
- **Responsive Design**: A sleek, mobile-friendly interface that looks great on all devices.
- **Dynamic State Management**: Utilizes React Context API for efficient state handling across the application.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API
- **Authentication**: JWT & `js-cookie`
- **Styling**: Vanilla CSS with modern flexbox/grid layouts

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd booknow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
booknow/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── EventCard/    # Individual event cards
│   │   ├── FavouritesPage/ # Saved events view
│   │   ├── Header/       # Navigation and logo
│   │   ├── HomePage/     # Main event listing
│   │   ├── LoginForm/    # User authentication
│   │   ├── NotFound/     # 404 error page
│   │   └── ProtectedRoute/ # Route guarding logic
│   ├── context/          # Favourites Context provider
│   ├── App.jsx           # Main application shell & routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Project metadata and dependencies
```

## 📜 Available Scripts

- `npm run dev`: Starts the development server at `http://localhost:5173`.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Previews the production build locally.

---
Built with ❤️ by your AI Coding Assistant.
