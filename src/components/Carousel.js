import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      name: "Alexander Pierce",
      content:
        "This platform has revolutionized the way I manage my investments. The insights are top-notch!",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Isabella Martinez",
      content:
        "As a seasoned investor, I’ve never seen a more accurate predictive tool. It’s a game-changer!",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Michael Chen",
      content:
        "The wealth management tools here are simply unmatched. I've seen significant growth in my portfolio.",
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "Sophia Thompson",
      content:
        "I refined my trading strategies using their simulator. It’s perfect for both beginners and pros!",
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
    className={`flex flex-col items-center justify-center h-[200px] text-white font-bold max-[768px]:font-semibold max-[640px]:font-light max-[640px]:h-[300px] ${slide.color}`}
    style={{ minWidth: "100%" }}
  >
    <p className="text-center text-3xl w-3/5 mx-auto max-[1024px]:text-xl max-[768px]:text-lg max-[768px]:w-2/5 max-[640px]:w-3/5 max-[425px]:w-2/5 max-[375px]:text-base max-[320px]:text-sm">
      {slide.content}
    </p>
    <p className="mt-2 text-lg text-black font-semibold italic max-[425px]:text-base max-[320px]:text-sm">{slide.name}</p>
  </div>
))}

        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg max-[640px]:px-2 max-[640px]:py-1"
        onClick={handleBack}
      >
        Back
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg max-[640px]:px-2 max-[640px]:py-1"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
