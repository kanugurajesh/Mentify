import RiveHero from "@/components/RiveHero";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        href="/hero_use_case_v5.riv"
        as="fetch"
        crossOrigin="anonymous"
      />
      <main className="block relative w-screen h-screen">
        <RiveHero />
      </main>
    </>
  )
}
