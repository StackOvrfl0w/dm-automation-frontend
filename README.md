# DM Automation Frontend

A modern, responsive Next.js 14 landing page for the Instagram DM Automation SaaS platform.

## Features

- 🎨 **Modern Design** - Light mode editorial style with Manrope font
- 📱 **Responsive** - Mobile-first responsive design
- ⚡ **Fast** - Next.js 14 with optimized performance
- 🌐 **SEO Ready** - Built-in meta tags and structured data
- 🎯 **User-Focused** - 12 comprehensive sections covering all features
- 💅 **Tailwind CSS** - Utility-first styling with dark/light mode support

## Tech Stack

- **Framework**: Next.js 14
- **React**: 18.x
- **Styling**: Tailwind CSS 3.x
- **Font**: Manrope (via Google Fonts)
- **Icons**: Lucide React
- **Language**: TypeScript
- **Code Quality**: ESLint

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## Project Structure

```
.
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── public/              # Static assets
├── package.json         # Dependencies
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.mjs      # Next.js configuration
```

## Components Overview

### Landing Page Sections

1. **Navbar** - Navigation with logo and CTA
2. **Hero** - Main headline and value proposition
3. **Features** - 5 core platform features
4. **How It Works** - Step-by-step workflow
5. **Automation Types** - Types of automations (Keyword DM, Story Reply, Comment Keyword, Lead Capture, AI Reply)
6. **Pricing** - 3 pricing tiers (Starter, Growth, Agency)
7. **Testimonials** - Customer testimonials
8. **FAQ** - Frequently asked questions
9. **DM Preview** - Mock messaging interface
10. **ROI Calculator** - Interactive ROI calculator
11. **CTA Section** - Final call-to-action
12. **Footer** - Navigation and social links

## Design System

### Colors

- **Primary Blue**: `#2563eb` (accent color)
- **Background Light**: `#f7f8fc` (light background)
- **Dark Text**: `#0f172a` / `#1e293b` (dark slate)
- **Borders**: `#e2e8f0` (light gray)
- **Accents**: `#06b6d4` (cyan), `#f59e0b` (amber)

### Typography

- **Font Family**: Manrope
- **Headings**: Bold, large sizes (36px-48px)
- **Body**: Regular, 16px-18px
- **Small**: Regular, 14px-16px

### Spacing & Layout

- **Container Width**: 1280px max-width
- **Section Spacing**: 80px vertical padding
- **Grid Gaps**: 16px-24px

## Development

### Code Style

- ESLint configured for code quality
- Prettier for code formatting
- TypeScript for type safety

### Building

```bash
# Development build (with source maps)
npm run dev

# Production build
npm run build

# Run production build locally
npm start
```

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# https://vercel.com/new

# Auto-deploy on every push
```

### Other Platforms

This is a standard Next.js 14 app, so it can be deployed to:
- Netlify
- AWS Amplify
- Firebase Hosting
- Docker containers
- Any Node.js hosting provider

## Environment Variables

```env
# Add any frontend environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Performance

- **Lighthouse Score**: 90+ on desktop
- **Core Web Vitals**: Optimized for CWV
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with font-display: swap

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a Next.js project. To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues or questions, contact the development team.

## Related Projects

- **Backend**: dm-automation-backend (Node.js + Express)
- **API Documentation**: See backend README for API details
