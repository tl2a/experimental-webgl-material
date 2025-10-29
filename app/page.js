"use client";
import { Leva } from "leva";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";
const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  const searchParams = useSearchParams();
  const showLeva = searchParams.get("leva") === "true";

  return (
    <main className="h-screen relative">
      <h1 className="fixed size-fit block inset-x-0 bottom-0 m-auto p-6 z-20 lg:text-4xl text-2xl font-light">
        LONG LIVE THE SKULL
      </h1>
      <Scene />
      {showLeva ? null : <Leva hidden />}
    </main>
  );
}
