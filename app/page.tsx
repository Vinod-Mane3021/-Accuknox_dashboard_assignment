import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="h-screen w-screen flex flex-col gap-y-5 items-center justify-center">
      <p className="mb-10">Home Page</p>
      <p className="font-semibold text-lg">Click  here</p>
      <Link href="/dashboard">
        <Button className="font-semibold text-lg text-blue-500 p-5 hover:underline" variant="outline">
          Go to dashboard page
        </Button>
      </Link>
    </main>
  );
}
