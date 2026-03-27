import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const PreviewToggle = () => {
  const { previewLoggedIn, togglePreview } = useAuth();

  return (
    <button
      onClick={togglePreview}
      className="fixed right-4 top-20 z-[100] flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-colors hover:bg-light-bg"
    >
      {previewLoggedIn ? (
        <><Eye size={14} className="text-primary" /> Preview: Logged In</>
      ) : (
        <><EyeOff size={14} className="text-steel" /> Preview: Logged Out</>
      )}
    </button>
  );
};

export default PreviewToggle;
