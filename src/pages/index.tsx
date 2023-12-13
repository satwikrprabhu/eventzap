import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import Body from "~/components/Body"; 
import Rating from "~/components/Rating";
import Stats from "~/components/Stats"
import { api } from "~/utils/api";
import Achievements from "~/components/Achievements";

export default function Home() {

  return (
    <>
      <Head>
        <title>Eventzap</title>
        <meta name="description" content="Eventzap - A event management system" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center ">

        <Achievements />
        {/* <Body/> */}
      {/* <Rating/> */}
      {/* <Stats/> */}
      </main>
        <Footer />
    </>
  );
}

