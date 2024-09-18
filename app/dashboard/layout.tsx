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
  const { getUser, isAuthenticated } = await getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    redirect(config.auth.loginUrl);
  }

  return <>{children}</>;
}
