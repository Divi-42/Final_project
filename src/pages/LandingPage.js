import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FadeInView, 
  StaggeredContainer, 
  StaggeredItem, 
  ParallaxSection,
  AnimatedCounter,
  HoverCard,
  ScrollTriggeredAnimation
} from '../components/Animations';
import SlideImages from './slide';
import TestimonialSlider from '../components/TestimonialSlider';
import FloatingElements from '../components/FloatingElements';
import dashboardBg from '../assets/dashboard-bg.jpg';
import FeatureCard from '../components/FeatureCard';
import VanillaTilt from 'vanilla-tilt';
import interactiveChartsBg from '../assets/images/interactive-charts-bg.svg';
import csvUploadBg from '../assets/images/csv-upload-bg.svg';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cardRefs = document.querySelectorAll('.feature-card');
    cardRefs.forEach(card => {
      VanillaTilt.init(card, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.05
      });
    });

    return () => {
      cardRefs.forEach(card => {
        VanillaTilt.destroy(card);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${dashboardBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.32)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.9)'
            }}
          >
            Transform Your Data Into <br />
            <span className="text-blue-400" style={{ 
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.9)'
            }}>
              Beautiful Visualizations
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          >
            Our interactive dashboard converts your CSV sales data into stunning, 
            animated visualizations that help you make better business decisions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/upload" 
              className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg inline-block hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Get Started Now
            </Link>
            <Link 
              to="/demo" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-colors duration-300 ml-4 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all backdrop-blur-sm"
            >
              View Demo
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>
      <SlideImages/>
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeInView>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Powerful Features for Data Visualization
            </h2>
          </FadeInView>
          
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggeredItem>
              <FeatureCard
                icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>}
                title="Interactive Charts"
                description="Explore your data through interactive charts with animations, tooltips, and filtering capabilities."
              />
            </StaggeredItem>
            
            <StaggeredItem>
              <FeatureCard
                icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>}
                title="CSV Upload"
                description="Simply upload your CSV files and watch as they transform into beautiful, interactive visualizations."
              />
            </StaggeredItem>
            
            <StaggeredItem>
              <FeatureCard
                icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>}
                title="Responsive Design"
                description="Access your dashboard from any device with a fully responsive design that adapts to any screen size."
              />
            </StaggeredItem>
          </StaggeredContainer>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation animation="slideRight">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Advanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Gain deeper insights with our advanced analytics features that help you understand trends and patterns in your data.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Trend analysis and forecasting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Comparative performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Customizable KPI tracking</span>
                  </li>
                </ul>
              </div>
            </ScrollTriggeredAnimation>
            
            <ScrollTriggeredAnimation animation="slideLeft">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Beautiful Animations</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Engage your audience with stunning animations that bring your data to life and make insights more memorable.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Animated chart transitions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Parallax scrolling effects</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">Interactive hover states</span>
                  </li>
                </ul>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <FadeInView>
            <h2 className="text-3xl font-bold text-center mb-16">
              Trusted by Data Professionals
            </h2>
          </FadeInView>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={5000} prefix="+" />
              </div>
              <p className="text-blue-200">Active Users</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={10} suffix="M+" />
              </div>
              <p className="text-blue-200">Data Points Visualized</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <p className="text-blue-200">Customer Satisfaction</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter value={24} suffix="/7" />
              </div>
              <p className="text-blue-200">Support Available</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeInView>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
              What Our Users Say
            </h2>
          </FadeInView>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollTriggeredAnimation animation="fadeIn" className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "This dashboard has transformed how we analyze our sales data. The visualizations are not only beautiful but also incredibly insightful."
              </p>
            </ScrollTriggeredAnimation>
            
            <ScrollTriggeredAnimation animation="fadeIn" delay={0.2} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data Analyst</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "The interactive features and animations make presenting data to stakeholders so much more engaging. It's a game-changer for our reports."
              </p>
            </ScrollTriggeredAnimation>
            
            <ScrollTriggeredAnimation animation="fadeIn" delay={0.4} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">RW</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Robert Wilson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sales Manager</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "I can finally make sense of our complex sales data. The dashboard makes it easy to identify trends and opportunities at a glance."
              </p>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Start visualizing your sales data today and unlock insights that drive business growth.
            </p>
            <Link 
              to="/upload" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg inline-block"
            >
              Get Started for Free
            </Link>
          </FadeInView>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
