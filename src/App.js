import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Clock, Download, Shield, Users, CheckCircle, ArrowRight, Play,
  BookOpen, Award, Zap, Heart, MessageCircle, X, Search, Wind, Palette,
  BarChart, Code, Briefcase, Camera, Film, Mic, Cpu, Bot, PenTool, BrainCircuit, Lightbulb, ArrowLeft,
  ShoppingCart
} from 'lucide-react';

// --- STYLE INJECTION ---
const GlobalStyles = () => (
  <style>{`
    /* --- ANIMATIONS --- */
    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-in-bottom {
      from { opacity: 0; transform: translateY(30px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-price {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .slide-in-left { animation: slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .slide-in-right { animation: slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both; }
    .slide-in-bottom { animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .fade-in { animation: fade-in 0.8s ease-out both; }
    .pulse-price { animation: pulse-price 2.5s infinite ease-in-out; }

    /* --- GRADIENTS --- */
    .gradient-hero {
      background: linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%);
    }

    /* --- INTERACTIVE ELEMENTS --- */
    .btn-hover-scale {
      transition: transform 0.2s;
    }
    .btn-hover-scale:hover {
      transform: scale(1.03);
    }

    /* --- (NEW) ADVANCED CATEGORY CARD --- */
    .category-card-advanced {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      height: 150px; /* Set a fixed height */
    }
    .category-card-advanced:hover {
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      transform: translateY(-4px);
    }
    .category-card-advanced img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .category-card-advanced:hover img {
      transform: scale(1.1);
    }
    .category-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
      transition: background-color 0.3s ease;
    }
    .category-card-advanced:hover .category-card-overlay {
      background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%);
    }
    .category-card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 1rem;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    /* --- (MODIFIED) PRODUCT CARD --- */
    .product-card {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
    }
    .product-card:hover {
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      transform: translateY(-4px);
    }
    /* Clickable area for product details */
    .product-card-clickable-area {
      cursor: pointer;
    }
    .product-card-content {
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .product-card-footer {
      padding: 0 1rem 1rem 1rem;
    }
    
    /* --- MODAL --- */
    .modal-backdrop {
      animation: fade-in 0.3s ease;
    }
  `}</style>
);

