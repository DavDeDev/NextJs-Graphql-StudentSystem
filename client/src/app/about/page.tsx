import { auth, signOut } from "@/auth"
export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <button type="submit">Sign out</button>

      </form>
      <div>
        {JSON.stringify(session)}
      </div>

    </main >
  );
}
