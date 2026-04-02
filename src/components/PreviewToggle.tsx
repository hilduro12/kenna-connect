import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, GraduationCap, BookOpen } from "lucide-react";

const PreviewToggle = () => {
  const { user, previewLoggedIn, togglePreview, toggleRole } = useAuth();

  return (
    <div className="fixed right-4 top-20 z-[100] flex flex-col gap-2">
      <button
        onClick={togglePreview}
        className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-colors hover:bg-light-bg"
      >
        {previewLoggedIn ? (
          <><Eye size={14} className="text-primary" /> Preview: Logged In</>
        ) : (
          <><EyeOff size={14} className="text-steel" /> Preview: Logged Out</>
        )}
      </button>
      {user && (
        <button
          onClick={toggleRole}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-colors hover:bg-light-bg"
        >
          {user.role === "tutor" ? (
            <><GraduationCap size={14} className="text-primary" /> Role: Tutor</>
          ) : (
            <><BookOpen size={14} className="text-primary" /> Role: Student</>
          )}
        </button>
      )}
    </div>
  );
};

export default PreviewToggle;