// --- (UPDATED) DATA STRUCTURE ---
// Added categoryImage to categories
// Added description to products
const productData = {
  categories: [
    { name: "AI Prompts", icon: Bot, categoryImage: "https://images.unsplash.com/photo-1677759526227-c5d461c786a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFpJTIwYXJ0fGVufDB8fHx8MTcyOTUxNDY0MXww&ixlib=rb-4.0.3&q=80&w=1080", description: "Master ChatGPT, Midjourney & more with expert prompts.", products: [
      { name: "Ultimate Midjourney Prompt Pack", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Midjourney+Pack", rating: 4.9, price: 499, description: "Unlock breathtaking AI art with 1000+ copy-paste prompts for Midjourney. Covers styles like cyberpunk, fantasy, photorealism, and more. Includes a guide on prompt engineering." },
      { name: "ChatGPT for Business Toolkit", image: "https://placehold.co/600x400/7c3aed/ffffff?text=ChatGPT+Toolkit", rating: 4.8, price: 599, description: "Automate your workflow with 500+ ChatGPT prompts for marketing, sales, customer support, and operations. Includes templates for emails, reports, and social media posts." },
      { name: "AI Copywriting Formulas", image: "https://placehold.co/600x400/7c3aed/ffffff?text=AI+Copywriting", rating: 4.7, price: 349, description: "Generate high-converting copy in seconds. This pack includes 200+ prompts based on proven copywriting formulas like AIDA, PAS, and the 4 C's." },
      { name: "Stable Diffusion Art Prompts", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Stable+Diffusion", rating: 4.6, price: 299, description: "Master Stable Diffusion with this set of 500+ advanced prompts. Learn to control composition, lighting, and artistic style with precision." },
    ]},
    { name: "Canva Templates", icon: Palette, categoryImage: "https://images.unsplash.com/photo-1611162616805-6a406c5c6b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxjYW52YSUyMGRlc2lnbnxlbnwwfHx8fDE3Mjk1MTQ2ODV8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "Stunning, editable templates for social media and branding.", products: [
      { name: "Instagram Pro Bundle", image: "https://placehold.co/600x400/db2777/ffffff?text=Instagram+Bundle", rating: 4.9, price: 699, description: "100+ fully editable Canva templates for Instagram posts, stories, and carousels. Designed for influencers, coaches, and small businesses. Includes a content calendar." },
      { name: "Business Branding Kit", image: "https://placehold.co/600x400/db2777/ffffff?text=Branding+Kit", rating: 4.8, price: 799, description: "Create a stunning brand identity in minutes. This kit includes Canva templates for logos, business cards, letterheads, email signatures, and brand guidelines." },
      { name: "Reels & Stories Pack", image: "https://placehold.co/600x400/db2777/ffffff?text=Reels+Pack", rating: 4.7, price: 499, description: "Go viral with 50+ animated Canva templates for Instagram Reels and Stories. Includes templates for trends, tutorials, and promotional content." },
      { name: "Presentation Deck Templates", image: "https://placehold.co/600x400/db2777/ffffff?text=Presentations", rating: 4.6, price: 399, description: "Pitch your ideas with confidence. 10 professional, 20-slide presentation decks for business proposals, webinars, and course lectures. Fully editable in Canva." },
    ]},
    { name: "Lightroom Presets", icon: Camera, categoryImage: "https://images.unsplash.com/photo-1554080353-321e45260183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxwaG90byUyMGVkaXRpbmclMjBsaWdodHJvb218ZW58MHx8fHwxNzI5NTE0NzA0fDA&ixlib=rb-4.0.3&q=80&w=1080", description: "One-click photo editing for professional-looking images.", products: [
        { name: "Moody Cinematic Presets", image: "https://placehold.co/600x400/ea580c/ffffff?text=Moody+Presets", rating: 4.9, price: 299, description: "Get that dark, moody, cinematic look with one click. This pack of 15 Lightroom presets is perfect for urban, portrait, and landscape photography." },
        { name: "Travel Blogger Collection", image: "https://placehold.co/600x400/ea580c/ffffff?text=Travel+Presets", rating: 4.8, price: 349, description: "20 vibrant and sharp presets designed to make your travel photos pop. Works perfectly for beaches, jungles, and cityscapes. Mobile & Desktop compatible." },
        { name: "Bright & Airy Pack", image: "https://placehold.co/600x400/ea580c/ffffff?text=Bright+Presets", rating: 4.7, price: 249, description: "Create a clean, light, and airy aesthetic. 10 presets ideal for lifestyle, flat lays, and interior photos. Perfect for influencers and bloggers." },
        { name: "Urban Street Style", image: "https://placehold.co/600x400/ea580c/ffffff?text=Urban+Presets", rating: 4.5, price: 299, description: "12 presets with high contrast and desaturated tones, designed for street photography. Give your city shots a gritty, professional edge." },
    ]},
    { name: "UI/UX Kits", icon: PenTool, categoryImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDB8fHx8MTcyOTUxNDcyM3ww&ixlib=rb-4.0.3&q=80&w=1080", description: "Figma & Sketch kits to accelerate your design workflow.", products: [
        { name: "SaaS Dashboard UI Kit", image: "https://placehold.co/600x400/0891b2/ffffff?text=SaaS+UI+Kit", rating: 4.9, price: 999, description: "A massive Figma kit with 300+ components and 50+ screens for building complex SaaS dashboards. Includes dark and light modes." },
        { name: "Mobile App Wireframe Kit", image: "https://placehold.co/600x400/0891b2/ffffff?text=Mobile+Wireframe", rating: 4.7, price: 499, description: "Plan your mobile app 10x faster. 200+ ready-to-use wireframe screens for Figma, covering common app flows like onboarding, login, profiles, and checkout." },
        { name: "E-commerce Design System", image: "https://placehold.co/600x400/0891b2/ffffff?text=E-commerce+UI", rating: 4.8, price: 1299, description: "Build a beautiful online store. A complete design system for e-commerce, including 100+ screens and a full library of atomic components." },
    ]},
    { name: "Digital Planners", icon: BookOpen, categoryImage: "https://images.unsplash.com/photo-1583361099231-069185128001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGxhbm5lcnxlbnwwfHx8fDE3Mjk1MTQ3NDJ8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "Organize your life with our aesthetic digital planners.", products: [
        { name: "2025 Goal Setter Planner", image: "https://placehold.co/600x400/65a30d/ffffff?text=Goal+Planner", rating: 4.9, price: 249, description: "Crush your goals in 2025. A hyperlinked digital planner for Goodnotes & Notability. Includes goal setting, habit tracking, and monthly/weekly/daily layouts." },
        { name: "Student Academic Planner", image: "https://placehold.co/600x400/65a30d/ffffff?text=Student+Planner", rating: 4.8, price: 199, description: "Ace your exams. A digital planner designed for students, featuring class schedules, assignment trackers, grade trackers, and study planners." },
    ]},
    { name: "Notion Templates", icon: BrainCircuit, categoryImage: "https://images.unsplash.com/photo-1628191079520-802c5448366a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxub3Rpb24lMjB0ZW1wbGF0ZXxlbnwwfHx8fDE3Mjk1MTQ3NTd8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "Supercharge your productivity with pre-built workspaces.", products: [
        { name: "Second Brain System", image: "https://placehold.co/600x400/1d4ed8/ffffff?text=Second+Brain", rating: 5.0, price: 799, description: "The ultimate Notion template for managing your life. Capture ideas, manage projects, track goals, and organize your knowledge all in one place." },
        { name: "Content Creator Dashboard", image: "https://placehold.co/600x400/1d4ed8/ffffff?text=Creator+Dashboard", rating: 4.8, price: 499, description: "Manage your entire content workflow. A Notion dashboard for planning, creating, and tracking content across YouTube, TikTok, and Instagram." },
    ]},
    // ... (Adding descriptions and category images for the rest)
    { name: "Ebook Bundles", icon: Lightbulb, categoryImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxlYm9vayUyMGJ1bmRsZXxlbnwwfHx8fDE3Mjk1MTQ3NzZ8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "Curated collections on marketing, finance, and self-help.", products: [
        { name: "Startup Growth Hacking", image: "https://placehold.co/600x400/be123c/ffffff?text=Startup+Ebooks", rating: 4.7, price: 899, description: "A bundle of 10 ebooks on growth hacking, SaaS marketing, and startup fundraising. Essential reading for any entrepreneur." },
        { name: "Personal Finance Mastery", image: "https://placehold.co/600x400/be123c/ffffff?text=Finance+Ebooks", rating: 4.8, price: 799, description: "Take control of your money. A 5-ebook bundle covering budgeting, investing in stocks, real estate, and retiring early." },
    ]},
    { name: "Web Dev Assets", icon: Code, categoryImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MHx8fHwxNzI5NTE0NzkxfDA&ixlib=rb-4.0.3&q=80&w=1080", description: "Code snippets, themes, and plugins for developers.", products: [
        { name: "React Component Library", image: "https://placehold.co/600x400/4f46e5/ffffff?text=React+Library", rating: 4.9, price: 1499, description: "50+ professional, accessible, and customizable React components built with Tailwind CSS. Copy, paste, and build your app faster." },
        { name: "Tailwind CSS UI Kit", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Tailwind+Kit", rating: 4.8, price: 999, description: "A huge kit of 400+ copy-paste Tailwind CSS components. Includes navbars, heroes, pricing tables, and more. 40 full-page templates." },
        { name: "WordPress Pro Themes", image: "https://placehold.co/600x400/4f46e5/ffffff?text=WP+Themes", rating: 4.6, price: 899, description: "A bundle of 5 premium, fast, and SEO-optimized WordPress themes for blogs, business, and e-commerce. Includes Elementor support." },
    ]},
    { name: "Marketing Kits", icon: BarChart, categoryImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZGFzaGJvYXJkfGVufDB8fHx8MTcyOTUxNDgwNXww&ixlib=rb-4.0.3&q=80&w=1080", description: "Email templates, ad copy, and strategy guides.", products: [
        { name: "Email Marketing Sequences", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Email+Sequences", rating: 4.7, price: 499, description: "10+ complete email marketing flows, including welcome series, cart abandonment, and re-engagement campaigns. 50+ email templates." },
        { name: "Social Media Content Calendar", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Content+Calendar", rating: 4.6, price: 299, description: "A 12-month content calendar template (Notion & Google Sheets) with 365+ content ideas for any niche. Never run out of ideas again." },
    ]},
    { name: "Stock Video", icon: Film, categoryImage: "https://images.unsplash.com/photo-1571524220387-9105207c132c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZvb3RhZ2V8ZW58MHx8fHwxNzI5NTE0ODE5fDA&ixlib=rb-4.0.3&q=80&w=1080", description: "High-quality, royalty-free video clips for any project.", products: [
        { name: "4K Drone Footage Pack", image: "https://placehold.co/600x400/047857/ffffff?text=Drone+Footage", rating: 4.8, price: 1199, description: "100+ stunning 4K drone clips from around the world. Includes cinematic shots of mountains, oceans, and cities. Royalty-free." },
        { name: "Abstract Backgrounds", image: "https://placehold.co/600x400/047857/ffffff?text=Abstract+Video", rating: 4.5, price: 399, description: "50 seamless, looping abstract video backgrounds. Perfect for websites, presentations, and VJ loops. 4K resolution." },
    ]},
    { name: "Sound Effects", icon: Mic, categoryImage: "https://images.unsplash.com/photo-1599488838700-f5e5b3b17280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGJvYXJkfGVufDB8fHx8MTcyOTUxNDgzM3ww&ixlib=rb-4.0.3&q=80&w=1080", description: "A library of SFX for videos, podcasts, and games.", products: [
        { name: "Cinematic SFX Bundle", image: "https://placehold.co/600x400/9333ea/ffffff?text=Cinematic+SFX", rating: 4.7, price: 699, description: "1000+ high-quality sound effects for filmmakers. Includes whooshes, risers, impacts, and ambient sounds to elevate your videos." },
    ]},
    { name: "3D Models", icon: Cpu, categoryImage: "https://images.unsplash.com/photo-1628531010007-9759e95143a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHwzZCUyMG1vZGVsaW5nJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzI5NTE0ODQ2fDA&ixlib=rb-4.0.3&q=80&w=1080", description: "Blender & C4D models for animation and visualization.", products: [
        { name: "Low Poly Asset Pack", image: "https://placehold.co/600x400/b91c1c/ffffff?text=3D+Models", rating: 4.8, price: 999, description: "A huge pack of 500+ low-poly 3D models for game development and animation. Includes characters, buildings, vehicles, and nature assets." },
    ]},
    { name: "Font Bundles", icon: Wind, categoryImage: "https://images.unsplash.com/photo-1507643179-143719111f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWdufGVufDB8fHx8MTcyOTUxNDg2MHww&ixlib=rb-4.0.3&q=80&w=1080", description: "Unique and stylish fonts for your design projects.", products: [
        { name: "Modern Sans-Serif Pack", image: "https://placehold.co/600x400/374151/ffffff?text=Font+Pack", rating: 4.9, price: 399, description: "A curated collection of 20 modern, geometric sans-serif fonts. Perfect for logos, branding, and UI design. Commercial license included." },
    ]},
    { name: "Business Docs", icon: Briefcase, categoryImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50c3xlbnwwfHx8fDE3Mjk1MTQ4NzR8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "Legal templates, business plans, and invoice designs.", products: [
        { name: "Startup Legal Kit", image: "https://placehold.co/600x400/57534e/ffffff?text=Legal+Kit", rating: 4.9, price: 1999, description: "Protect your business. 10+ essential legal templates for startups, including NDA, founder agreement, terms of service, and privacy policy." },
    ]},
    { name: "Icon Sets", icon: Award, categoryImage: "https://images.unsplash.com/photo-1606166325148-73b63c333790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxpY29uJTIwZGVzaWdufGVufDB8fHx8MTcyOTUxNDg4OXww&ixlib=rb-4.0.3&q=80&w=1080", description: "Vector icon packs for web and application design.", products: [
        { name: "Minimalist Icon Set", image: "https://placehold.co/600x400/111827/ffffff?text=Icon+Set", rating: 4.8, price: 249, description: "A set of 2000+ clean, minimalist vector icons. Perfect for modern UI design. Available in 3 styles (line, solid, duotone) and multiple formats (SVG, FIG, ICONJAR)." },
    ]},
  ]
};


