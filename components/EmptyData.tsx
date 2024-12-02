"use client";

import { usePathname, useRouter } from "next/navigation";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const EmptyData = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          The requested page <code>&quot;{pathname}&quot;</code> does not exist
          or is not available.
        </AlertDescription>
      </Alert>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};
