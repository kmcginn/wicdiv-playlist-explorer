import Layout from '../components/layout'
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
    <Layout>
      <div className="grid gap-y-2">
        {trackData.map((tracks) => (
          <SongSummary track={tracks.track}/>
        ))}
      </div>
    </Layout>
  )
}
