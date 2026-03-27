import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TutorCard from "@/components/TutorCard";
import BlurredTutorCard from "@/components/BlurredTutorCard";
import { tutors } from "@/data/tutors";
import { useAuth } from "@/contexts/AuthContext";

const allSubjects = ["All Subjects", "Mathematics", "English", "Danish", "Physics", "Icelandic", "Chemistry", "Computer Science", "History"];
const allLocations = ["All Locations", "Reykjavik", "Kopavogur", "Hafnarfjordur", "Akureyri", "Online"];
const sortOptions = [
  { value: "rating", label: "Highest rated" },
  { value: "price-low", label: "Lowest price" },
  { value: "reviews", label: "Most reviews" },
];

const BrowseTutors = () => {
  const { isSubscribed } = useAuth();
  const [subject, setSubject] = useState("All Subjects");
  const [location, setLocation] = useState("All Locations");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sort, setSort] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = tutors.filter((t) => {
      if (subject !== "All Subjects" && !t.subjects.includes(subject)) return false;
      if (location !== "All Locations" && t.location !== location) return false;
      if (t.rating < minRating) return false;
      if (t.pricePerHour > maxPrice) return false;
      return true;
    });
    result.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price-low") return a.pricePerHour - b.pricePerHour;
      if (sort === "reviews") return b.reviewCount - a.reviewCount;
      return 0;
    });
    return result;
  }, [subject, location, minRating, maxPrice, sort]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Subject</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          {allSubjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          {allLocations.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Max price: {maxPrice.toLocaleString()} ISK</label>
        <input type="range" min={3000} max={15000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
        <div className="flex justify-between text-xs text-muted-foreground"><span>3,000</span><span>15,000</span></div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Min rating: {minRating > 0 ? `${minRating}+` : "Any"}</label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setMinRating(r)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${minRating === r ? "border-primary bg-primary text-primary-foreground" : "border-border text-steel hover:bg-light-bg"}`}>
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Browse Teachers</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} teachers found</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-steel md:hidden">
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-8">
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Filters</h3>
              <FilterPanel />
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <FilterPanel />
                <Button className="mt-6 w-full" onClick={() => setShowFilters(false)}>Apply Filters</Button>
              </div>
            </div>
          )}

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-border bg-card py-16 text-center">
                <Search size={40} className="mx-auto text-cold" />
                <p className="mt-4 text-lg font-medium text-foreground">No teachers found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {filtered.map((tutor) =>
                  isSubscribed ? (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ) : (
                    <BlurredTutorCard key={tutor.id} tutor={tutor} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseTutors;
