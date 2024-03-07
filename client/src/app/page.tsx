import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Link href='/api/graphql'>Apollo Server</Link>
      <Link href='/auth/sign-up'>Register</Link>
      <Link href='/auth/sign-in'>Login</Link>

    </main>
  );
}
