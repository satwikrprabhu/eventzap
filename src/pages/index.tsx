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
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]">
        <First/>
        <Body/>
      <Rating/>
      <Stats/>
      </main>
        <Footer />
    </>
  );
}

