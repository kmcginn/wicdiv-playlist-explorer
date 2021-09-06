import Layout from '../components/layout'
import SongSummary from "../components/song-summary"
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

export async function getStaticProps() {
  const playlistDataPath = path.join(dataDirectory, 'playlist_tracks.json');
  const playlistData = JSON.parse(fs.readFileSync(playlistDataPath, 'utf-8'));

  return {
    props: {
      trackData: playlistData
    },
  }

}

export default function Home({ trackData }) {
  return (
    <Layout>
      <div key="tracklist" className="grid gap-y-2">
        {trackData.map((tracks) => (
          <SongSummary key={tracks.track.id + "_" + tracks.added_at} track={tracks.track}/>
        ))}
      </div>
    </Layout>
  )
}
