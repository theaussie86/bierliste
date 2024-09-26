import { ReactNode } from "react";
import { redirect } from "next/navigation";
import config from "@/config";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect(config.auth.loginUrl);
  }

  return (
    <main className="min-h-screen p-8 pb-24 max-w-xl mx-auto">{children}</main>
  );
}
