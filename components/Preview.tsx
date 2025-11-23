import React, { useState, useEffect } from 'react';
import { SchoolConfig, GeneratedContent, Testimonial } from '../types';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Calendar, User, ChevronRight, ChevronLeft, ArrowRight, Quote, ArrowUp } from 'lucide-react';

interface PreviewProps {
  config: SchoolConfig;
  content: GeneratedContent;
  onReset: () => void;
}

// Sub-component for individual testimonial cards
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = testimonial.quote.length > 120;
  
  return (
    <div className="h-full px-4 py-2">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col group">
        <Quote className="w-8 h-8 text-indigo-100 absolute top-6 left-6" />
        
        <div className="relative z-10 pt-6 flex-grow">
          <p className={`text-slate-600 italic leading-relaxed mb-4 ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''}`}>
            "{testimonial.quote}"
          </p>
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 mb-6 focus:outline-none"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
          {!shouldTruncate && <div className="mb-6"></div>}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <img 
            src={`https://picsum.photos/100/100?random=${index + 100}`} 
            alt={`${testimonial.name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50 shrink-0 bg-slate-200"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
            <p className="text-xs text-slate-500 uppercase">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Preview: React.FC<PreviewProps> = ({ config, content, onReset }) => {
  // Dynamic Styles for User Colors
  const primaryStyle = { backgroundColor: config.primaryColor, color: '#ffffff' };
  const primaryText = { color: config.primaryColor };
  const secondaryStyle = { backgroundColor: config.secondaryColor };
  const secondaryText = { color: config.secondaryColor };
  const primaryBorder = { borderColor: config.primaryColor };

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleSlides(3);
      else if (window.innerWidth >= 768) setVisibleSlides(2);
      else setVisibleSlides(1);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, content.testimonials.length - visibleSlides);
    setCurrentSlide(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, content.testimonials.length - visibleSlides);
    setCurrentSlide(prev => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, content.testimonials.length - visibleSlides);
    setCurrentSlide(Math.min(index, maxIndex));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col relative">
      {/* Editor Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-slate-900 text-white z-50 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm uppercase tracking-wider text-slate-400">EduCraft Preview Mode</span>
        </div>
        <button 
          onClick={onReset}
          className="bg-slate-700 hover:bg-slate-600 text-xs px-4 py-2 rounded transition-colors"
          aria-label="Start Over with new school configuration"
        >
          Start Over
        </button>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-14"></div>

      {/* SCHOOL SITE START */}
      
      {/* Top Bar */}
      <div className="bg-slate-100 py-2 border-b border-slate-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> (555) 123-4567</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> contact@{config.name.replace(/\s+/g, '').toLowerCase()}.edu</span>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900" aria-label="Visit our Facebook page"><Facebook className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900" aria-label="Visit our Twitter profile"><Twitter className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900" aria-label="Visit our Instagram profile"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-14 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-2xl" style={primaryStyle}>
              {config.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">{config.name}</h1>
              <p className="text-xs font-medium uppercase tracking-wider" style={secondaryText}>{config.moto}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700" role="navigation" aria-label="Main Navigation">
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#academics" className="hover:text-indigo-600 transition-colors">Academics</a>
            <a href="#events" className="hover:text-indigo-600 transition-colors">Events</a>
            <a href="#contact" style={primaryStyle} className="px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Apply Now
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden text-white" aria-label="Hero Section">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?blur=2" 
            alt="School Campus View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight max-w-4xl mx-auto">
            {content.heroHeadline}
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
            {content.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button style={primaryStyle} className="px-8 py-4 rounded text-lg font-semibold shadow-lg hover:transform hover:-translate-y-1 transition-all">
              Explore Programs
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white text-white px-8 py-4 rounded text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Mission & Principal */}
      <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded mb-4 bg-slate-100 text-slate-600">
                Our Philosophy
              </div>
              <h3 id="about-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
                Educating for the Future
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {content.missionStatement}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {content.aboutText}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {content.academicHighlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-slate-700 font-medium">
                     <span className="w-2 h-2 rounded-full" style={secondaryStyle}></span> {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full translate-x-4 translate-y-4 rounded-2xl" style={secondaryStyle}></div>
              <div className="relative bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://picsum.photos/100/100?random=1" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" alt={`Principal ${content.principalName}`} />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Principal's Welcome</h4>
                    <p className="text-sm text-slate-500">{content.principalName}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl opacity-20 font-serif" style={primaryText}>"</span>
                  <p className="text-slate-600 italic leading-relaxed pl-4 border-l-4" style={primaryBorder}>
                    {content.principalMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Info Bar */}
      <section id="academics" style={primaryStyle} className="py-16 text-white" aria-label="School Statistics">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-white/80 text-sm uppercase tracking-wide">College Acceptance</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">25:1</div>
            <div className="text-white/80 text-sm uppercase tracking-wide">Student-Teacher Ratio</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-white/80 text-sm uppercase tracking-wide">Extracurriculars</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">Top 10</div>
            <div className="text-white/80 text-sm uppercase tracking-wide">Regional Ranking</div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="events" className="py-20 bg-slate-50" aria-labelledby="events-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
               <h3 id="events-heading" className="text-3xl font-bold text-slate-900 font-serif mb-2">Campus Life</h3>
               <p className="text-slate-500">Stay updated with what is happening at {config.name}</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-bold hover:underline" style={primaryText}>
              View All Events <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.events.map((event, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group border border-slate-100">
                <div className="h-2 bg-gray-200" style={idx === 1 ? secondaryStyle : primaryStyle}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-100 rounded-lg text-slate-700 font-bold">
                      <span className="text-xs uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl">{new Date(event.date).getDate() || '12'}</span>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                      Event
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section className="py-20 bg-white" aria-labelledby="faculty-heading">
        <div className="container mx-auto px-4 text-center mb-12">
          <h3 id="faculty-heading" className="text-3xl font-bold text-slate-900 font-serif mb-4">Meet Our Faculty</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Our dedicated team of educators are passionate about inspiring the next generation.
          </p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.faculty.map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <img 
                  src={`https://picsum.photos/200/200?random=${idx + 10}`} 
                  alt={member.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
              <p className="text-sm font-medium uppercase tracking-wide mb-3" style={secondaryText}>{member.role}</p>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="py-20 bg-slate-50" aria-labelledby="testimonials-heading">
          <div className="container mx-auto px-4">
             <div className="text-center mb-12">
              <h3 id="testimonials-heading" className="text-3xl font-bold text-slate-900 font-serif mb-4">Student Voices</h3>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Hear what our community has to say about their experience.
              </p>
            </div>
            
            <div className="relative max-w-7xl mx-auto">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
                >
                  {content.testimonials.map((testimonial, idx) => (
                    <div 
                      key={idx} 
                      style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                      className="min-w-0"
                    >
                      <TestimonialCard testimonial={testimonial} index={idx} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-2 rounded-full shadow-lg text-slate-600 hover:text-indigo-600 focus:outline-none z-10 border border-slate-100 hidden md:block"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-2 rounded-full shadow-lg text-slate-600 hover:text-indigo-600 focus:outline-none z-10 border border-slate-100 hidden md:block"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.max(1, content.testimonials.length - visibleSlides + 1) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === idx ? 'bg-indigo-600' : 'bg-slate-300 hover:bg-indigo-400'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden" aria-label="Call to Action">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl -top-20 -left-20"></div>
           <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl -bottom-20 -right-20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Join the {config.name} Family</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Begin your journey towards excellence today. Schedule a visit or apply online.
          </p>
          <button style={secondaryStyle} className="text-slate-900 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:opacity-90 transition-opacity">
            Apply for Admission
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                 <span className="font-bold text-xl">{config.name}</span>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                {content.footerText}
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                  <Facebook className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile">
                  <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile">
                  <Instagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Quick Links</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Admissions</a></li>
                <li><a href="#" className="hover:text-indigo-400">Tuition & Fees</a></li>
                <li><a href="#" className="hover:text-indigo-400">Campus Map</a></li>
                <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Academics</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Curriculum</a></li>
                <li><a href="#" className="hover:text-indigo-400">Library</a></li>
                <li><a href="#" className="hover:text-indigo-400">Athletics</a></li>
                <li><a href="#" className="hover:text-indigo-400">Arts</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Contact Us</h5>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span>{config.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-indigo-500" />
                  <span>admissions@{config.name.replace(/\s+/g, '').toLowerCase()}.edu</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved. Generated by EduCraft.
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={primaryStyle}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-bounce hover:animate-none"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Preview;