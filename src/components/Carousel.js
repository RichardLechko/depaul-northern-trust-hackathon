import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      content:
        "Currency Converter: Easily convert between different currencies with real-time exchange rates.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      content:
        "Historical Data: Access a wealth of historical data to analyze trends and make informed decisions.",
      color: "bg-green-500",
    },
    {
      id: 3,
      content:
        "Predictive Analysis: Utilize predictive analytics to forecast currency movements and optimize trading strategies.",
      color: "bg-red-500",
    },
    {
      id: 4,
      content:
        "FX Trade Simulator: Practice trading with our FX simulator, designed for both beginners and experienced traders.",
      color: "bg-yellow-500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleBack = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      handleNext();
      setIsDragging(false);
    } else if (diffX < -50) {
      handleBack();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full my-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`flex items-center justify-center h-[200px] text-white font-bold ${slide.color}`}
              style={{ minWidth: "100%" }}
            >
              <p className="text-center text-xs">{slide.content}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg"
        onClick={handleBack}
      >
        Back
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
