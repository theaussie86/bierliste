import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import { get } from "http";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();
  const loggedIn = await isAuthenticated();
  return (
    <>
      <main>
        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 py-24">
          <h1 className="text-3xl font-extrabold">
            Bierliste des SV Amendingen
          </h1>

          <Image
            className="w-full sm:w-60"
            src={logo}
            alt="SV Amendingen Logo"
          />

          <p className="text-lg opacity-80">
            Damit wir alle wissen, was wir getrunken haben 😉
          </p>

          {loggedIn ? (
            <Link className="btn btn-primary" href="/dashboard">
              Los geht's
            </Link>
          ) : (
            <LoginLink className="btn btn-primary">Los geht's</LoginLink>
          )}
        </section>
      </main>
    </>
  );
}
