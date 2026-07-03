# FF Token Tool - Frontend README

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 to view it in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── tools/              # Tool pages
├── components/
│   ├── ui/                 # UI components
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   ├── tools/              # Tool components
│   └── providers/          # Context providers
├── lib/
│   └── api.ts              # API client
├── types/
│   └── api.ts              # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Features

- **Modern UI**: Cyberpunk/Gamer design with neon effects
- **Responsive**: Mobile-first approach
- **Animations**: Smooth animations with Framer Motion
- **Type-safe**: Full TypeScript support
- **Icons**: Lucide React icons
- **Notifications**: Toast notifications with Sonner

## 📦 Key Dependencies

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Sonner**: Toast notification
- **Axios**: HTTP client

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t ff-token-tool-frontend .
docker run -p 3000:3000 ff-token-tool-frontend
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
