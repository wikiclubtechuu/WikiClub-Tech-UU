import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl md:text-3xl font-light mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-2 text-muted-foreground">
          You might have mistyped the address or the page may have moved.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button size="lg">Go back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
