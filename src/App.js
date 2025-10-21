import React, { useState, useEffect, useMemo } from 'react';

// --- Placeholder Icon Components ---
// Note: In a real app, these would be imported from a library like lucide-react.
const Button = ({ children, className, variant, size, ...props }) => {
    const baseClasses = "font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary transform hover:scale-105";
    const sizeClasses = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-sm';
    const variantClasses = variant === 'outline'
        ? 'border border-border-color bg-transparent hover:bg-accent-primary/10 text-text-primary'
        : 'bg-accent-primary text-white hover:bg-opacity-90';
    return <button className={`${baseClasses} ${sizeClasses} ${variant ? variantClasses : ''} ${className}`} {...props}>{children}</button>;
};
const Icon = ({ children, className = '' }) => <div className={`inline-block w-6 h-6 ${className}`}>{children}</div>;
const Star = ({ className, filled = true }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></Icon>;
const Shield = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></Icon>;
const CheckCircle = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></Icon>;
const ArrowRight = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Icon>;
const Play = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></Icon>;
const Heart = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Icon>;
const MessageCircle = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></Icon>;
const X = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></Icon>;
const Search = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></Icon>;
const ArrowLeft = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></Icon>;
const ShoppingCart = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></Icon>;
const Sun = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></Icon>;
const Moon = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></Icon>;
const Tag = ({ className }) => <Icon className={className}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></Icon>;

const GenericIcon = ({ className }) => <Icon className={className}>{"⚙️"}</Icon>;
const TrendingUp = GenericIcon, Code = GenericIcon, BarChart = GenericIcon, Briefcase = GenericIcon, Database = GenericIcon, Film = GenericIcon, Palette = GenericIcon, Camera = GenericIcon, PenTool = GenericIcon, BookOpen = GenericIcon, BrainCircuit = GenericIcon, Lightbulb = GenericIcon, Mic = GenericIcon, Cpu = GenericIcon, Wind = GenericIcon, Award = GenericIcon, Monitor = GenericIcon, Edit3 = GenericIcon, Zap = GenericIcon, BarChart3 = GenericIcon;

// --- STYLE INJECTION & THEME MANAGEMENT ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Playfair+Display:wght@700&family=JetBrains+Mono&display=swap');

    :root {
      --bg-primary: #F8FAFC;
      --bg-secondary: #FFFFFF;
      --card-background: rgba(255,255,255,0.8);
      --text-primary: #1A202C;
      --text-secondary: #4A5568;
      --text-tertiary: #718096;
      --accent-primary: #0F4C75;
      --accent-secondary: #FFB000;
      --border-color: rgba(0,0,0,0.1);
      --shadow-color: rgba(9, 30, 66, 0.15);
      --shadow-color-intense: rgba(9, 30, 66, 0.25);
      --success-color: #059669;
      --danger-color: #FF6B6B;
    }

    [data-theme='dark'] {
      --bg-primary: #0A0A0B;
      --bg-secondary: #1A1A1C;
      --card-background: rgba(26,26,28,0.8);
      --text-primary: #F8FAFC;
      --text-secondary: #E2E8F0;
      --text-tertiary: #94A3B8;
      --accent-primary: #4FC3F7;
      --accent-secondary: #FFD700;
      --border-color: rgba(255,255,255,0.1);
      --shadow-color: rgba(0,0,0,0.3);
      --shadow-color-intense: rgba(0,0,0,0.5);
      --success-color: #10B981;
    }

    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-family: 'Poppins', sans-serif;
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    }

    /* --- ANIMATIONS --- */
    @keyframes textFloat3D { 0%{transform:translateY(0) rotateX(0deg) rotateY(0deg)} 25%{transform:translateY(-15px) rotateX(5deg) rotateY(2deg)} 50%{transform:translateY(-25px) rotateX(0deg) rotateY(-2deg)} 75%{transform:translateY(-15px) rotateX(-5deg) rotateY(1deg)} 100%{transform:translateY(0) rotateX(0deg) rotateY(0deg)}}
    @keyframes cardFloat3D { 0%{transform:translateY(0) rotateX(0deg) rotateY(0deg) scale(1);box-shadow:0 10px 30px var(--shadow-color)} 50%{transform:translateY(-20px) rotateX(3deg) rotateY(1deg) scale(1.02);box-shadow:0 25px 60px var(--shadow-color-intense),0 0 30px var(--accent-primary-glow)} 100%{transform:translateY(0) rotateX(0deg) rotateY(0deg) scale(1);box-shadow:0 10px 30px var(--shadow-color)}}
    @keyframes gradientShift { 0%{background-position:0 50%} 50%{background-position:100% 50%} 100%{background-position:0 50%}}
    @keyframes fadeInUp3D { from{opacity:0;transform:translateY(40px) rotateX(-20deg) scale(.9)} to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}}
    @keyframes liquidGlow { 0%,100%{box-shadow:0 0 20px rgba(107,70,193,.3),0 0 40px rgba(107,70,193,.1),inset 0 0 20px hsla(0,0%,100%,.1)} 50%{box-shadow:0 0 40px rgba(255,176,0,.6),0 0 80px rgba(255,176,0,.3),inset 0 0 30px hsla(0,0%,100%,.2)}}
    @keyframes pricePulse { 0%,100%{transform:scale(1);text-shadow:0 2px 4px var(--shadow-color);} 50%{transform:scale(1.05);text-shadow:0 4px 15px var(--accent-primary-glow);}}

    .fade-in-up { animation: fadeInUp3D 1s cubic-bezier(0.4, 0, 0.2, 1) both; }

    /* --- 3D TYPOGRAPHY --- */
    .hero-title-3d {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(3rem, 12vw, 8rem);
        font-weight: 900;
        background: linear-gradient(135deg, #FFD700 0%, #FF8F00 25%, #E91E63 50%, #9C27B0 75%, #3F51B5 100%);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 20px 60px rgba(107,70,193,0.3);
        transform-style: preserve-3d;
        animation: gradientShift 8s ease-in-out infinite, textFloat3D 6s ease-in-out infinite;
        filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
    }
    .section-heading-3d {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 800;
        color: var(--text-primary);
        text-shadow: 0 5px 15px var(--shadow-color);
        transform: perspective(1000px) rotateX(10deg);
        letter-spacing: -0.025em;
        position: relative;
        text-align: center;
        margin-bottom: 2rem;
    }
    
    /* --- GLASSMORPHISM & 3D CARDS --- */
    .glass-card {
        background: var(--card-background);
        backdrop-filter: blur(40px) saturate(180%);
        border-radius: 32px;
        position: relative;
        transform-style: preserve-3d;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid var(--border-color);
        box-shadow: 0 20px 40px var(--shadow-color);
        cursor: pointer;
    }
    .glass-card:hover {
        transform: translateY(-25px) rotateX(8deg) rotateY(4deg) scale(1.05);
        box-shadow: 0 40px 90px var(--shadow-color-intense), 0 0 20px var(--accent-secondary-glow), 0 0 0 1px var(--accent-secondary);
        border-color: var(--accent-secondary);
    }
  `}</style>
);

// --- UPDATED PRODUCT DATA ---
const productData = {
    categories: [
  {
    name: "Trading & Finance Courses",
    icon: TrendingUp,
    categoryImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwZmluYW5jZXxlbnwwfHx8fDE3Mjk1MTQ2NDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Master trading, investing, and financial markets with expert courses.",
    products: [
      { name: "📈 Mastering the Markets: From Basics to Pro 📊", image: "https://placehold.co/600x400/0891b2/ffffff?text=Trading+Master", rating: 4.9, price: 4999, salePrice: 99, description: "Learn trading like legends Warren Buffett, George Soros, and Paul Tudor Jones with proven strategies and advanced risk management techniques." },
      { name: "💰 Mutual Fund Mastery: Your Path to Wealth 📈", image: "https://placehold.co/600x400/0891b2/ffffff?text=Mutual+Fund", rating: 4.8, price: 8499, salePrice: 49, description: "Step-by-step guide to understanding and investing in mutual funds for wealth building." },
      { name: "📉 Market Decoder: Technical & Fundamental Simplified 🔍", image: "https://placehold.co/600x400/0891b2/ffffff?text=Market+Analysis", rating: 4.7, price: 5999, salePrice: 149, description: "Stock market mastery for all traders ready to soar with technical and fundamental analysis." },
      { name: "💹 Options & Futures Pro: Your Path to Market Success 🌟", image: "https://placehold.co/600x400/0891b2/ffffff?text=Options+Pro", rating: 4.9, price: 5999, salePrice: 149, description: "F&O mastery course to unlock the power of derivatives trading with confidence." },
      { name: "📊 The Crypto Playbook: Strategies & Beyond 💸", image: "https://placehold.co/600x400/0891b2/ffffff?text=Crypto+Master", rating: 4.8, price: 14999, salePrice: 499, description: "CryptoMaster course to trade smart, earn big and dominate cryptocurrency markets." },
      { name: "📈 AlgoPro Academy: High-Frequency Trading & Scalping 🌟", image: "https://placehold.co/600x400/0891b2/ffffff?text=Algo+Trading", rating: 4.9, price: 19999, salePrice: 799, description: "Scalping edge mastery for futures, trends and algorithmic trading strategies." },
      { name: "💎 Forex Mastery: Currency Trading Excellence", image: "https://placehold.co/600x400/0891b2/ffffff?text=Forex+Pro", rating: 4.8, price: 12999, salePrice: 399, description: "Master foreign exchange trading with professional strategies and risk management." },
      { name: "📊 Stock Market Psychology: Trading Mindset Mastery", image: "https://placehold.co/600x400/0891b2/ffffff?text=Trading+Psychology", rating: 4.7, price: 8999, salePrice: 299, description: "Develop the psychological edge needed for successful trading and investment decisions." },
      { name: "💰 Investment Banking Fundamentals Pro", image: "https://placehold.co/600x400/0891b2/ffffff?text=Investment+Banking", rating: 4.8, price: 16999, salePrice: 599, description: "Complete investment banking course covering financial modeling and valuation techniques." },
      { name: "📈 Portfolio Management Excellence Course", image: "https://placehold.co/600x400/0891b2/ffffff?text=Portfolio+Management", rating: 4.7, price: 11999, salePrice: 349, description: "Professional portfolio management strategies for wealth preservation and growth." },
      { name: "🏦 Banking & Finance Certification Program", image: "https://placehold.co/600x400/0891b2/ffffff?text=Banking+Finance", rating: 4.8, price: 13999, salePrice: 429, description: "Comprehensive banking and finance program for career advancement." },
      { name: "💸 Personal Finance Mastery Blueprint", image: "https://placehold.co/600x400/0891b2/ffffff?text=Personal+Finance", rating: 4.9, price: 7999, salePrice: 199, description: "Master personal financial planning, budgeting, and wealth building strategies." }
    ]
  },
  {
    name: "Social Media Marketing",
    icon: BarChart,
    categoryImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZGFzaGJvYXJkfGVufDB8fHx8MTcyOTUxNDgwNXww&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Dominate social media platforms and grow your online presence.",
    products: [
      { name: "Social Media Mastery Hub: 50+ Pro Courses", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Social+Media", rating: 4.9, price: 14999, salePrice: 499, description: "Ultimate social media marketing mastery with 50+ advanced courses covering all platforms." },
      { name: "📹 YouTube Pro: Master the Art of Growing and Earning 🚀", image: "https://placehold.co/600x400/ca8a04/ffffff?text=YouTube+Pro", rating: 4.8, price: 41999, salePrice: 199, description: "TubeMastery Academy to unlock success on YouTube and turn it into a money-making machine." },
      { name: "📊 InstaHacks Academy: Crush the Algorithm & Dominate 💼", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Instagram+Growth", rating: 4.8, price: 16999, salePrice: 299, description: "InstaGrow Pro with latest hacks to skyrocket your Instagram growth and engagement." },
      { name: "📸 InstaGram Pro: Master Photoshoots and Portraits 🌟", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Photo+Master", rating: 4.7, price: 12999, salePrice: 399, description: "Professional Instagram photography techniques for stunning photos and brand building." },
      { name: "🎵 TikTok Viral Mastery: Content Creation Secrets", image: "https://placehold.co/600x400/ca8a04/ffffff?text=TikTok+Viral", rating: 4.8, price: 9999, salePrice: 299, description: "Master TikTok algorithm and create viral content that drives massive engagement." },
      { name: "📘 Facebook Marketing Pro: Advanced Strategies", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Facebook+Marketing", rating: 4.7, price: 11999, salePrice: 349, description: "Complete Facebook marketing course with advanced advertising and growth strategies." },
      { name: "🐦 Twitter Growth Hacks: Build Your Brand", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Twitter+Growth", rating: 4.6, price: 7999, salePrice: 249, description: "Strategic Twitter marketing to build your brand and attract targeted followers." },
      { name: "📌 Pinterest Marketing Mastery: Drive Traffic & Sales", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Pinterest+Marketing", rating: 4.7, price: 8999, salePrice: 279, description: "Pinterest marketing strategies to drive massive traffic and boost online sales." },
      { name: "💼 LinkedIn Lead Generation Masterclass", image: "https://placehold.co/600x400/ca8a04/ffffff?text=LinkedIn+Leads", rating: 4.8, price: 10999, salePrice: 329, description: "Professional LinkedIn marketing to generate quality leads and network effectively." },
      { name: "👻 Snapchat Advertising Essentials", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Snapchat+Ads", rating: 4.6, price: 6999, salePrice: 199, description: "Reach younger audiences with targeted Snapchat advertising campaigns." },
      { name: "📊 Social Media Analytics & ROI Tracking", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Social+Analytics", rating: 4.7, price: 9999, salePrice: 299, description: "Master social media analytics to track performance and maximize ROI." },
      { name: "🗓️ Content Calendar Mastery: Strategic Planning", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Content+Calendar", rating: 4.8, price: 7999, salePrice: 249, description: "Plan and schedule social media content like a professional manager." },
      { name: "🎯 Influencer Marketing Strategies Masterclass", image: "https://placehold.co/600x400/ca8a04/ffffff?text=Influencer+Marketing", rating: 4.7, price: 12999, salePrice: 399, description: "Collaborate with influencers to boost your brand and reach new audiences." }
    ]
  },
  {
    name: "Programming & Development",
    icon: Code,
    categoryImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MHx8fHwxNzI5NTE0NzkxfDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Learn coding and app development from zero to expert level.",
    products: [
      { name: "📲 AppQuick: Master iOS Development with C++ Fast 💡", image: "https://placehold.co/600x400/4f46e5/ffffff?text=iOS+Development", rating: 4.8, price: 7499, salePrice: 99, description: "SwiftCpp course to build iOS apps with C++ in just 2 days for beginners." },
      { name: "🔧 CodePHP: Become a Web Development Pro 💡", image: "https://placehold.co/600x400/4f46e5/ffffff?text=PHP+Master", rating: 4.9, price: 11999, salePrice: 99, description: "PHP Pro course to master web development with no IT background required." },
      { name: "🚀 FlutterPro Academy: Build iOS & Android Apps 📱", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Flutter+Pro", rating: 4.9, price: 15999, salePrice: 199, description: "Complete Flutter framework course to build professional iOS and Android apps." },
      { name: "🖥️ JavaScript Ka Jadoo: Hindi Me Coding Sikho 💡", image: "https://placehold.co/600x400/4f46e5/ffffff?text=JavaScript+Hindi", rating: 4.7, price: 6999, salePrice: 49, description: "JavaScript programming course in Hindi for easy and fast learning." },
      { name: "💻 C Programming Sikho: Hindi Mein Asaan Aur Fast 🚀", image: "https://placehold.co/600x400/4f46e5/ffffff?text=C+Programming", rating: 4.6, price: 4999, salePrice: 79, description: "C programming fundamentals in Hindi for beginners entering programming world." },
      { name: "🔐 Python HackPro: From Beginner to Ethical Hacker 🌟", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Python+Hacking", rating: 4.8, price: 12999, salePrice: 399, description: "HackSmart course to master ethical hacking using Python from zero knowledge." },
      { name: "💻 CyberSec Academy: Ultimate Ethical Hacking Bootcamp 🌟", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Cyber+Security", rating: 4.9, price: 18999, salePrice: 599, description: "HackPro bootcamp to master ethical hacking from scratch to professional level." },
      { name: "💡 DataAlchemy: Turning Data into Gold 🚀", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Data+Science", rating: 4.8, price: 13999, salePrice: 399, description: "Unleash the power of data science and analysis for business transformation." },
      { name: "🌐 Full Stack Web Development Masterclass", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Full+Stack", rating: 4.8, price: 19999, salePrice: 599, description: "Complete full stack development course covering frontend and backend technologies." },
      { name: "📱 React Native Mobile App Development", image: "https://placehold.co/600x400/4f46e5/ffffff?text=React+Native", rating: 4.7, price: 14999, salePrice: 449, description: "Build cross-platform mobile apps using React Native framework." },
      { name: "🐍 Python Programming Complete Bootcamp", image: "https://placehold.co/600x400/4f46e5/ffffff?text=Python+Pro", rating: 4.9, price: 12999, salePrice: 399, description: "Comprehensive Python programming course from basics to advanced applications." }
    ]
  },
  {
    name: "E-books & Digital Content",
    icon: BookOpen,
    categoryImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxlYm9vayUyMGJ1bmRsZXxlbnwwfHx8fDE3Mjk1MTQ3NzZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Comprehensive e-book libraries and audiobook collections.",
    products: [
      { name: "📚 AudioBooks Hub 🎧", image: "https://placehold.co/600x400/be123c/ffffff?text=AudioBooks", rating: 4.7, price: 9999, salePrice: 199, description: "Explore endless audiobooks for every mood across Fiction, Non-fiction, Self-Help and more." },
      { name: "✨ ज़िंदगी बदलने वाली: Ultimate Hindi E-Book Library 🚀", image: "https://placehold.co/600x400/be123c/ffffff?text=Hindi+Library", rating: 4.9, price: 2999, salePrice: 99, description: "Life-changing Hindi e-book collection for personal transformation and growth." },
      { name: "💡 ज्ञान का खज़ाना: Ultimate Hindi E-Book Treasure Bundle 📚", image: "https://placehold.co/600x400/be123c/ffffff?text=Hindi+Treasure", rating: 4.8, price: 4999, salePrice: 149, description: "Ultimate Hindi knowledge treasure with books covering life and success topics." },
      { name: "🌟 English E-Book Empire: The Knowledge Goldmine 📖", image: "https://placehold.co/600x400/be123c/ffffff?text=English+Empire", rating: 4.8, price: 6999, salePrice: 199, description: "Massive English e-book collection for professional and personal development." },
      { name: "📚 Business E-Book Collection: Entrepreneur's Library", image: "https://placehold.co/600x400/be123c/ffffff?text=Business+Books", rating: 4.7, price: 8999, salePrice: 249, description: "Essential business and entrepreneurship e-books for success-minded individuals." },
      { name: "💼 Self-Help Mastery: Personal Growth Library", image: "https://placehold.co/600x400/be123c/ffffff?text=Self+Help", rating: 4.8, price: 5999, salePrice: 179, description: "Comprehensive self-help and personal development e-book collection." },
      { name: "🧠 Psychology & Mind Mastery E-Book Bundle", image: "https://placehold.co/600x400/be123c/ffffff?text=Psychology", rating: 4.7, price: 7999, salePrice: 229, description: "Psychology and mind science e-books for understanding human behavior." },
      { name: "💰 Finance & Investment E-Book Treasury", image: "https://placehold.co/600x400/be123c/ffffff?text=Finance+Books", rating: 4.8, price: 6999, salePrice: 199, description: "Complete finance and investment education through expert-authored e-books." },
      { name: "🎯 Marketing & Sales E-Book Mastery Pack", image: "https://placehold.co/600x400/be123c/ffffff?text=Marketing+Books", rating: 4.7, price: 8999, salePrice: 249, description: "Marketing and sales strategies from the world's top experts in e-book format." },
      { name: "🔬 Science & Technology E-Book Collection", image: "https://placehold.co/600x400/be123c/ffffff?text=Science+Tech", rating: 4.6, price: 9999, salePrice: 299, description: "Latest science and technology insights through comprehensive e-book library." },
      { name: "🏥 Health & Wellness E-Book Complete Guide", image: "https://placehold.co/600x400/be123c/ffffff?text=Health+Books", rating: 4.8, price: 5999, salePrice: 179, description: "Complete health and wellness guidance through expert e-book collection." },
      { name: "🎨 Creative Arts & Design E-Book Inspiration", image: "https://placehold.co/600x400/be123c/ffffff?text=Creative+Books", rating: 4.7, price: 7999, salePrice: 229, description: "Creative arts and design inspiration through curated e-book collection." }
    ]
  },
  {
    name: "Design & Graphics",
    icon: Palette,
    categoryImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTcyOTUxNDkyMHww&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Master graphic design, UI/UX, and visual creation tools.",
    products: [
      { name: "🎨 GMP Pro: Graphic Mastery & Photo Editing Simplified 🌟", image: "https://placehold.co/600x400/db2777/ffffff?text=Graphics+Master", rating: 4.9, price: 15999, salePrice: 499, description: "Complete graphic design and photo editing mastery with professional techniques." },
      { name: "🎨 LogoMaster Pro: All-in-One Logo Kit + Bonus Goodies 🚀", image: "https://placehold.co/600x400/db2777/ffffff?text=Logo+Master", rating: 4.8, price: 12999, salePrice: 399, description: "Professional logo design toolkit with templates, resources and bonus materials." },
      { name: "💡 VectorGenius Academy: Adobe Illustrator Mastery Made Easy 🌟", image: "https://placehold.co/600x400/db2777/ffffff?text=Vector+Pro", rating: 4.8, price: 11999, salePrice: 349, description: "Master Adobe Illustrator with easy tutorials and professional project work." },
      { name: "🎨 Photoshop Pro Academy: Digital Art Mastery", image: "https://placehold.co/600x400/db2777/ffffff?text=Photoshop+Pro", rating: 4.9, price: 13999, salePrice: 429, description: "Complete Adobe Photoshop course for digital art and photo manipulation." },
      { name: "🖼️ UI/UX Design Masterclass: User Experience Pro", image: "https://placehold.co/600x400/db2777/ffffff?text=UI+UX", rating: 4.8, price: 16999, salePrice: 599, description: "Professional UI/UX design course for creating exceptional user experiences." },
      { name: "🎯 Brand Identity Design: Complete Branding Course", image: "https://placehold.co/600x400/db2777/ffffff?text=Brand+Design", rating: 4.7, price: 14999, salePrice: 449, description: "Create powerful brand identities with professional design principles." },
      { name: "📐 Figma Design Pro: Modern Design Workflow", image: "https://placehold.co/600x400/db2777/ffffff?text=Figma+Pro", rating: 4.8, price: 9999, salePrice: 299, description: "Master Figma for modern collaborative design and prototyping." },
      { name: "🎨 Canva Mastery: Design Like a Pro Without Skills", image: "https://placehold.co/600x400/db2777/ffffff?text=Canva+Master", rating: 4.7, price: 6999, salePrice: 199, description: "Create stunning designs using Canva with professional techniques and templates." },
      { name: "🖌️ Digital Illustration Masterclass: From Sketch to Art", image: "https://placehold.co/600x400/db2777/ffffff?text=Digital+Art", rating: 4.8, price: 12999, salePrice: 399, description: "Learn digital illustration techniques from basic sketching to finished artwork." },
      { name: "📱 Mobile App Design: UI/UX for Mobile Platforms", image: "https://placehold.co/600x400/db2777/ffffff?text=Mobile+Design", rating: 4.7, price: 11999, salePrice: 349, description: "Specialized mobile app design course covering iOS and Android principles." },
      { name: "🌐 Web Design Mastery: Modern Website Creation", image: "https://placehold.co/600x400/db2777/ffffff?text=Web+Design", rating: 4.8, price: 13999, salePrice: 429, description: "Complete web design course covering modern design trends and techniques." },
      { name: "🎨 3D Design Fundamentals: Blender & Cinema 4D", image: "https://placehold.co/600x400/db2777/ffffff?text=3D+Design", rating: 4.6, price: 18999, salePrice: 599, description: "Learn 3D modeling and animation using professional software tools." }
    ]
  },
  {
    name: "Business & Entrepreneurship",
    icon: Briefcase,
    categoryImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50c3xlbnwwfHx8fDE3Mjk1MTQ4NzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Build and scale successful businesses with proven strategies.",
    products: [
      { name: "🎓 MBA Mastery: The Ultimate Business Playbook 📊", image: "https://placehold.co/600x400/57534e/ffffff?text=MBA+Master", rating: 4.9, price: 19999, salePrice: 499, description: "Complete MBA-level knowledge covering business fundamentals and leadership skills." },
      { name: "🌟 Ultimate Amazon FBA Mastery Pack 💼", image: "https://placehold.co/600x400/57534e/ffffff?text=Amazon+FBA", rating: 4.8, price: 16999, salePrice: 699, description: "Complete Amazon FBA mastery to build successful e-commerce business on Amazon." },
      { name: "📦 E-Commerce Empire Blueprint 🚀", image: "https://placehold.co/600x400/57534e/ffffff?text=E-Commerce", rating: 4.8, price: 14999, salePrice: 449, description: "Build profitable e-commerce empire with proven strategies and implementation." },
      { name: "🚀 Amazing Selling Machine", image: "https://placehold.co/600x400/57534e/ffffff?text=Selling+Machine", rating: 4.7, price: 21999, salePrice: 799, description: "Complete selling system to build and scale any online business successfully." },
      { name: "💼 Startup Success Blueprint: From Idea to IPO", image: "https://placehold.co/600x400/57534e/ffffff?text=Startup+Success", rating: 4.8, price: 18999, salePrice: 599, description: "Complete startup journey from ideation to successful exit strategies." },
      { name: "🏢 Corporate Strategy & Management Excellence", image: "https://placehold.co/600x400/57534e/ffffff?text=Corporate+Strategy", rating: 4.7, price: 15999, salePrice: 499, description: "Advanced corporate strategy and management for business leaders." },
      { name: "💡 Innovation & Product Development Mastery", image: "https://placehold.co/600x400/57534e/ffffff?text=Innovation", rating: 4.8, price: 13999, salePrice: 429, description: "Master innovation processes and product development methodologies." },
      { name: "📈 Business Analytics & Intelligence Pro", image: "https://placehold.co/600x400/57534e/ffffff?text=Business+Analytics", rating: 4.7, price: 12999, salePrice: 399, description: "Leverage data analytics for strategic business decision making." },
      { name: "🤝 Negotiation & Deal Making Masterclass", image: "https://placehold.co/600x400/57534e/ffffff?text=Negotiation", rating: 4.8, price: 9999, salePrice: 299, description: "Master the art of negotiation and deal structuring for business success." },
      { name: "🌍 International Business & Global Markets", image: "https://placehold.co/600x400/57534e/ffffff?text=Global+Business", rating: 4.7, price: 14999, salePrice: 449, description: "Navigate international markets and build global business operations." },
      { name: "💰 Financial Management for Entrepreneurs", image: "https://placehold.co/600x400/57534e/ffffff?text=Financial+Management", rating: 4.8, price: 11999, salePrice: 349, description: "Essential financial management skills for business owners and entrepreneurs." },
      { name: "🎯 Business Model Innovation & Strategy", image: "https://placehold.co/600x400/57534e/ffffff?text=Business+Model", rating: 4.7, price: 13999, salePrice: 429, description: "Design and implement innovative business models for competitive advantage." }
    ]
  },
  {
    name: "Digital Marketing & SEO",
    icon: Search,
    categoryImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxzZW8lMjBtYXJrZXRpbmd8ZW58MHx8fHwxNzI5NTE0OTY1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Master digital marketing, SEO, and online advertising strategies.",
    products: [
      { name: "📈 Authority Hacker Mastery System 💼", image: "https://placehold.co/600x400/059669/ffffff?text=Authority+Hacker", rating: 4.9, price: 18999, salePrice: 699, description: "Build authority websites that generate passive income through content marketing." },
      { name: "✍️ Words That Sell: The Ultimate Pro Copywriting Mastery Kit 💰", image: "https://placehold.co/600x400/059669/ffffff?text=Copywriting", rating: 4.8, price: 13999, salePrice: 449, description: "Master persuasive copywriting that converts visitors into paying customers." },
      { name: "🤖 Messenger Bot Mastery 🚀", image: "https://placehold.co/600x400/059669/ffffff?text=Bot+Marketing", rating: 4.7, price: 9999, salePrice: 299, description: "Automate marketing with powerful messenger bots for engagement and conversion." },
      { name: "🔗💼 LinkedIn Pro 🚀📈", image: "https://placehold.co/600x400/059669/ffffff?text=LinkedIn+Pro", rating: 4.8, price: 7999, salePrice: 249, description: "Master LinkedIn marketing for professional networking and lead generation." },
      { name: "🔍 SEO Mastery: Rank #1 on Google", image: "https://placehold.co/600x400/059669/ffffff?text=SEO+Master", rating: 4.8, price: 12999, salePrice: 399, description: "Complete SEO course to dominate Google search results and drive organic traffic." },
      { name: "📧 Email Marketing Automation Pro", image: "https://placehold.co/600x400/059669/ffffff?text=Email+Marketing", rating: 4.7, price: 9999, salePrice: 299, description: "Build profitable email marketing campaigns with automation and segmentation." },
      { name: "💰 Affiliate Marketing Millionaire Blueprint", image: "https://placehold.co/600x400/059669/ffffff?text=Affiliate+Marketing", rating: 4.8, price: 14999, salePrice: 449, description: "Complete affiliate marketing system to build passive income streams." },
      { name: "📱 Mobile Marketing & App Promotion Mastery", image: "https://placehold.co/600x400/059669/ffffff?text=Mobile+Marketing", rating: 4.7, price: 11999, salePrice: 349, description: "Mobile marketing strategies and app promotion techniques for maximum reach." },
      { name: "🎯 Conversion Rate Optimization Expert", image: "https://placehold.co/600x400/059669/ffffff?text=CRO+Expert", rating: 4.8, price: 10999, salePrice: 329, description: "Optimize conversion rates and maximize revenue from existing website traffic." },
      { name: "📊 Google Analytics & Data-Driven Marketing", image: "https://placehold.co/600x400/059669/ffffff?text=Analytics+Pro", rating: 4.7, price: 8999, salePrice: 279, description: "Master Google Analytics and make data-driven marketing decisions." }
    ]
  },
  {
    name: "Personal Development & Relationships",
    icon: Heart,
    categoryImage: "https://images.unsplash.com/photo-1499728457667-a8f76ac5e5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGRldmVsb3BtZW50fGVufDB8fHx8MTcyOTUxNDk3OXww&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Transform your mindset, relationships, and personal growth.",
    products: [
      { name: "💡 Master the Art of Communication & Body Language 💼", image: "https://placehold.co/600x400/ec4899/ffffff?text=Communication", rating: 4.8, price: 8999, salePrice: 299, description: "Master communication and body language for personal and professional success." },
      { name: "🔥 The Rebel's Edge: The Bad Boy Formula & Ultimate Inner Game Bundle 😎", image: "https://placehold.co/600x400/ec4899/ffffff?text=Confidence", rating: 4.7, price: 12999, salePrice: 399, description: "Ultimate confidence and inner game transformation for personal magnetism." },
      { name: "❤️ The Girlfriend Code 2.0: The System for Attracting Your Ideal Partner ✨", image: "https://placehold.co/600x400/ec4899/ffffff?text=Dating+Success", rating: 4.8, price: 9999, salePrice: 349, description: "Proven system for attracting and maintaining meaningful relationships." },
      { name: "🤫 The Desire Decoder: Understand the Secret Language of Attraction 🔥", image: "https://placehold.co/600x400/ec4899/ffffff?text=Attraction", rating: 4.6, price: 7999, salePrice: 249, description: "Understand and master the psychology of attraction and human desire." },
      { name: "❤️‍🔥 Tantric Bliss: The Ultimate Orgasmic & Intimate Mastery Course ✨", image: "https://placehold.co/600x400/ec4899/ffffff?text=Intimacy", rating: 4.7, price: 11999, salePrice: 379, description: "Transform intimate relationships with tantric principles and techniques." },
      { name: "🧠 Mindset Mastery: Transform Your Mental Programming", image: "https://placehold.co/600x400/ec4899/ffffff?text=Mindset", rating: 4.8, price: 9999, salePrice: 299, description: "Reprogram your mind for success, confidence, and unlimited potential." },
      { name: "🎯 Goal Achievement Accelerator: Success Psychology", image: "https://placehold.co/600x400/ec4899/ffffff?text=Goal+Achievement", rating: 4.7, price: 8999, salePrice: 279, description: "Psychology-based goal setting and achievement system for guaranteed results." },
      { name: "💪 Confidence Builder: Unshakeable Self-Esteem", image: "https://placehold.co/600x400/ec4899/ffffff?text=Self+Confidence", rating: 4.8, price: 7999, salePrice: 249, description: "Build unshakeable confidence and self-esteem through proven techniques." },
      { name: "🧘 Stress Management & Emotional Intelligence", image: "https://placehold.co/600x400/ec4899/ffffff?text=Emotional+Intelligence", rating: 4.7, price: 8999, salePrice: 279, description: "Master stress management and develop high emotional intelligence." },
      { name: "🌟 Life Purpose Discovery: Find Your True Calling", image: "https://placehold.co/600x400/ec4899/ffffff?text=Life+Purpose", rating: 4.8, price: 9999, salePrice: 299, description: "Discover your life purpose and align your actions with your true calling." },
      { name: "🔄 Habit Formation Mastery: Build Life-Changing Habits", image: "https://placehold.co/600x400/ec4899/ffffff?text=Habit+Formation", rating: 4.7, price: 7999, salePrice: 249, description: "Science-based approach to building positive habits and breaking bad ones." },
      { name: "🚀 Peak Performance Psychology: Achieve Excellence", image: "https://placehold.co/600x400/ec4899/ffffff?text=Peak+Performance", rating: 4.8, price: 10999, salePrice: 329, description: "Develop peak performance mindset and achieve excellence in any field." }
    ]
  },
  {
    name: "Technology & IT Skills",
    icon: Monitor,
    categoryImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaXQlMjBza2lsbHN8ZW58MHx8fHwxNzI5NTE0OTk0fDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Essential IT skills, software mastery, and technical expertise.",
    products: [
      { name: "💼 The Ultimate Excel, PowerPoint & Word 7000+ Office Kit 🚀", image: "https://placehold.co/600x400/0d9488/ffffff?text=Office+Master", rating: 4.9, price: 6999, salePrice: 199, description: "Complete Microsoft Office mastery with 7000+ templates and resources." },
      { name: "🔧 Mobile Repair Mastery: Tech Wizard Blueprint", image: "https://placehold.co/600x400/0d9488/ffffff?text=Mobile+Repair", rating: 4.8, price: 25999, salePrice: 799, description: "Professional mobile repair with chip-level expertise and business setup." },
      { name: "🖥️ Computer Hardware Assembly & Repair Pro", image: "https://placehold.co/600x400/0d9488/ffffff?text=Hardware+Pro", rating: 4.7, price: 12999, salePrice: 399, description: "Complete computer hardware assembly, maintenance, and repair training." },
      { name: "🌐 Network Administration & Security Specialist", image: "https://placehold.co/600x400/0d9488/ffffff?text=Network+Admin", rating: 4.8, price: 15999, salePrice: 499, description: "Professional network administration and security management course." },
      { name: "☁️ Cloud Computing Mastery: AWS, Azure & Google", image: "https://placehold.co/600x400/0d9488/ffffff?text=Cloud+Computing", rating: 4.8, price: 18999, salePrice: 599, description: "Master cloud platforms including AWS, Microsoft Azure, and Google Cloud." },
      { name: "🖥️ Windows Server Administration Expert", image: "https://placehold.co/600x400/0d9488/ffffff?text=Windows+Server", rating: 4.7, price: 13999, salePrice: 429, description: "Comprehensive Windows Server administration and management training." },
      { name: "🐧 Linux System Administration Mastery", image: "https://placehold.co/600x400/0d9488/ffffff?text=Linux+Admin", rating: 4.8, price: 11999, salePrice: 349, description: "Complete Linux system administration from basics to advanced levels." },
      { name: "🗄️ Database Management: SQL & NoSQL Mastery", image: "https://placehold.co/600x400/0d9488/ffffff?text=Database+Admin", rating: 4.7, price: 14999, salePrice: 449, description: "Master database management with SQL and NoSQL technologies." },
      { name: "🔐 IT Security & Risk Management Professional", image: "https://placehold.co/600x400/0d9488/ffffff?text=IT+Security", rating: 4.8, price: 16999, salePrice: 599, description: "Comprehensive IT security and risk management certification course." },
      { name: "📱 Mobile Device Management & Support", image: "https://placehold.co/600x400/0d9488/ffffff?text=Mobile+IT", rating: 4.6, price: 9999, salePrice: 299, description: "Enterprise mobile device management and technical support training." },
      { name: "🔧 IT Help Desk & Technical Support Pro", image: "https://placehold.co/600x400/0d9488/ffffff?text=Help+Desk", rating: 4.7, price: 8999, salePrice: 279, description: "Professional IT help desk and technical support service training." },
      { name: "⚡ System Optimization & Performance Tuning", image: "https://placehold.co/600x400/0d9488/ffffff?text=System+Optimization", rating: 4.7, price: 10999, salePrice: 329, description: "Advanced system optimization and performance tuning techniques." }
    ]
  },
  {
    name: "Content Creation & Blogging",
    icon: Edit3,
    categoryImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb258ZW58MHx8fHwxNzI5NTE1MDM4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Create compelling content and build profitable blogs.",
    products: [
      { name: "📖 BlogMaster Pro: From Passion to Profits 🚀", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Blog+Master", rating: 4.8, price: 11999, salePrice: 349, description: "Transform your passion into profitable blog with proven content strategies." },
      { name: "🚀 The Viral Reels Vault: 100,000+ Ready-to-Go Videos & Resources 📈", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Viral+Content", rating: 4.9, price: 14999, salePrice: 499, description: "Massive collection of viral video content and resources for social media." },
      { name: "✍️ Content Writing Mastery: Engage & Convert", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Content+Writing", rating: 4.7, price: 9999, salePrice: 299, description: "Master the art of content writing that engages audiences and drives conversions." },
      { name: "🎥 Video Content Creation: YouTube to TikTok", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Video+Creation", rating: 4.8, price: 12999, salePrice: 399, description: "Complete video content creation course for all social media platforms." },
      { name: "📝 Storytelling Mastery: Captivate Your Audience", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Storytelling", rating: 4.8, price: 8999, salePrice: 279, description: "Master the art of storytelling to captivate and influence your audience." },
      { name: "🎨 Visual Content Design: Graphics That Convert", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Visual+Content", rating: 4.7, price: 10999, salePrice: 329, description: "Create compelling visual content that drives engagement and conversions." },
      { name: "🎙️ Podcast Creation & Monetization Mastery", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Podcast+Master", rating: 4.7, price: 11999, salePrice: 349, description: "Complete podcasting course from creation to monetization strategies." },
      { name: "📚 E-book Writing & Publishing Success", image: "https://placehold.co/600x400/7c3aed/ffffff?text=Ebook+Success", rating: 4.6, price: 9999, salePrice: 299, description: "Write, publish, and market successful e-books across all platforms." },
      { name: "🌐 Website Content Strategy & SEO Writing", image: "https://placehold.co/600x400/7c3aed/ffffff?text=SEO+Writing", rating: 4.8, price: 10999, salePrice: 329, description: "Create SEO-optimized website content that ranks and converts." }
    ]
  },
  {
    name: "Health & Beauty",
    icon: Zap,
    categoryImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBiZWF1dHl8ZW58MHx8fHwxNzI5NTE1MDA4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Health, wellness, fitness, and beauty transformation courses.",
    products: [
      { name: "💄 Beauty Boss: Ultimate Glam & Glow Masterclass", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Beauty+Master", rating: 4.8, price: 19999, salePrice: 599, description: "Professional beauty course covering skincare, makeup, hair styling and spa therapies." },
      { name: "💪 Fitness Transformation: Complete Body Makeover", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Fitness+Pro", rating: 4.8, price: 14999, salePrice: 449, description: "Complete fitness transformation program for body makeover and health optimization." },
      { name: "🧘 Yoga & Wellness Mastery: Mind-Body Connection", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Yoga+Master", rating: 4.7, price: 12999, salePrice: 399, description: "Comprehensive yoga and wellness program for physical and mental well-being." },
      { name: "🥗 Nutrition & Diet Planning: Healthy Lifestyle", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Nutrition+Pro", rating: 4.8, price: 9999, salePrice: 299, description: "Scientific nutrition and diet planning for optimal health and weight management." },
      { name: "💆 Spa Therapy & Massage Techniques Professional", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Spa+Therapy", rating: 4.7, price: 16999, salePrice: 599, description: "Professional spa therapy and massage techniques certification program." },
      { name: "🧴 Skincare Science: Anti-Aging & Beauty Secrets", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Skincare", rating: 4.8, price: 11999, salePrice: 349, description: "Advanced skincare science and anti-aging techniques for beauty professionals." },
      { name: "💇 Hair Styling & Color Mastery Course", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Hair+Styling", rating: 4.7, price: 13999, salePrice: 429, description: "Professional hair styling, cutting, and coloring techniques certification." },
      { name: "🏃 Personal Training Certification: Fitness Coach", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Personal+Trainer", rating: 4.8, price: 15999, salePrice: 499, description: "Become a certified personal trainer with comprehensive fitness coaching skills." }
    ]
  },
  {
    name: "Language & Communication",
    icon: MessageCircle,
    categoryImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nfGVufDB8fHx8MTcyOTUxNTAyM3ww&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Master languages and improve communication skills.",
    products: [
      { name: "🗣️ SpeakFluent Pro: Master English & Advance Communication in 30 Days 🚀", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=English+Master", rating: 4.9, price: 7999, salePrice: 249, description: "Master English and advanced communication skills in 30 days with proven techniques." },
      { name: "🎤 Public Speaking Mastery: Confident Presentations", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Public+Speaking", rating: 4.8, price: 9999, salePrice: 299, description: "Overcome fear and master public speaking with confidence-building techniques." },
      { name: "🌍 Multilingual Mastery: Learn 5 Languages Fast", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Languages", rating: 4.7, price: 12999, salePrice: 399, description: "Accelerated language learning system to master multiple languages efficiently." },
      { name: "📢 Voice Training & Accent Modification", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Voice+Training", rating: 4.7, price: 8999, salePrice: 279, description: "Professional voice training and accent modification for clear communication." },
      { name: "💬 Business Communication Excellence", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Business+Communication", rating: 4.8, price: 10999, salePrice: 329, description: "Master professional business communication for career advancement." },
      { name: "✍️ Writing Skills Mastery: From Basics to Advanced", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Writing+Skills", rating: 4.7, price: 9999, salePrice: 299, description: "Comprehensive writing skills course from basic grammar to advanced composition." },
      { name: "🎭 Communication Psychology & Influence", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Communication+Psychology", rating: 4.8, price: 11999, salePrice: 349, description: "Master the psychology of communication and influence in personal and professional settings." }
    ]
  },
  {
    name: "Data Science & Analytics",
    icon: BarChart3,
    categoryImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZXxlbnwwfHx8fDE3Mjk1MTUwNTJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Transform data into actionable insights and business intelligence.",
    products: [
      { name: "📊 Data Science Bootcamp: Python to AI", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Data+Science", rating: 4.8, price: 18999, salePrice: 599, description: "Complete data science bootcamp covering Python, machine learning, and AI applications." },
      { name: "📈 Business Analytics & Intelligence Mastery", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Business+Analytics", rating: 4.7, price: 14999, salePrice: 449, description: "Master business analytics and intelligence for data-driven decision making." },
      { name: "🤖 Machine Learning & AI Development", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Machine+Learning", rating: 4.8, price: 21999, salePrice: 699, description: "Comprehensive machine learning and AI development course with practical projects." },
      { name: "📊 Excel Advanced Analytics & Data Visualization", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Excel+Analytics", rating: 4.7, price: 9999, salePrice: 299, description: "Advanced Excel analytics and data visualization for business professionals." },
      { name: "💾 Big Data Management & Processing", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Big+Data", rating: 4.6, price: 16999, salePrice: 599, description: "Big data management and processing using modern tools and technologies." },
      { name: "📈 Statistical Analysis & Research Methods", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Statistics", rating: 4.7, price: 12999, salePrice: 399, description: "Comprehensive statistical analysis and research methodology course." }
    ]
  },
  {
    name: "Professional Skills & Training",
    icon: Award,
    categoryImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU5MTR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBza2lsbHN8ZW58MHx8fHwxNzI5NTE1MDgyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    description: "Professional skill development and career advancement courses.",
    products: [
      { name: "💡 The Ultimate Bootcamp: From Zero to Expert 💻", image: "https://placehold.co/600x400/65a30d/ffffff?text=Skills+Bootcamp", rating: 4.8, price: 9999, salePrice: 249, description: "All-in-one skill mastery bootcamp for career advancement and personal growth." },
      { name: "🏆 The Skill Accelerator: Your Ultimate 15+ Course Mastery Bundle 🚀", image: "https://placehold.co/600x400/65a30d/ffffff?text=Skill+Bundle", rating: 4.9, price: 24999, salePrice: 799, description: "Ultimate 15+ course mastery bundle covering essential professional skills." },
      { name: "📋 Project Management Professional (PMP) Certification", image: "https://placehold.co/600x400/65a30d/ffffff?text=Project+Management", rating: 4.8, price: 16999, salePrice: 599, description: "Complete PMP certification course with exam preparation and practical applications." },
      { name: "👔 Leadership & Management Excellence Program", image: "https://placehold.co/600x400/65a30d/ffffff?text=Leadership", rating: 4.8, price: 14999, salePrice: 449, description: "Comprehensive leadership and management development program for professionals." },
      { name: "💼 Human Resources Management Certification", image: "https://placehold.co/600x400/65a30d/ffffff?text=HR+Management", rating: 4.7, price: 13999, salePrice: 429, description: "Professional HR management certification covering recruitment, training, and compliance." },
      { name: "📊 Six Sigma & Quality Management Expert", image: "https://placehold.co/600x400/65a30d/ffffff?text=Six+Sigma", rating: 4.8, price: 15999, salePrice: 499, description: "Six Sigma certification and quality management expertise for process improvement." },
      { name: "🎯 Sales & Customer Service Excellence", image: "https://placehold.co/600x400/65a30d/ffffff?text=Sales+Excellence", rating: 4.7, price: 11999, salePrice: 349, description: "Master sales techniques and customer service excellence for business growth." },
      { name: "🔄 Change Management & Organizational Development", image: "https://placehold.co/600x400/65a30d/ffffff?text=Change+Management", rating: 4.7, price: 12999, salePrice: 399, description: "Change management and organizational development strategies for modern businesses." },
      { name: "📈 Performance Management & Employee Development", image: "https://placehold.co/600x400/65a30d/ffffff?text=Performance+Management", rating: 4.6, price: 10999, salePrice: 329, description: "Performance management systems and employee development strategies." },
      { name: "🤝 Team Building & Collaboration Mastery", image: "https://placehold.co/600x400/65a30d/ffffff?text=Team+Building", rating: 4.7, price: 9999, salePrice: 299, description: "Build high-performing teams and foster collaboration in modern workplaces." }
    ]
  }
]};
// Helper to calculate discount
const calculateDiscount = (original, sale) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
};

// --- COMPONENT ARCHITECTURE ---

const ThemeToggle = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="fixed top-24 right-4 md:right-8 z-[1001] w-16 h-8 rounded-full flex items-center p-1 transition-all duration-300"
        style={{
            background: 'var(--card-background)',
            border: '2px solid var(--border-color)',
            backdropFilter: 'blur(20px)'
        }}
    >
        <div className="absolute inset-0 flex justify-around items-center">
            <Sun className="w-4 h-4 text-yellow-500" />
            <Moon className="w-4 h-4 text-blue-300" />
        </div>
        <div
            className="w-6 h-6 rounded-full absolute top-0.5 left-0.5 transition-transform duration-300 ease-in-out"
            style={{
                background: 'var(--accent-primary)',
                transform: theme === 'dark' ? 'translateX(32px)' : 'translateX(0px)'
            }}
        />
    </button>
);


const Header = ({ onWhatsAppClick, scrollToSection }) => (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-auto max-w-[90vw] transition-all duration-500"
        style={{
            background: 'var(--card-background)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: '2px solid var(--border-color)',
            borderRadius: '35px',
            boxShadow: "0 25px 50px var(--shadow-color), 0 0 0 1px var(--border-color), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
    >
        <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center space-x-3 cursor-pointer group">
                    <span className="text-2xl font-black tracking-wider"
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 50%, #E91E63 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: "0 5px 15px rgba(255,176,0,0.3)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >DigiDen</span>
                </a>
                <nav className="hidden md:flex items-center space-x-2">
                    {['Categories', 'Featured', 'Pricing', 'Reviews'].map(item => (
                        <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="px-4 py-2 rounded-full text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-accent-primary/20 transition-all duration-300">
                            {item}
                        </button>
                    ))}
                </nav>
                <button onClick={onWhatsAppClick} className="font-semibold rounded-full px-4 py-2 text-sm text-white"
                 style={{
                    background: 'linear-gradient(145deg, #0F4C75 0%, #1565A0 100%)',
                    boxShadow: '0 10px 25px rgba(15,76,117,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                 }}
                >
                  Buy Bundle ₹99
                </button>
            </div>
        </div>
    </header>
);

const HeroSection = ({ onWhatsAppClick, scrollToSection }) => {
    return (
      <section className="h-screen relative overflow-hidden flex items-center justify-center text-center"
        style={{ background: 'radial-gradient(ellipse at center, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
      >
        <div className="relative z-10 p-4 fade-in-up">
            <h1 className="hero-title-3d mb-6">Digiden: The Future of Learning</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-text-secondary" style={{textShadow: '0 5px 20px var(--shadow-color)'}}>
              Premium AI-Powered Digital Courses & Transformative Learning Experiences
            </p>
            <button onClick={() => scrollToSection('categories')} className="text-black font-bold uppercase tracking-wider text-lg px-12 py-5 rounded-full transition-all duration-400 transform-style-preserve-3d"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 50%, #E91E63 100%)',
                boxShadow: "0 15px 40px rgba(255,176,0,0.4), 0 5px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >Explore Courses</button>
        </div>
      </section>
    );
};
// --- REUSABLE PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, onBuyClick, onProductSelect }) => {
    const { name, image, rating, price, salePrice } = product;
    const discount = calculateDiscount(price, salePrice);
  
    return (
      <div className="glass-card overflow-hidden flex flex-col h-full">
          <div className="relative">
             <button onClick={() => onProductSelect(product)} className="w-full text-left block">
                <div className="relative h-64 overflow-hidden border-b-2" style={{borderColor: 'var(--accent-secondary)'}}>
                    <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              </button>
            {discount > 0 && (
                <div className="absolute top-4 -right-1 text-white font-bold text-xs px-4 py-2 rounded-l-full"
                    style={{
                        background: 'linear-gradient(135deg, var(--danger-color), #FF5252)',
                        boxShadow: '0 5px 15px rgba(255,107,107,0.4)',
                        transform: 'translateZ(10px)'
                    }}>
                    {discount}% OFF
                </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
              <button onClick={() => onProductSelect(product)} className="w-full text-left block">
                <h4 className="text-xl font-bold text-text-primary mb-3 h-14 overflow-hidden" style={{fontFamily: "'Playfair Display', serif"}}>{name}</h4>
              </button>
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-accent-secondary">
                      <Star className="w-5 h-5" />
                      <span className="ml-2 font-semibold text-lg text-text-secondary">{rating}</span>
                  </div>
                  <div className="text-right">
                      <span className="text-2xl font-bold" style={{color: 'var(--accent-primary)'}}>₹{salePrice}</span>
                      <span className="ml-2 line-through text-text-tertiary">₹{price}</span>
                  </div>
              </div>
          </div>
          <div className="p-6 pt-0 mt-auto">
              <button onClick={() => onBuyClick(name, salePrice)}
                  className="w-full text-white font-bold py-3 px-6 rounded-full"
                  style={{
                      background: 'linear-gradient(135deg, #0F4C75 0%, #1976D2 100%)',
                      boxShadow: '0 15px 35px rgba(15,76,117,0.5), 0 5px 15px rgba(0,0,0,0.2)'
                  }}>
                  <ShoppingCart className="mr-2 w-4 h-4 inline-block" /> Buy Now
              </button>
          </div>
      </div>
    );
};

const FeaturedProductsSection = ({ products, onProductBuyClick, onProductSelect }) => (
 <section id="featured" className="py-24" style={{background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'}}>
  <div className="container mx-auto px-4">
   <h2 className="section-heading-3d">Featured Products</h2>
     <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-16">
        A sneak peek at the high-value assets inside the bundle. Click any product for details.
      </p>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{perspective: '1500px'}}>
     {products.map((product, index) => (
       <div key={product.name} style={{animation: `fadeInUp3D 1s ${index * 0.15}s both`}}>
         <ProductCard 
           product={product} 
           onBuyClick={onProductBuyClick}
           onProductSelect={onProductSelect}
         />
       </div>
     ))}
   </div>
  </div>
 </section>
);
const CategoriesSection = ({ onCategorySelect }) => {
 const [searchTerm, setSearchTerm] = useState("");
 const filteredCategories = useMemo(() => 
   productData.categories.filter(category => 
     category.name.toLowerCase().includes(searchTerm.toLowerCase())
   ), [searchTerm]
 );

 return (
  <section id="categories" className="py-24" style={{background: 'radial-gradient(ellipse at center, var(--bg-primary) 0%, var(--bg-secondary) 100%)'}}>
   <div className="container mx-auto px-4">
     <h2 className="section-heading-3d">Explore Our Universe</h2>
     <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-12">
        Click any category to explore the full list of products available in our bundle.
      </p>
     <div className="mb-16 max-w-lg mx-auto relative">
         <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary z-10" />
         <input 
           type="text" 
           placeholder="Search categories (e.g., Trading, Development...)" 
           value={searchTerm} 
           onChange={(e) => setSearchTerm(e.target.value)} 
           className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-solid transition-all duration-300 focus:border-accent-secondary focus:shadow-lg bg-card-background border-border-color text-text-primary backdrop-blur-sm"
         />
       </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{perspective: '2000px'}}>
       {filteredCategories.map((category, index) => (
          <button 
            key={category.name} 
            onClick={() => onCategorySelect(category)} 
            className="glass-card h-80 p-0 overflow-hidden"
            style={{animation: `fadeInUp3D 1s ${index * 0.1}s both`}}
          >
            <img src={category.categoryImage} alt={category.name} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)', transform: 'translateZ(20px)'}}>
                   <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white text-left" style={{transform: 'translateZ(15px)'}}>{category.name}</h3>
                <p className="text-left text-gray-300" style={{transform: 'translateZ(10px)'}}>{category.products.length} Courses</p>
            </div>
         </button>
       ))}
       {filteredCategories.length === 0 && <p className="col-span-full text-center text-text-tertiary">No categories found.</p>}
     </div>
   </div>
  </section>
 );
};

const CategoryPage = ({ category, onBack, onWhatsAppClick, onProductBuyClick, onProductSelect }) => (
 <div className="category-page-container fade-in-up bg-bg-primary min-h-screen pt-32">
  <div className="container mx-auto px-4 py-12">
   <Button onClick={onBack} variant="outline" className="mb-12">
     <ArrowLeft className="mr-2 w-4 h-4" /> Back to Categories
   </Button>
   <div className="text-center mb-16">
     <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full" style={{background: 'linear-gradient(145deg, #6B46C1, #0F4C75)'}}>
        <category.icon className="w-12 h-12 text-white" />
     </div>
     <h1 className="text-5xl font-extrabold text-text-primary tracking-tight">{category.name}</h1>
     <p className="text-xl text-text-secondary mt-4 max-w-3xl mx-auto">{category.description}</p>
   </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{perspective: '1000px'}}>
     {category.products.map((product, index) => (
        <div key={product.name} style={{animation: `fadeInUp3D 1s ${index * 0.1}s both`}}>
         <ProductCard 
           product={product} 
           onBuyClick={onProductBuyClick}
           onProductSelect={onProductSelect}
         />
       </div>
     ))}
   </div>
     <div className="text-center mt-24 p-10 rounded-3xl glass-card">
     <p className="text-3xl font-bold text-text-primary mb-4">...Or Get ALL Products for Just ₹99!</p>
     <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">Why buy one? Get all these, plus 200+ more from every category, in the full bundle.</p>
     <Button onClick={onWhatsAppClick} size="lg" className="text-black font-bold uppercase tracking-wider text-lg px-10 py-4 rounded-full transition-all duration-300"
           style={{
               background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 100%)',
               boxShadow: '0 15px 40px rgba(255,176,0,0.4)',
           }}>
       Get the Full Bundle for ₹99 <MessageCircle className="ml-2 w-5 h-5" />
     </Button>
   </div>
  </div>
 </div>
);

// --- *** NEW FLIPKART-STYLE PRODUCT DETAIL PAGE COMPONENT ---
const ProductDetailPage = ({ product, onBack, onBuyClick }) => {
    const discount = calculateDiscount(product.price, product.salePrice);
    
    return (
        <div className="product-page-container fade-in-up bg-bg-primary min-h-screen pt-32">
            <div className="container mx-auto px-4 py-8">
                <Button onClick={onBack} variant="outline" className="mb-4">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                
                {/* Breadcrumbs */}
                <nav className="text-sm text-text-tertiary mb-4">
                    Home &gt; Courses &gt; {product.name}
                </nav>

                <div className="lg:flex gap-8">
                    {/* Left Section: Image */}
                    <div className="lg:w-2/5 mb-8 lg:mb-0">
                        <div className="sticky top-28">
                             <div className="relative rounded-2xl border border-border-color overflow-hidden shadow-lg" style={{boxShadow: '0 10px 30px var(--shadow-color)'}}>
                                <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-danger-color text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
                                        {discount}% OFF
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Details */}
                    <div className="lg:w-3/5">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                {product.rating} <Star className="w-3 h-3 ml-1"/>
                            </div>
                            <span className="text-text-tertiary text-sm">(2,543 Ratings & 189 Reviews)</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-600 font-semibold">Special price</span>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-4xl font-extrabold text-text-primary">₹{product.salePrice}</span>
                                <span className="text-xl text-text-tertiary line-through">₹{product.price}</span>
                                {discount > 0 && <span className="text-xl font-bold text-green-600">{discount}% off</span>}
                            </div>
                        </div>

                        <div className="my-6">
                            <h3 className="font-semibold text-text-primary mb-2">Available offers</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center"><Tag className="inline w-4 h-4 mr-2 text-green-600" /><b>Bank Offer</b> 5% cashback on HDFC Credit Card up to ₹100</div>
                                <div className="flex items-center"><Tag className="inline w-4 h-4 mr-2 text-green-600" /><b>Bank Offer</b> 10% instant discount on SBI Debit Card up to ₹200</div>
                                <div className="flex items-center"><Tag className="inline w-4 h-4 mr-2 text-green-600" /><b>Special Price</b> Get extra ₹300 off (price inclusive of cashback/coupon)</div>
                            </div>
                        </div>

                        <div className="flex gap-4 my-8">
                            <button onClick={() => onBuyClick(product.name, product.salePrice)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2">
                                <ShoppingCart className="w-6 h-6" /> ENROLL NOW
                            </button>
                             <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg">ADD TO CART</button>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-border-color bg-bg-secondary">
                            <h3 className="font-semibold text-text-primary mb-2">Highlights</h3>
                            <ul className="list-disc list-inside text-text-secondary space-y-1">
                                <li>40+ Hours Content | Certificate Included</li>
                                <li>Lifetime Access with Updates</li>
                                <li>AI Tools & Practical Projects</li>
                                <li>24/7 Community Support</li>
                                <li>Industry Expert Instruction</li>
                            </ul>
                        </div>
                        
                        <div className="mt-8 p-4 rounded-lg border border-border-color bg-bg-secondary">
                             <h3 className="font-semibold text-text-primary mb-2">Course Description</h3>
                             <p className="text-text-secondary leading-relaxed">{product.description}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
function App() {
  const [theme, setTheme] = useState('dark'); // Default to dark
  const [showModal, setShowModal] = useState(false);
  const [pageHistory, setPageHistory] = useState([{ page: 'home', data: null }]);
  const currentPage = pageHistory[pageHistory.length - 1];
  const whatsappNumber = "918121847808";
  const bundleWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("I'm interested in the DigiDen bundle for 99 INR")}`;

  const featuredProducts = useMemo(() => {
    return productData.categories.slice(0, 4).map(category => category.products[0]);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('digiden-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const modalTimer = setTimeout(() => setShowModal(true), 15000);
    return () => clearTimeout(modalTimer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('digiden-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleBundleBuyClick = () => window.open(bundleWhatsappLink, '_blank');

  const handleProductBuyClick = (productName, productPrice) => {
    const productText = `Hi, I'm interested in buying this product: ${productName} for ₹${productPrice}`;
    const productWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(productText)}`;
    window.open(productWhatsappLink, '_blank');
  };

  const scrollToSection = (sectionId) => {
    if (currentPage.page !== 'home') {
      setPageHistory([{ page: 'home', data: null }]);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
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

  const renderPage = () => {
    switch (currentPage.page) {
      case 'home':
        return (
          <main>
            <HeroSection onWhatsAppClick={handleBundleBuyClick} scrollToSection={scrollToSection} />
            <CategoriesSection onCategorySelect={handleCategorySelect} />
            <FeaturedProductsSection 
              products={featuredProducts} 
              onProductBuyClick={handleProductBuyClick} 
              onProductSelect={handleProductSelect}
            />
             <section id="pricing" className="py-24 bg-bg-secondary">
               <div className="container mx-auto px-4">
                 <h2 className="section-heading-3d">Get 200+ Digital Products for Just ₹99!</h2>
                 <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-16">Individual asset packs can cost ₹1000s. Get our entire curated library for a single, tiny payment.</p>
                 <div className="max-w-md mx-auto">
                   <div className="glass-card p-8">
                       <div className="text-center mb-8">
                         <div className="text-7xl font-bold" style={{color: 'var(--accent-secondary)', animation: 'textFloat3D 4s ease-in-out infinite'}}>₹99</div>
                         <div className="text-text-tertiary line-through text-xl">₹20,000+ Value</div>
                         <div className="text-success-color font-semibold text-lg">Save Over 99%!</div>
                       </div>
                       <div className="space-y-4 mb-8 text-text-primary">
                         {["200+ Premium Digital Products", "15+ Categories Included", "Instant Downloadable Content", "Lifetime Access & Free Updates", "No Time Limits, No Hidden Fees", "One-time Secure Payment"].map(item => (
                           <div key={item} className="flex items-center">
                             <CheckCircle className="w-5 h-5 text-success-color mr-3" /><span>{item}</span>
                           </div>
                         ))}
                       </div>
                       <Button onClick={handleBundleBuyClick} size="lg" className="w-full text-black font-bold uppercase tracking-wider text-lg py-4 rounded-full transition-all duration-300"
                           style={{
                               background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 100%)',
                               boxShadow: '0 15px 40px rgba(255,176,0,0.4)',
                           }}>
                         Buy Bundle Now for ₹99 <MessageCircle className="ml-2 w-5 h-5" />
                       </Button>
                       <div className="text-center mt-4">
                         <div className="flex items-center justify-center space-x-2 text-sm text-text-tertiary">
                           <Shield className="w-4 h-4" /><span>Secure Payment via WhatsApp</span>
                         </div>
                       </div>
                   </div>
                 </div>
               </div>
             </section>
             <section id="reviews" className="py-24 bg-bg-primary">
               <div className="container mx-auto px-4">
                 <h2 className="section-heading-3d">Loved by Creatives & Entrepreneurs</h2>
                 <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-16">Join thousands of satisfied customers who have supercharged their projects with DigiDen.</p>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {testimonials.map((testimonial, index) => (
                     <div key={testimonial.name} className="glass-card p-6" style={{animation: `fadeInUp3D 1s ${index * 0.15}s both`}}>
                         <div className="flex items-center mb-4">
                           <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-accent-secondary" />
                           <div>
                             <h4 className="font-semibold text-text-primary text-lg">{testimonial.name}</h4>
                             <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent-secondary" />)}</div>
                           </div>
                         </div>
                         <p className="text-text-secondary italic">"{testimonial.text}"</p>
                     </div>
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
    <div className="min-h-screen font-sans bg-bg-primary">
      <GlobalStyles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Header onWhatsAppClick={handleBundleBuyClick} scrollToSection={scrollToSection} />

      {renderPage()}

      <footer className="py-20" style={{background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)'}}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
             <span 
                 className="text-4xl font-black tracking-wider"
                 style={{
                     fontFamily: "'Poppins', sans-serif",
                     background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 100%)',
                     WebkitBackgroundClip: 'text',
                     backgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                 }}
               >
                 DigiDen
             </span>
          </div>
          <p className="max-w-md mx-auto text-text-secondary mb-8">Your gateway to unlimited creativity with 200+ premium digital products.</p>
          <div className="flex justify-center space-x-6 mb-10">
            <button onClick={() => scrollToSection('categories')} className="text-text-secondary hover:text-accent-secondary transition-colors font-semibold">Categories</button>
            <button onClick={() => scrollToSection('featured')} className="text-text-secondary hover:text-accent-secondary transition-colors font-semibold">Featured</button>
            <button onClick={() => scrollToSection('pricing')} className="text-text-secondary hover:text-accent-secondary transition-colors font-semibold">Pricing</button>
            <button onClick={() => scrollToSection('reviews')} className="text-text-secondary hover:text-accent-secondary transition-colors font-semibold">Reviews</button>
          </div>
          <div className="border-t border-border-color pt-8 mt-8">
            <p className="text-text-tertiary">© 2025 DigiDen. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-md mx-4 p-8 relative fade-in-up">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary"><X className="w-6 h-6" /></button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500" style={{background: 'rgba(5, 150, 105, 0.2)'}}><Heart className="w-8 h-8 text-emerald-400" /></div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Don't Miss This!</h3>
              <p className="text-text-secondary mb-6">Get the complete DigiDen bundle of 200+ products for just ₹99. This is a limited-time launch offer!</p>
              <Button onClick={() => { setShowModal(false); handleBundleBuyClick(); }} className="w-full text-black font-bold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 100%)',
                  boxShadow: '0 15px 40px rgba(255,176,0,0.4)',
                }}>
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

