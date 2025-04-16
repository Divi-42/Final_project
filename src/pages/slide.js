import React, { useEffect, useRef } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';

const SlideImages = () => {
  // Create refs for both card containers
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;
      // When the top of the card reaches 80% down the viewport, trigger the animation
      const revealPoint = window.innerHeight * 0.8;

      if (leftCard) {
        const leftCardTop = leftCard.getBoundingClientRect().top;
        if (leftCardTop < revealPoint) {
          leftCard.classList.add('active');
        } else {
          leftCard.classList.remove('active');
        }
      }

      if (rightCard) {
        const rightCardTop = rightCard.getBoundingClientRect().top;
        if (rightCardTop < revealPoint) {
          rightCard.classList.add('active');
        } else {
          rightCard.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // run once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        height: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '70px',
          margin: '30px 0'
        }}
      >
        {/* Left Card: image at the top, caption at the bottom */}
        <div className="card slide-left" ref={leftCardRef}>
          <img
            src={img1}
            alt="Left Slide"
            style={{ width: '650px', height:'700px', display: 'block' }}
          />
          <div className="card-caption">
          You don’t need to be a data scientist — just upload your CSV.
          </div>
        </div>

        {/* Right Card: caption at the top, image below */}
        <div className="card slide-right" ref={rightCardRef}>
          <div className="card-caption">
          Data made simple. Insights made personal
          </div>
          <img
            src={img2}
            alt="Right Slide"
            style={{ width: '650px', height:'700px' ,display: 'block' }}
          />
        </div>
      </div>

      <style jsx="true">{`
  .card {
    background-color: #001f3f;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 950px; /* Increase the max-width to fit the larger image */
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 1s ease-out, opacity 1s ease-out;
    opacity: 0;
  }
  .card-caption {
    font-size: 1.5em;
    text-align: center;
    margin: 15px 0;
    font-weight: bold;
  }
  .slide-left {
    transform: translateX(-100%);
  }
  .slide-right {
    transform: translateX(100%);
  }
  .card.active {
    transform: translateX(0);
    opacity: 1;
  }
  /* Optionally, if you want to use a CSS class for images instead of inline styling */
  .responsive-image {
    width: 900px; /* or any preferred value */
    display: block;
  }
`}</style>


    </div>
  );
};

export default SlideImages;
