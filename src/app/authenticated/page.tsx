import TopTracks from "@/components/molecules/TopTracks";

export default function Home() {
  return (
    <main className="flex flex-col gap-7 min-h-screen items-center p-8">
      <h2 className="text-6xl text-green-200" >Top Songs</h2>
      <TopTracks/>
    </main>
  )
}
