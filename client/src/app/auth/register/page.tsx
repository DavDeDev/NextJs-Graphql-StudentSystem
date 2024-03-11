import LoginForm from "@/app/auth/login/LoginForm";
import RegisterForm from "@/app/auth/register/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <RegisterForm />

    </main>
  );
}
