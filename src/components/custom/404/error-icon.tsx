import { AlertTriangle } from "lucide-react";

export default function ErrorIcon() {
  return (
    <div className="mb-8">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-urgent to-low rounded-full flex items-center justify-center shadow-lg dark:shadow-urgent/20">
        <AlertTriangle className="w-12 h-12 text-white" />
      </div>
    </div>
  );
}
