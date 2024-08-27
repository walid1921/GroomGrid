import { useState } from "react";
import Star from "./star";

type StarRatingProps = {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    if (onSetRating) {
      onSetRating(rate);
    }
  };

  return (
    <div className={`flex justify-center items-center  ${className}`}>
      <div className="flex gap-2 justify-center items-center mb-4">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            size={size}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? i < tempRating : i < rating}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
