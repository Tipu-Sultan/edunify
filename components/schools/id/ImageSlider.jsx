import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const ImageSlider = ({school}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
      // Slider navigation logic
      const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === school.images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? school.images.length - 1 : prevIndex - 1
        );
      };
    
      const goToImage = (index) => {
        setCurrentImageIndex(index);
      };
  return (
    <>
      {/* Image Container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={school.images[currentImageIndex]}
          alt={`${school.name} - Image ${currentImageIndex + 1}`}
          className={cn(
            "w-full h-64 sm:h-80 lg:h-96 object-cover transition-all duration-300 ease-in-out"
          )}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className={cn(
            "bg-background/80 hover:bg-background/90 transition-colors",
            "border-primary/50"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className={cn(
            "bg-background/80 hover:bg-background/90 transition-colors",
            "border-primary/50"
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {school.images.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => goToImage(index)}
            className={cn(
              "h-2 w-2 rounded-full p-0 transition-colors",
              currentImageIndex === index
                ? "bg-primary hover:bg-primary/80"
                : "bg-muted hover:bg-muted/80"
            )}
          />
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
