import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import First from "~/components/First";
import Footer from "~/components/Footer";
import Body from "~/components/Body"; 
import Rating from "~/components/Rating";
import Stats from "~/components/Stats"
import { api } from "~/utils/api";

export default function Home() {

  return (
    <>
      <Head>
        <title>Eventzap</title>
        <meta name="description" content="Eventzap - A event management system" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#040508] to-[#181a45]">
      <h1 className="text-6xl font-extrabold text-white leading-10 mx-auto max-w-xl text-center tracking-widest">Welcome to</h1>
      <span className="text-6xl  font-extrabold text-white leading-normal  tracking-widest heading1">Eventzap!</span>
      <p className="mt-4 sm:text-xl sm:leading-relaxed text-center font-semibold">
       <span>Explore, Participate, and Make Every Moment Count!</span>
            </p>

       <First/>
        <Body/>
      <Rating/>
      <Stats/>
      </main>
        <Footer />
    </>
  );
}

