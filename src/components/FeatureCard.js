import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import styled from 'styled-components';


const CardWrapper = styled.div`
  position: relative;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  min-height: 280px;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3);
  }

  &:hover::before {
    opacity: 0.25;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  transform: translateZ(30px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #3B82F6;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  color: #94A3B8;
  margin: 0;
  line-height: 1.6;
`;

const FeatureCard = ({ icon, title, description, backgroundImage }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.05
      });
    }

    return () => {
      if (cardRef.current) {
        // vanilla-tilt doesn't have proper TypeScript support for the instance
        cardRef.current.vanillaTilt?.destroy();
      }
    };
  }, []);

  return (
    <CardWrapper
      ref={cardRef}
      style={{ '--bg-image': `url(${backgroundImage})` }}
    >
      <CardContent>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
    </CardWrapper>
  );
};

export default FeatureCard; 