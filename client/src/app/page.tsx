import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>
        <Link href='/api/graphql'>Apollo Server</Link>
      </Button>
      <Button><Link href='/auth/register'>Register</Link></Button>
      <Button><Link href='/auth/login'>Login</Link></Button>
      <Button><Link href='/about'>About</Link></Button>

    </main>
  );
}
