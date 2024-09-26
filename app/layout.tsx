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

  if (user) {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      await connectMongo();
      let dbUser = await User.findOne({ kindeId: user.id });

      if (!dbUser) {
        await User.create({
          kindeId: user.id,
          name: `${user.given_name} ${user.family_name}`,
        });
      } else {
        // get the name of the user in the database and check if it is the same as given_name and family_name
        const namesAreEqual =
          dbUser.name === `${user.given_name} ${user.family_name}`;

        // if not, update the user
        if (!namesAreEqual) {
          await User.findOneAndUpdate(
            { kindeId: user.id },
            { name: `${user.given_name} ${user.family_name}` }
          );
        }
      }
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
