import React, { useState, useEffect } from "react";

// Sample image URLs (replace with your own)

const images = [
  "/images/b1.jpg",
  "/images/b1.jpg",
  "/images/b1.jpg",
  "/images/b1.jpg",
  "/images/b1.jpg"
];


const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="w-full h-[500px] overflow-hidden relative ">
      {/* Slider Images */}
      <div className="w-full h-full flex transition-all duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
