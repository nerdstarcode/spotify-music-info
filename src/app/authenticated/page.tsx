import TopTracks from "@/components/molecules/TopTracks";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 min-h-screen items-center justify-around p-24">
      <h2 className="text-6xl text-green-200" >Top Songs</h2>
      <TopTracks/>
    </main>
  )
}
