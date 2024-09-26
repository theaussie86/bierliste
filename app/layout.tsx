import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import Header from "@/components/Header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser, isAuthenticated, getPermissions } =
    await getKindeServerSession();
  const user = await getUser();
  const permissions = await getPermissions();
  console.log("permissions", permissions);

  if (user) {
    await connectMongo();
    let dbUser = await User.findOne({ kindeId: user.id }).exec();

    const authenticated = await isAuthenticated();
    if (!dbUser && authenticated) {
      dbUser = await User.create({ kindeId: user.id });
    }
  }

  return (
    <html
      lang="en"
      data-theme={config.colors.theme}
      className={twMerge(font.className, "h-full")}
    >
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body className="h-full">
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <Header permissions={permissions?.permissions} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
