import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
}

const StarRating = ({ rating, count, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-gold text-gold"
                : "fill-none text-cold"
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating}</span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
