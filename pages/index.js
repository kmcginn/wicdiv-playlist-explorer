import Layout from '../components/layout'
import SongSummary from "../components/song-summary"
import SpotifyHelper from "../lib/spotify-helper"

export async function getStaticProps() {
  const trackData = await SpotifyHelper.getPlaylistBasicTrackInfo();

  return {
    props: {
      trackData
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
