import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CircleArrowOutUpRight,
  House,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col gap-y-5 items-center justify-center">
      <span className="flex flex-col items-center gap-1">
        <House size={30}/>
        <p className="mb-10">Home Page</p>
      </span>
      <span className="flex items-center gap-2">
        <p className="font-semibold text-lg">Click here</p>{" "}
        <MousePointerClick size={20} />
      </span>
      <Link href="/dashboard">
        {/* <Button className="font-semibold text-lg text-blue-500 hover:text-black p-5 hover:underline flex items-center justify-center duration-300" variant="outline">
          <p>Go to dashboard page</p> 
          <ArrowUpRight size={20} className="black group-hover:hidden" />
          <CircleArrowOutUpRight size={20} className="hidden group-hover:block" />
        </Button> */}
        <Button
          className="group font-semibold text-lg text-blue-500 hover:text-black p-5 hover:underline flex items-center justify-center duration-300 gap-2"
          variant="outline"
        >
          <p>Go to dashboard page</p>
          <ArrowUpRight size={20} />
        </Button>
      </Link>
    </main>
  );
}
