import ErrorIcon from "@/components/custom/404/error-icon";
import ErrorContent from "@/components/custom/404/error-content";
import ErrorActions from "@/components/custom/404/error-actions";

export default function NotFound() {
  return (
    <div className="mt-16 bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-sm mx-auto">
        <ErrorIcon />
        <ErrorContent />
        <ErrorActions />
      </div>
    </div>
  );
}
