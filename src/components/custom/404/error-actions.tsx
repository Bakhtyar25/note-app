import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function ErrorActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button asChild className="bg-urgent hover:bg-urgent/90 text-white shadow-lg dark:shadow-urgent/20">
        <Link href="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </Button>
      
      <Button variant="outline" asChild className="border-2 border-border hover:bg-border/10 dark:hover:bg-border/20">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </Button>
    </div>
  );
}
