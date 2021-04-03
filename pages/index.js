import Head from 'next/head'
import { getAllPlaylistTracksBasic } from "../lib/spotify-api"
import SongSummary from "../components/song-summary"

const wicDivPlaylistId = "11LAaVMMhxPfSp4i2b6JRJ";

export async function getStaticProps() {
  const trackData = await getAllPlaylistTracksBasic(wicDivPlaylistId);
  return {
    props: {
      trackData,
    },
  }
}

export default function Home({ trackData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>WicDiv Playlist Explorer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <div className="grid gap-y-2">
          {trackData.map((tracks) => (
            <SongSummary track={tracks.track}/>
          ))}
        </div>
      </main>
    </div>
  )
}
