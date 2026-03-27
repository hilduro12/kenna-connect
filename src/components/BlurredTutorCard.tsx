import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import StarRating from "./StarRating";
import type { Tutor } from "@/data/tutors";

interface BlurredTutorCardProps {
  tutor: Tutor;
}

const BlurredTutorCard = ({ tutor }: BlurredTutorCardProps) => {
  return (
    <div className="group relative block rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex gap-4">
        <img
          src={tutor.photo}
          alt="Teacher"
          loading="lazy"
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-lg object-cover blur-md"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-muted-foreground">
            Teacher
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tutor.subjects.map((s) => (
              <span
                key={s}
                className="rounded-full bg-light-bg px-2.5 py-0.5 text-xs font-medium text-steel"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StarRating rating={tutor.rating} count={tutor.reviewCount} />
        <span className="text-lg font-bold text-foreground">
          {tutor.pricePerHour.toLocaleString()}{" "}
          <span className="text-sm font-normal text-muted-foreground">ISK/hr</span>
        </span>
      </div>

      {/* Overlay */}
      <Link
        to="/pricing"
        className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Lock size={20} className="text-primary" />
        <span className="mt-2 text-sm font-semibold text-primary">Subscribe to see full profile</span>
      </Link>
    </div>
  );
};

export default BlurredTutorCard;
