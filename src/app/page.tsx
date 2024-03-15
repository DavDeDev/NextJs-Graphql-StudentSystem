import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";

export default function Home() {
  return (

    <div className="flex-1 w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-w-7xl mx-auto relative z-10 w-full md:pt-0 flex flex-col gap-5">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Student Service 2.
        </h1>
        <div className="w-full flex justify-center gap-5">
          <Button>
            <Link href='/auth/login'>Login</Link>
            </Button>
        </div>
      </div>
    </div>


  );
}
