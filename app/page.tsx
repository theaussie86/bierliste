import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto">
        <ButtonSignin text="Login" />
      </header>
      <main>
        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 py-24">
          <h1 className="text-3xl font-extrabold">
            Bierliste des SV Amendingen
          </h1>

          <Image className="w-full" src={logo} alt="SV Amendingen Logo" />

          <p className="text-lg opacity-80">
            Damit wir alle wissen, was wir getrunken haben 😉
          </p>

          <Link className="btn btn-primary" href="/dashboard">
            Los geht's
          </Link>
        </section>
      </main>
    </>
  );
}
