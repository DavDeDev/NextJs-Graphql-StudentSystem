import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button>
        <Link href='/api/graphql'>Apollo Server</Link>
      </Button>
      <Button><Link href='/auth/register'>Register</Link></Button>
      <Button><Link href='/auth/login'>Login</Link></Button>
      <Button><Link href='/about'>About</Link></Button>
    </>
  );
}
