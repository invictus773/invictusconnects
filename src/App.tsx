/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Phone, 
  MessageSquare,
  Menu,
  X,
  BarChart3,
  Target,
  Zap,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

// --- Animation Variants ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// --- Components ---

const CTASection = ({ title, subtitle, buttonText, href = "#contact", variant = "gold" }: { title: string, subtitle: string, buttonText: string, href?: string, variant?: "gold" | "dark" }) => {
  return (
    <section className={`section-padding ${variant === 'gold' ? 'bg-gold' : 'bg-zinc-900'} overflow-hidden relative`}>
      {variant === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </>
      )}
      <motion.div 
        {...fadeIn}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10"
      >
        <div className="text-center md:text-left max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight leading-[1.1]">
            {title}
          </h2>
          <p className={`text-lg md:text-xl ${variant === 'gold' ? 'text-white/90' : 'text-zinc-400'} font-light leading-relaxed`}>
            {subtitle}
          </p>
        </div>
        <motion.a
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          href={href}
          className={`px-12 py-6 rounded-full font-bold text-xl transition-all whitespace-nowrap ${
            variant === 'gold' 
              ? 'bg-white text-gold hover:bg-zinc-50 shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
              : 'bg-gold text-white hover:bg-gold-dark shadow-[0_20px_50px_rgba(212,175,55,0.3)]'
          }`}
        >
          {buttonText}
        </motion.a>
      </motion.div>
    </section>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Get Strategy', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/70 backdrop-blur-xl py-4 border-b border-zinc-200/50 shadow-[0_2px_20px_rgba(0,0,0,0.02)]' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-gold text-2xl shadow-lg group-hover:shadow-gold/20 transition-all duration-300">I</div>
          <span className="text-xl font-display font-bold tracking-tight text-zinc-900 uppercase">
            INVICTUS <span className="text-gold group-hover:text-gold-dark transition-colors">CONNECTS</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-semibold text-zinc-500 hover:text-gold transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#contact" 
            className="px-7 py-3 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-gold hover:text-white transition-all shadow-xl hover:shadow-gold/20"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-zinc-600 hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="w-full py-3 bg-gold text-white rounded-xl text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" 
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-2.5 rounded-full bg-zinc-50 border border-zinc-100 text-gold-dark text-xs font-bold uppercase tracking-[0.3em] mb-10 shadow-sm"
          >
            Influencer Marketing Agency
          </motion.span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.9] mb-12 text-zinc-900 tracking-tighter">
            We turn creators into <br />
            <span className="gold-text-gradient italic">growth engines.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-500 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            Scale your brand with high-impact influencer campaigns. We bridge the gap between visionary brands and top-tier digital creators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="w-full sm:w-auto px-12 py-6 bg-zinc-900 text-white rounded-full font-bold text-xl hover:bg-gold transition-all flex items-center justify-center gap-3 shadow-2xl shadow-zinc-900/20"
            >
              Get Started <ArrowRight size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ backgroundColor: 'rgba(244, 244, 245, 1)', y: -5 }}
              whileTap={{ scale: 0.98 }}
              href="#work" 
              className="w-full sm:w-auto px-12 py-6 bg-transparent border border-zinc-200 text-zinc-900 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-zinc-100"
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">Scroll</span>
        <motion.div 
          animate={{ height: [48, 24, 48], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px bg-gradient-to-b from-gold to-transparent" 
        />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-zinc-900 tracking-tight">
              Empowering Brands Through <span className="gold-text-gradient">Authentic</span> Connections
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed mb-10 font-light">
              Invictus Connects is a premier influencer marketing agency dedicated to bridging the gap between innovative brands and top-tier digital creators. We focus on building authentic partnerships that resonate with audiences and drive measurable business growth.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                <h4 className="text-4xl font-bold text-gold mb-2 tracking-tight">20+</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.2em]">Active Creators</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                <h4 className="text-4xl font-bold text-gold mb-2 tracking-tight">1M+</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.2em]">Total Reach</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-zinc-200 shadow-2xl relative z-10">
              <img 
                src="https://picsum.photos/seed/agency/800/800" 
                alt="Agency Team" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-10 max-w-[320px] z-20">
              <p className="text-lg font-light italic text-zinc-600 leading-relaxed">
                "We don't just connect brands with creators; we craft digital legacies through the art of authentic influence."
              </p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "YouTube Promotions",
      description: "Dedicated videos and seamless integrations that capture attention and drive deep engagement through long-form content.",
      icon: <Youtube className="text-gold" size={32} />
    },
    {
      title: "Instagram Campaigns",
      description: "High-impact Reels and Posts designed for virality and aesthetic brand placement in lifestyle and tech niches.",
      icon: <Instagram className="text-gold" size={32} />
    },
    {
      title: "Campaign Management",
      description: "End-to-end management from creator selection to content approval and performance tracking.",
      icon: <TrendingUp className="text-gold" size={32} />
    },
    {
      title: "Brand Growth Strategy",
      description: "Data-driven strategies tailored to your brand's unique goals, ensuring maximum ROI and audience alignment.",
      icon: <BarChart3 className="text-gold" size={32} />
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          {...fadeIn}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-zinc-900 tracking-tight">Our Specialized Services</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">We offer comprehensive influencer marketing solutions designed to scale your brand presence across major digital platforms.</p>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="glass-card p-12 group hover:-translate-y-3"
            >
              <div className="mb-10 w-20 h-20 rounded-3xl bg-gold/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-700">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold mb-5 text-zinc-900 tracking-tight leading-tight">{service.title}</h3>
              <p className="text-zinc-500 text-lg leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    "Exclusive Network of 20+ Creators",
    "High Engagement Audience Targeting",
    "Cost-Effective & Scalable Campaigns",
    "Data-Driven Performance Analytics",
    "Focus on Real Business Conversions"
  ];

  return (
    <section className="section-padding bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 text-zinc-900 tracking-tight">Why Brands Trust <br /><span className="gold-text-gradient">Invictus Connects</span></h2>
            <div className="space-y-6">
              {reasons.map((reason, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-gold" />
                  </div>
                  <span className="text-xl text-zinc-700 font-light">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            <motion.div variants={staggerItem} className="space-y-8 pt-16">
              <div className="glass-card p-10 text-center hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center mx-auto mb-8">
                  <Target className="text-gold" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-zinc-900 tracking-tight">Targeted</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.3em]">Niche Audiences</p>
              </div>
              <div className="glass-card p-10 text-center hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center mx-auto mb-8">
                  <Zap className="text-gold" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-zinc-900 tracking-tight">Fast</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.3em]">Quick Turnaround</p>
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="space-y-8">
              <div className="glass-card p-10 text-center hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center mx-auto mb-8">
                  <Users className="text-gold" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-zinc-900 tracking-tight">Authentic</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.3em]">Creator Stories</p>
              </div>
              <div className="glass-card p-10 text-center hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center mx-auto mb-8">
                  <TrendingUp className="text-gold" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-zinc-900 tracking-tight">ROI Focused</h4>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.3em]">Driven by Results</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const cases = [
    {
      brand: "AI SaaS Platform",
      creators: "3 AI & Tech YouTubers (50K - 100K subs)",
      action: "Dedicated video integrations + pinned comments",
      results: [
        { label: "Views", value: "120K+" },
        { label: "Signups", value: "2.3x Increase" },
        { label: "CTR", value: "4.8%" }
      ],
      image: "https://picsum.photos/seed/tech/600/400"
    },
    {
      brand: "FinTech App",
      creators: "5 Finance Instagrammers (20K - 80K followers)",
      action: "Educational Reels series + Story link-outs",
      results: [
        { label: "Reach", value: "450K+" },
        { label: "Installs", value: "12K+" },
        { label: "CPA", value: "-30% vs Ads" }
      ],
      image: "https://picsum.photos/seed/finance/600/400"
    },
    {
      brand: "Lifestyle D2C Brand",
      creators: "10 Nano Influencers (5K - 15K followers)",
      action: "Product unboxing + authentic review campaign",
      results: [
        { label: "Impressions", value: "85K+" },
        { label: "Sales", value: "500+ Units" },
        { label: "UGC Pieces", value: "25+" }
      ],
      image: "https://picsum.photos/seed/lifestyle/600/400"
    }
  ];

  return (
    <section id="work" className="section-padding bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          {...fadeIn}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-zinc-900 tracking-tight">Our Success Stories</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">Real results from our creator-driven campaigns. We focus on metrics that move the needle for your business.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-10"
        >
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="glass-card overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.brand} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <ArrowUpRight size={28} />
                </div>
              </div>
              <div className="p-12">
                <div className="mb-10">
                  <h3 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">{item.brand}</h3>
                  <p className="text-xs text-gold font-bold uppercase tracking-[0.3em] mb-8">{item.creators}</p>
                  <p className="text-zinc-500 text-lg leading-relaxed font-light">{item.action}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-8 pt-10 border-t border-zinc-50">
                  {item.results.map((res, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl font-bold text-zinc-900 mb-2">{res.value}</p>
                      <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-[0.3em]">{res.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Strategy First",
      desc: "We analyze your brand goals and target audience to build a custom roadmap.",
      icon: "01"
    },
    {
      title: "Creator Matching",
      desc: "We hand-pick the best creators from our network that align with your niche.",
      icon: "02"
    },
    {
      title: "Content Launch",
      desc: "Our creators produce high-quality, authentic content that drives action.",
      icon: "03"
    },
    {
      title: "Scale & Optimize",
      desc: "We track every metric and optimize for maximum ROI and brand growth.",
      icon: "04"
    }
  ];

  return (
    <section id="process" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-zinc-900 tracking-tight">How It Works</h2>
          <p className="text-zinc-500 text-lg font-light">A streamlined process designed for speed and performance.</p>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative"
        >
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-zinc-100 z-0" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="relative z-10 text-center group"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-white border border-zinc-100 flex items-center justify-center mx-auto mb-8 text-3xl font-bold text-gold shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900 tracking-tight">{step.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much does influencer marketing cost?",
      answer: "Costs vary based on the creator's reach, engagement rate, and the type of content (dedicated vs. integration). We work with budgets ranging from $1,000 to $50,000+ and ensure you get the best ROI by matching you with the right creators for your budget."
    },
    {
      question: "What creators do you work with?",
      answer: "We have an exclusive network of 20+ verified creators across YouTube and Instagram, specializing in niches like AI, Tech, Finance, Lifestyle, and Fashion. Our creators have audiences ranging from 10K to 100K+ followers with high engagement rates."
    },
    {
      question: "How long does a campaign take?",
      answer: "A typical campaign takes 2-4 weeks from initial strategy to content live date. This includes creator selection, product shipping (if applicable), content creation, and brand approval."
    },
    {
      question: "Do you guarantee results?",
      answer: "While we can't guarantee specific sales numbers (as that depends on your product and offer), we do guarantee high-quality content, targeted reach, and transparent reporting. Our data-driven approach is designed to maximize the probability of a high-ROI campaign."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-zinc-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-zinc-500 text-lg font-light">Everything you need to know about working with Invictus Connects.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              variants={staggerItem}
              className="glass-card overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-12 py-10 flex items-center justify-between text-left hover:bg-zinc-50/50 transition-colors"
              >
                <span className="text-2xl font-bold text-zinc-900 tracking-tight">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gold w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-12 pb-10 text-zinc-500 text-xl font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ brandName: '', email: '', budget: '', goal: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormState({ brandName: '', email: '', budget: '', goal: '' });
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 text-zinc-900 tracking-tight">Get Your Free <br /><span className="gold-text-gradient">Influencer Strategy</span></h2>
            <p className="text-xl text-zinc-500 mb-12 font-light leading-relaxed">
              Ready to scale your brand? Fill out the form to receive a personalized influencer marketing strategy tailored to your goals and budget.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center text-gold shadow-sm">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.2em] mb-1">Email Us</p>
                  <p className="text-xl font-bold text-zinc-900">invictusconnects@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center text-gold shadow-sm">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.2em] mb-1">Call Us</p>
                  <p className="text-xl font-bold text-zinc-900">+91 9369069887</p>
                </div>
              </div>
              <div className="pt-10">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/919369069887" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-[#25D366] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-lg shadow-green-500/20"
                >
                  <MessageSquare size={24} /> Chat on WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-24">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-28 h-28 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-8"
                >
                  <CheckCircle2 size={56} />
                </motion.div>
                <h3 className="text-4xl font-bold text-zinc-900 tracking-tight">Strategy Requested!</h3>
                <p className="text-zinc-500 text-xl font-light max-w-md mx-auto">Thank you for your interest. Our team will analyze your brand and get back to you with a custom strategy within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">Brand Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.brandName}
                      onChange={(e) => setFormState({...formState, brandName: e.target.value})}
                      placeholder="Your Brand" 
                      className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-8 py-6 focus:outline-none focus:border-gold transition-all text-zinc-900 font-light text-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-8 py-6 focus:outline-none focus:border-gold transition-all text-zinc-900 font-light text-lg"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">Monthly Budget</label>
                  <div className="relative">
                    <select 
                      required
                      value={formState.budget}
                      onChange={(e) => setFormState({...formState, budget: e.target.value})}
                      className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-8 py-6 focus:outline-none focus:border-gold transition-all text-zinc-900 appearance-none font-light text-lg"
                    >
                      <option value="" disabled>Select Budget Range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-plus">$10,000+</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={24} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">What is your primary goal?</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formState.goal}
                    onChange={(e) => setFormState({...formState, goal: e.target.value})}
                    placeholder="e.g. Increase sales, brand awareness, app installs..." 
                    className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-8 py-6 focus:outline-none focus:border-gold transition-all resize-none text-zinc-900 font-light text-lg"
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-7 bg-zinc-900 text-white rounded-2xl font-bold text-2xl hover:bg-gold transition-all shadow-2xl shadow-zinc-900/20"
                >
                  Get Free Strategy
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FloatingCreatorButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 right-8 z-[60]"
    >
      <motion.a
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        href="https://forms.gle/Qoak7FV5PSPcB5AC7"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 px-8 py-5 bg-zinc-900 text-white rounded-full font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-zinc-800 hover:border-gold/50 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="w-11 h-11 bg-gold rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300 relative z-10">
          <Users size={22} />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-gold rounded-full -z-10 opacity-50"
          />
        </div>
        <span className="hidden sm:inline text-lg tracking-tight relative z-10">Join as a Creator</span>
        <span className="sm:hidden font-bold relative z-10">Join</span>
      </motion.a>
    </motion.div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-zinc-100 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-gold text-2xl">I</div>
              <span className="text-2xl font-display font-bold tracking-tight uppercase text-zinc-900">
                INVICTUS <span className="text-gold">CONNECTS</span>
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm text-lg font-light leading-relaxed mb-8">
              The premium bridge between visionary brands and world-class digital creators. Driving growth through authentic storytelling and data-driven influencer strategies.
            </p>
            <div className="flex gap-5">
              {[
                { icon: Youtube, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: MessageSquare, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, color: '#D4AF37' }}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 transition-colors hover:border-gold/30"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-zinc-900 mb-8 text-lg uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Work', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-zinc-500 hover:text-gold transition-colors font-light text-lg block">
                    {item === 'Work' ? 'Our Work' : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-zinc-900 mb-8 text-lg uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-gold transition-colors font-light text-lg block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 font-light text-sm">
            © {currentYear} Invictus Connects. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-light">
            <span>Crafted with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gold"
            >
              ♥
            </motion.div>
            <span>for the creator economy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-white text-zinc-900 selection:bg-gold selection:text-white">
      <Navbar />
      <FloatingCreatorButton />
      <main>
        <Hero />
        <About />
        <CTASection 
          title="Ready to scale your brand?" 
          subtitle="Let's build a strategy that actually works." 
          buttonText="Book a Free Consultation" 
          variant="gold"
        />
        <Services />
        <CTASection 
          title="Want to see our network?" 
          subtitle="Access our exclusive list of high-engagement creators." 
          buttonText="Get Creator List" 
          variant="dark"
        />
        <WhyChooseUs />
        <CTASection 
          title="Launch your first campaign" 
          subtitle="Start driving real results with creator-led marketing." 
          buttonText="Start Your Campaign" 
          variant="gold"
        />
        <CaseStudies />
        <HowItWorks />
        <CTASection 
          title="Still have questions?" 
          subtitle="Talk to our experts and get a personalized plan." 
          buttonText="Book a Free Consultation" 
          variant="dark"
        />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
