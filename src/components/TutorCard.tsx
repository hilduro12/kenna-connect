import { Link } from "react-router-dom";
import { BadgeCheck, MapPin } from "lucide-react";
import StarRating from "./StarRating";
import type { Tutor } from "@/data/tutors";

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <Link
      to={`/tutor/${tutor.id}`}
      className="group block rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex gap-4">
        <img
          src={tutor.photo}
          alt={tutor.name}
          loading="lazy"
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-foreground group-hover:text-steel transition-colors">
              {tutor.name}
            </h3>
            {tutor.verified && (
              <BadgeCheck size={18} className="shrink-0 text-primary" />
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>{tutor.location}</span>
          </div>
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
      <p className="mt-3 line-clamp-2 text-sm text-steel">{tutor.tagline}</p>
      <div className="mt-3 flex items-center justify-between">
        <StarRating rating={tutor.rating} count={tutor.reviewCount} />
        <span className="text-lg font-bold text-foreground">
          {tutor.pricePerHour.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">ISK/hr</span>
        </span>
      </div>
    </Link>
  );
};

export default TutorCard;
