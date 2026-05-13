# 🕐 Casio VN Store - E-commerce Platform

A modern, full-featured e-commerce web application built with React, Vite, and TypeScript. The platform showcases Casio watches with a complete shopping experience including cart management, product filtering, and admin dashboard.

## ✨ Features

### Customer Features
- 🔐 **User Authentication** - Register, login, user profiles
- 🛒 **Shopping Cart** - Add/remove items, cart management
- 🔍 **Advanced Search** - Real-time product search with debouncing
- 📊 **Product Filtering** - Filter by category, price range, materials
- 📄 **Product Details** - Detailed product specs, galleries, features
- 📱 **Responsive Design** - Works on desktop, tablet, mobile
- 💳 **Checkout** - Smooth checkout process

### Admin Features
- 📈 **Dashboard** - Revenue metrics and order statistics
- 📦 **Product Management** - CRUD operations for products
- 👥 **User Management** - Manage user accounts and roles
- 📋 **Order Management** - Track and update order statuses
- 📊 **Revenue Charts** - Visual analytics with bar charts

### Technical Features
- ✅ **TypeScript** - Full type safety
- 🧪 **Testing** - Unit and integration tests with Jest
- 🔄 **CI/CD** - GitHub Actions automation
- 🎨 **Tailwind CSS** - Modern styling framework
- 🔧 **ESLint + Prettier** - Code quality standards
- 🪝 **Git Hooks** - Pre-commit linting and formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/casio-vn-store.git
cd casio-vn-store

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Development

```bash
# Start dev server (runs at http://localhost:5173)
npm run dev

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📋 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19, Vite 8, React Router 7 |
| **Language** | TypeScript, JavaScript (ES2020) |
| **Styling** | Tailwind CSS 4, CSS3 |
| **State Management** | Zustand 5 |
| **Forms** | React Hook Form, Zod (validation) |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **Testing** | Jest, React Testing Library |
| **Code Quality** | ESLint, Prettier, Husky |
| **Build Tool** | Vite |
| **CI/CD** | GitHub Actions |

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── CartDrawer.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── admin/
│       ├── RevenueBarChart.tsx
│       └── ...
├── pages/           # Page components (route-based)
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── admin/
│       ├── Dashboard.tsx
│       ├── Products.tsx
│       ├── Orders.tsx
│       └── Users.tsx
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useDebounce.ts
│   └── useSearch.ts
├── store/           # Zustand state management
│   └── useStore.ts
├── schemas/         # Zod validation schemas
│   ├── auth.ts
│   └── admin.ts
├── types/           # TypeScript types
│   └── index.ts
├── __tests__/       # Test files
├── css/             # Global styles
└── main.tsx         # Entry point
```

## 🔐 Demo Credentials

### Admin Account
- **Email**: admin@casio.vn
- **Password**: admin123

### User Account
- **Email**: user@casio.vn
- **Password**: user123

## 🧪 Testing

The project includes unit and integration tests for:
- Custom hooks (useDebounce, useSearch, useAuth, useCart)
- Components (ProductCard, SearchBar, CartDrawer)
- Pages (Login, Register)

Run tests with:
```bash
npm run test
npm run test:watch
npm run test:coverage
```

## 🔄 CI/CD Pipeline

GitHub Actions automatically:
- Runs linting on commits
- Executes type checking
- Runs test suite
- Builds the application
- Uploads coverage reports

See `.github/workflows/ci.yml` for configuration.

## 📝 Form Validation

All forms use React Hook Form with Zod schema validation:
- **Login/Register**: Email format, password strength
- **Product Form**: Name, price, category validation
- **User Form**: Email, name validation

## 🌐 Deployment

### Recommended Platforms
1. **Vercel** (recommended for Vite)
2. **Netlify**
3. **AWS Amplify**
4. **GitHub Pages**

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Casio VN Store
VITE_APP_ENV=development
```

## 📚 Documentation

- [API Specification](./docs/api.md) - API endpoints documentation
- [Database Schema](./docs/schema.md) - Data model documentation
- [Architecture](./docs/architecture.md) - System architecture overview

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit with conventional commits: `git commit -m "feat: add new feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Nguyễn Gia Vỉ**

## 🙏 Acknowledgments

- Casio Vietnam for the watch products
- React and Vite communities
- All contributors and maintainers

---

Made with ❤️ for Casio Vietnam e-commerce
