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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90vw] md:w-auto md:max-w-[90vw] transition-all duration-500"
        style={{
            background: 'var(--card-background)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: '2px solid var(--border-color)',
            borderRadius: '35px',
            boxShadow: "0 25px 50px var(--shadow-color), 0 0 0 1px var(--border-color), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
    >
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center space-x-3 cursor-pointer group">
                    <span className="text-xl md:text-2xl font-black tracking-wider"
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
                <button onClick={onWhatsAppClick} className="font-semibold rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-white"
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
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center text-center"
        style={{ background: 'radial-gradient(ellipse at center, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
      >
        <div className="relative z-10 p-4 pt-24 md:pt-4 fade-in-up">
            <h1 className="hero-title-3d mb-6">Digiden: The Future of Learning</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-text-secondary" style={{textShadow: '0 5px 20px var(--shadow-color)'}}>
              Premium AI-Powered Digital Courses & Transformative Learning Experiences
            </p>
            <button onClick={() => scrollToSection('categories')} className="text-black font-bold uppercase tracking-wider text-base md:text-lg px-8 py-4 md:px-12 md:py-5 rounded-full transition-all duration-400 transform-style-preserve-3d"
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
                <div className="relative h-48 md:h-64 overflow-hidden border-b-2" style={{borderColor: 'var(--accent-secondary)'}}>
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
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-3 h-20 md:h-14 overflow-hidden" style={{fontFamily: "'Playfair Display', serif"}}>{name}</h4>
              </button>
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-accent-secondary">
                      <Star className="w-5 h-5" />
                      <span className="ml-2 font-semibold text-lg text-text-secondary">{rating}</span>
                  </div>
                  <div className="text-right">
                      <span className="text-xl md:text-2xl font-bold" style={{color: 'var(--accent-primary)'}}>₹{salePrice}</span>
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
 <section id="featured" className="py-16 md:py-24" style={{background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'}}>
  <div className="container mx-auto px-4">
   <h2 className="section-heading-3d">Featured Products</h2>
     <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-12 md:mb-16">
       A sneak peek at the high-value assets inside the bundle. Click any product for details.
     </p>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8" style={{perspective: '1500px'}}>
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
  <section id="categories" className="py-16 md:py-24" style={{background: 'radial-gradient(ellipse at center, var(--bg-primary) 0%, var(--bg-secondary) 100%)'}}>
   <div className="container mx-auto px-4">
     <h2 className="section-heading-3d">Explore Our Universe</h2>
     <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-12">
       Click any category to explore the full list of products available in our bundle.
     </p>
     <div className="mb-12 md:mb-16 max-w-lg mx-auto relative">
         <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary z-10" />
         <input 
           type="text" 
           placeholder="Search categories (e.g., Trading, Development...)" 
           value={searchTerm} 
           onChange={(e) => setSearchTerm(e.target.value)} 
           className="w-full pl-14 pr-6 py-3 md:py-4 rounded-full border-2 border-solid transition-all duration-300 focus:border-accent-secondary focus:shadow-lg bg-card-background border-border-color text-text-primary backdrop-blur-sm"
         />
       </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" style={{perspective: '2000px'}}>
       {filteredCategories.map((category, index) => (
         <button 
           key={category.name} 
           onClick={() => onCategorySelect(category)} 
           className="glass-card h-64 md:h-80 p-0 overflow-hidden"
           style={{animation: `fadeInUp3D 1s ${index * 0.1}s both`}}
         >
           <img src={category.categoryImage} alt={category.name} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
           <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
               <div className="w-12 h-12 md:w-16 md:h-16 mb-4 flex items-center justify-center rounded-full" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)', transform: 'translateZ(20px)'}}>
                  <category.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
               </div>
               <h3 className="text-xl md:text-2xl font-bold text-white text-left" style={{transform: 'translateZ(15px)'}}>{category.name}</h3>
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
 <div className="category-page-container fade-in-up bg-bg-primary min-h-screen pt-28 md:pt-32">
  <div className="container mx-auto px-4 py-8 md:py-12">
   <Button onClick={onBack} variant="outline" className="mb-8 md:mb-12">
     <ArrowLeft className="mr-2 w-4 h-4" /> Back to Categories
   </Button>
   <div className="text-center mb-12 md:mb-16">
     <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center rounded-full" style={{background: 'linear-gradient(145deg, #6B46C1, #0F4C75)'}}>
       <category.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
     </div>
     <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight">{category.name}</h1>
     <p className="text-lg md:text-xl text-text-secondary mt-4 max-w-3xl mx-auto">{category.description}</p>
   </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8" style={{perspective: '1000px'}}>
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
     <div className="text-center mt-16 md:mt-24 p-6 md:p-10 rounded-3xl glass-card">
     <p className="text-2xl md:text-3xl font-bold text-text-primary mb-4">...Or Get ALL Products for Just ₹99!</p>
     <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">Why buy one? Get all these, plus 200+ more from every category, in the full bundle.</p>
     <Button onClick={onWhatsAppClick} size="lg" className="text-black font-bold uppercase tracking-wider text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300"
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
        <div className="product-page-container fade-in-up bg-bg-primary min-h-screen pt-28 md:pt-32">
            <div className="container mx-auto px-4 py-4 md:py-8">
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
                        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                {product.rating} <Star className="w-3 h-3 ml-1"/>
                            </div>
                            <span className="text-text-tertiary text-sm">(2,543 Ratings & 189 Reviews)</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-green-600 font-semibold">Special price</span>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-3xl md:text-4xl font-extrabold text-text-primary">₹{product.salePrice}</span>
                                <span className="text-lg md:text-xl text-text-tertiary line-through">₹{product.price}</span>
                                {discount > 0 && <span className="text-lg md:text-xl font-bold text-green-600">{discount}% off</span>}
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

                        <div className="flex flex-col sm:flex-row gap-4 my-8">
                            <button onClick={() => onBuyClick(product.name, product.salePrice)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 md:py-4 px-6 rounded-lg text-base md:text-lg flex items-center justify-center gap-2">
                                <ShoppingCart className="w-6 h-6" /> ENROLL NOW
                            </button>
                             <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 md:py-4 px-6 rounded-lg text-base md:text-lg">ADD TO CART</button>
                        </div>
                        
                        <div className="p-4 md:p-6 rounded-lg border border-border-color bg-bg-secondary">
                            <h3 className="font-semibold text-text-primary mb-2">Highlights</h3>
                            <ul className="list-disc list-inside text-text-secondary space-y-1">
                                <li>40+ Hours Content | Certificate Included</li>
                                <li>Lifetime Access with Updates</li>
                                <li>AI Tools & Practical Projects</li>
                                <li>24/7 Community Support</li>
                                <li>Industry Expert Instruction</li>
                            </ul>
                        </div>
                        
                        <div className="mt-8 p-4 md:p-6 rounded-lg border border-border-color bg-bg-secondary">
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
             <section id="pricing" className="py-16 md:py-24 bg-bg-secondary">
               <div className="container mx-auto px-4">
                 <h2 className="section-heading-3d">Get 200+ Digital Products for Just ₹99!</h2>
                 <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-12 md:mb-16">Individual asset packs can cost ₹1000s. Get our entire curated library for a single, tiny payment.</p>
                 <div className="max-w-md mx-auto">
                   <div className="glass-card p-6 md:p-8">
                       <div className="text-center mb-8">
                         <div className="text-6xl md:text-7xl font-bold" style={{color: 'var(--accent-secondary)', animation: 'textFloat3D 4s ease-in-out infinite'}}>₹99</div>
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
                       <Button onClick={handleBundleBuyClick} size="lg" className="w-full text-black font-bold uppercase tracking-wider text-base md:text-lg py-3 md:py-4 rounded-full transition-all duration-300"
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
             <section id="reviews" className="py-16 md:py-24 bg-bg-primary">
               <div className="container mx-auto px-4">
                 <h2 className="section-heading-3d">Loved by Creatives & Entrepreneurs</h2>
                 <p className="text-center text-lg text-text-secondary max-w-3xl mx-auto mb-12 md:mb-16">Join thousands of satisfied customers who have supercharged their projects with DigiDen.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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

      <footer className="py-16 md:py-20" style={{background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)'}}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
             <span 
                 className="text-3xl md:text-4xl font-black tracking-wider"
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
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
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card max-w-md w-full mx-auto p-6 md:p-8 relative fade-in-up">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary"><X className="w-6 h-6" /></button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500" style={{background: 'rgba(5, 150, 105, 0.2)'}}><Heart className="w-8 h-8 text-emerald-400" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">Don't Miss This!</h3>
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
