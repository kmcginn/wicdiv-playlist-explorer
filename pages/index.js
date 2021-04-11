import Layout from '../components/layout'
import SongSummary from "../components/song-summary"

const wicDivPlaylistId = "11LAaVMMhxPfSp4i2b6JRJ";

export async function getStaticProps() {
  const SpotifyWebApi = require('spotify-web-api-node')

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  });

  // initialize access token
  try {
    const credsResponse = await spotifyApi.clientCredentialsGrant();
    console.log("Access token expires in " + credsResponse.body["expires_in"]);
    spotifyApi.setAccessToken(credsResponse.body["access_token"]);
  } catch (err) {
    console.error("Something went wrong when retrieving the access token: " + err.message);
  }

  // retrieve tracks from playlist
  try {
    const limit = 100;
    let offset = 0;
    let tracks = [];
    let total = null;

    do {
      const playlistTracksResponse = await spotifyApi.getPlaylistTracks(
        wicDivPlaylistId,
        { fields: "items(added_at,track(id,name,artists(id,name),album(id,name,images))),total",
          offset: offset,
          limit: limit }
      );
      tracks = tracks.concat(playlistTracksResponse.body.items);
      total = playlistTracksResponse.body.total;
      offset = offset + limit;
    } while( offset < total)

    return {
      props: {
        trackData: tracks,
      },
    }
  } catch (err) {
    console.error("Error retrieving the playlist tracks: " + err.message);
  }

  return null;
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