// --- COMPONENT ARCHITECTURE ---

const Header = ({ onWhatsAppClick, scrollToSection }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">DigiDen</span>
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => scrollToSection('categories')} className="text-gray-600 hover:text-indigo-600 transition-colors">
            Categories
          </button>
          <button onClick={() => scrollToSection('featured')} className="text-gray-600 hover:text-indigo-600 transition-colors">
            Featured
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-indigo-600 transition-colors">
            Pricing
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-indigo-600 transition-colors">
            Reviews
          </button>
        </nav>
        <Button 
          onClick={onWhatsAppClick}
          className="bg-indigo-600 text-white hover:bg-indigo-700 btn-hover-scale shadow-sm"
        >
          Buy Bundle ₹99
        </Button>
      </div>
    </div>
  </header>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 57 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer rounded-lg p-4 mb-8 text-center bg-white/10 backdrop-blur-sm border border-white/20">
      <p className="text-sm font-medium text-indigo-100 mb-2">Bundle offer ends in:</p>
      <div className="flex justify-center space-x-3 sm:space-x-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/20 rounded-lg p-2 min-w-[60px] sm:min-w-[70px]">
            <div className="text-2xl sm:text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
            <div className="text-xs capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = ({ onWhatsAppClick, scrollToSection }) => (
  <section className="gradient-hero text-white py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="slide-in-left">
          <Badge className="bg-teal-400 text-teal-900 mb-4 text-sm px-3 py-1 font-semibold">
            Your Ultimate Digital Toolkit
          </Badge>
          <h1 className="hero-title font-bold text-white mb-6 text-4xl md:text-5xl leading-tight">
            Unlock 200+ Premium Digital Products for Just ₹99!
          </h1>
          <p className="hero-subtitle text-indigo-100 mb-8 leading-relaxed text-lg">
            Get lifetime access to a curated library of design assets, AI prompts, software tools, and much more. All downloadable, all yours forever.
          </p>
          <CountdownTimer />
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onWhatsAppClick} size="lg" className="bg-teal-400 hover:bg-teal-500 text-teal-900 font-bold text-lg px-8 py-4 btn-hover-scale shadow-lg">
              Get the Bundle Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4" onClick={() => scrollToSection('featured')}>
              <Play className="mr-2 w-5 h-5" /> View Products
            </Button>
          </div>
        </div>
        <div className="slide-in-right">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-6xl font-bold pulse-price mb-4">₹99</div>
                <div className="text-xl mb-6">One-time payment for everything</div>
                <div className="space-y-3 text-left">
                  {["200+ Curated Digital Products", "Lifetime Access & Updates", "Instant Downloadable Content", "15+ Unique Categories"].map(item => (
                    <div key={item} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-teal-300 mr-3 shrink-0" /><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- (MODIFIED) REUSABLE PRODUCT CARD COMPONENT ---
// Now accepts an onProductSelect handler
const ProductCard = ({ product, onBuyClick, onProductSelect }) => {
  const { name, image, rating, price } = product;
  
  return (
    <Card className="product-card group">
      <button onClick={() => onProductSelect(product)} className="product-card-clickable-area w-full text-left">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img src={image} alt={name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
          </div>
        </CardContent>
        <div className="product-card-content">
          <h4 className="font-semibold text-gray-800 mb-2 flex-grow">{name}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-bold text-gray-700">{rating}</span>
            </div>
            <span className="text-2xl font-bold text-indigo-600">₹{price}</span>
          </div>
        </div>
      </button>
      <CardFooter className="product-card-footer">
        <Button onClick={() => onBuyClick(name, price)} className="w-full bg-indigo-600 hover:bg-indigo-700">
          <ShoppingCart className="mr-2 w-4 h-4" /> Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- (MODIFIED) FEATURED PRODUCTS SECTION ---
// Now passes onProductSelect to ProductCard
const FeaturedProductsSection = ({ products, onProductBuyClick, onProductSelect }) => (
  <section id="featured" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 fade-in">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Products</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">A sneak peek at the high-value assets inside the bundle. Click any product for details.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.name} 
            product={product} 
            onBuyClick={onProductBuyClick}
            onProductSelect={onProductSelect} // Pass handler
          />
        ))}
      </div>
    </div>
  </section>
);

// --- (REDESIGNED) CATEGORIES SECTION ---
const CategoriesSection = ({ onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = useMemo(() => 
    productData.categories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Explore Our Digital Universe</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Click any category to explore the full list of products available in our bundle.</p>
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search categories (e.g., Canva, AI...)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          </div>
        </div>
        {/* New Advanced Grid Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <button key={category.name} onClick={() => onCategorySelect(category)} className="category-card-advanced group">
              <img src={category.categoryImage} alt={category.name} />
              <div className="category-card-overlay"></div>
              <div className="category-card-content">
                <category.icon className="w-6 h-6 text-white" />
                <span className="font-semibold text-lg text-white">{category.name}</span>
              </div>
            </button>
          ))}
          {filteredCategories.length === 0 && <p className="col-span-full text-center text-gray-500">No categories found.</p>}
        </div>
      </div>
    </section>
  );
};

// --- (MODIFIED) CATEGORY PAGE COMPONENT ---
// Now uses onBack for navigation and passes onProductSelect
const CategoryPage = ({ category, onBack, onWhatsAppClick, onProductBuyClick, onProductSelect }) => (
  <div className="category-page-container fade-in bg-white min-h-screen">
    <div className="container mx-auto px-4 py-12">
      <Button onClick={onBack} variant="outline" className="mb-8">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back
      </Button>
      <div className="text-center mb-12">
        <category.icon className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{category.name}</h1>
        <p className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.map((product) => (
          <ProductCard 
            key={product.name} 
            product={product} 
            onBuyClick={onProductBuyClick}
            onProductSelect={onProductSelect} // Pass handler
          />
        ))}
      </div>
       <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-800 mb-4">...Or Get ALL Products for Just ₹99!</p>
        <p className="text-lg text-gray-700 mb-6">Why buy one? Get all these, plus 200+ more from every category, in the full bundle.</p>
        <Button onClick={onWhatsAppClick} size="lg" className="bg-teal-500 hover:bg-teal-600 text-white text-lg py-4 btn-hover-scale shadow-lg">
            Get the Full Bundle for ₹99 <MessageCircle className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
);

// --- *** NEW *** PRODUCT DETAIL PAGE COMPONENT ---
const ProductDetailPage = ({ product, onBack, onBuyClick }) => (
  <div className="product-page-container fade-in bg-white min-h-screen">
    <div className="container mx-auto px-4 py-12">
      <Button onClick={onBack} variant="outline" className="mb-8">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back
      </Button>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image */}
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-xl border border-gray-200" />
        </div>
        
        {/* Right Column: Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">{product.name}</h1>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-bold text-indigo-600">₹{product.price}</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg text-yellow-700">{product.rating}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Description</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          </div>
          
          <Button onClick={() => onBuyClick(product.name, product.price)} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-4 btn-hover-scale shadow-lg">
            <ShoppingCart className="mr-3 w-5 h-5" /> Buy Now for ₹{product.price}
          </Button>
        </div>
      </div>
      
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---
function App() {
  const [showModal, setShowModal] = useState(false);
  // NEW: Use a page history stack for navigation
  const [pageHistory, setPageHistory] = useState([{ page: 'home', data: null }]);
  const currentPage = pageHistory[pageHistory.length - 1];

  // WhatsApp number
  const whatsappNumber = "918121847808";

  // Link for the main ₹99 BUNDLE
  const bundleWhatsappLink = https://wa.me/${whatsappNumber}?text=${encodeURIComponent("I'm interested in the DigiDen bundle for 99 INR")};

  // Get 8 featured products
  const featuredProducts = useMemo(() => {
    return productData.categories.slice(0, 8).map(category => category.products[0]);
  }, []);

  useEffect(() => {
    const modalTimer = setTimeout(() => setShowModal(true), 15000);
    return () => clearTimeout(modalTimer);
  }, []);

  // Handler for the main ₹99 BUNDLE
  const handleBundleBuyClick = () => {
    window.open(bundleWhatsappLink, '_blank');
  };

  // Handler for INDIVIDUAL product "Buy Now" buttons
  const handleProductBuyClick = (productName, productPrice) => {
    const productText = Hi, I'm interested in buying this product: ${productName} for ₹${productPrice};
    const productWhatsappLink = https://wa.me/${whatsappNumber}?text=${encodeURIComponent(productText)};
    window.open(productWhatsappLink, '_blank');
  };

  const scrollToSection = (sectionId) => {
    if (currentPage.page !== 'home') {
      // If not on home, go home first, then scroll
      setPageHistory([{ page: 'home', data: null }]);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on home, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // NEW: Navigation Handlers
  const handleCategorySelect = (category) => {
    setPageHistory(prev => [...prev, { page: 'category', data: category }]);
    window.scrollTo(0, 0);
  };
  
  const handleProductSelect = (product) => {
    setPageHistory(prev => [...prev, { page: 'product', data: product }]);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    if (pageHistory.length > 1) {
      setPageHistory(prev => prev.slice(0, -1));
      window.scrollTo(0, 0);
    }
  };

  const testimonials = [
    { name: "Priya S.", text: "This bundle is a creative's dream! The Canva and AI prompt kits are worth 10x the price alone.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face" },
    { name: "Rahul M.", text: "Amazing value! 200+ high-quality digital assets for the price of a coffee. A no-brainer.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
    { name: "Sneha K.", text: "Downloaded everything instantly and already using the Notion templates to organize my business.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
    { name: "Arjun P.", text: "Best investment for my freelance career. The variety is incredible, from UI kits to business docs.", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" },
  ];

  // NEW: Render function to handle different pages
  const renderPage = () => {
    switch (currentPage.page) {
      case 'home':
        return (
          <main>
            <HeroSection onWhatsAppClick={handleBundleBuyClick} scrollToSection={scrollToSection} />
            {/* --- SECTION ORDER CHANGED HERE --- */}
            <CategoriesSection onCategorySelect={handleCategorySelect} />
            <FeaturedProductsSection 
              products={featuredProducts} 
              onProductBuyClick={handleProductBuyClick} 
              onProductSelect={handleProductSelect}
            />
            <section id="pricing" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Get 200+ Digital Products for Just ₹99!</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Individual asset packs can cost ₹1000s. Get our entire curated library for a single, tiny payment.</p>
                </div>
                <div className="max-w-md mx-auto">
                  <Card className="border-2 border-indigo-600 shadow-2xl">
                    <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-t-lg">
                      <CardTitle className="text-2xl font-bold">The DigiDen Bundle</CardTitle>
                      <CardDescription className="text-indigo-100">Your Complete Digital Asset Library</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <div className="text-6xl font-bold text-indigo-600 pulse-price">₹99</div>
                        <div className="text-gray-500 line-through text-xl">₹20,000+ Value</div>
                        <div className="text-green-600 font-semibold">Save Over 99%!</div>
                      </div>
                      <div className="space-y-4 mb-8">
                        {["200+ Premium Digital Products", "15+ Categories Included", "Instant Downloadable Content", "Lifetime Access & Free Updates", "No Time Limits, No Hidden Fees", "One-time Secure Payment"].map(item => (
                          <div key={item} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button onClick={handleBundleBuyClick} size="lg" className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-4 btn-hover-scale shadow-lg">
                        Buy Bundle Now for ₹99 <MessageCircle className="ml-2 w-5 h-5" />
                      </Button>
                      <div className="text-center mt-4">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                          <Shield className="w-4 h-4" /><span>Secure Payment via WhatsApp</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <section id="testimonials" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Loved by Creatives & Entrepreneurs</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied customers who have supercharged their projects with DigiDen.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="card-hover border border-gray-100 shadow-sm bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.text}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </main>
        );
      case 'category':
        return (
          <CategoryPage 
            category={currentPage.data} 
            onBack={handleBack} 
            onWhatsAppClick={handleBundleBuyClick} 
            onProductBuyClick={handleProductBuyClick} 
            onProductSelect={handleProductSelect}
          />
        );
      case 'product':
        return (
          <ProductDetailPage 
            product={currentPage.data} 
            onBack={handleBack}
            onBuyClick={handleProductBuyClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <GlobalStyles />
      <Header onWhatsAppClick={handleBundleBuyClick} scrollToSection={scrollToSection} />

      {/* Render the current page based on state */}
      {renderPage()}

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">DigiDen</span>
          </div>
          <p className="max-w-md mx-auto text-gray-400 mb-6">Your gateway to unlimited creativity with 200+ premium digital products.</p>
          <div className="flex justify-center space-x-6 mb-8">
            <button onClick={() => scrollToSection('categories')} className="text-gray-400 hover:text-white transition-colors">Categories</button>
            <button onClick={() => scrollToSection('featured')} className="text-gray-400 hover:text-white transition-colors">Featured</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white transition-colors">Reviews</button>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-gray-400">© 2025 DigiDen. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative slide-in-bottom">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><Heart className="w-8 h-8 text-teal-600" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't Miss This!</h3>
              <p className="text-gray-600 mb-6">Get the complete DigiDen bundle of 200+ products for just ₹99. This is a limited-time launch offer!</p>
              <Button onClick={() => { setShowModal(false); handleBundleBuyClick(); }} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                Claim My Bundle for ₹99
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
