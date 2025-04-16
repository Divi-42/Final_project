import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Quote = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 2rem;
  color: #e2e8f0;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #f8fafc;
`;

const Role = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0.5rem 0 0;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#3b82f6' : '#475569'};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3b82f6;
  }
`;

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <SliderContainer>
      <AnimatePresence mode="wait">
        <Slide
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Quote>"{testimonials[currentIndex].quote}"</Quote>
          <Author>
            <Name>{testimonials[currentIndex].name}</Name>
            <Role>{testimonials[currentIndex].role}</Role>
          </Author>
        </Slide>
      </AnimatePresence>
      
      <Dots>
        {testimonials.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentIndex}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </Dots>
    </SliderContainer>
  );
};

export default TestimonialSlider; 