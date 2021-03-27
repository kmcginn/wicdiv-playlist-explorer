import Head from 'next/head'
import { getAllPlaylistTracksBasic } from "../lib/spotify-api"

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
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <ul>
          {trackData.map((tracks) => (
            <li key={tracks.track.id}>
              {tracks.track.name}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
