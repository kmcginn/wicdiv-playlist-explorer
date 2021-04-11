import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const wicDivPlaylistId = "11LAaVMMhxPfSp4i2b6JRJ";

async function setSpotifyAccessToken() {
    try {
        const credsResponse = await spotifyApi.clientCredentialsGrant();
        console.log("Access token expires in " + credsResponse.body["expires_in"]);
        spotifyApi.setAccessToken(credsResponse.body["access_token"]);
    } catch (err) {
        console.error("Something went wrong when retrieving the access token: " + err.message);
    }
}

export async function getPlaylistBasicTrackInfo() {
    await setSpotifyAccessToken();

    try {
        const limit = 100;
        let offset = 0;
        let tracks = [];
        let total = null;

        do {
            const playlistTracksResponse = await spotifyApi.getPlaylistTracks(
                wicDivPlaylistId, {
                    fields: "items(added_at,track(id,name,artists(id,name),album(id,name,images),is_local)),total",
                    offset: offset,
                    limit: limit
                }
            );
            // filter out the "local" tracks because they do not have Spotify ids or other information
            tracks = tracks.concat(playlistTracksResponse.body.items.filter( trackInfo => !trackInfo.track.is_local));
            total = playlistTracksResponse.body.total;
            offset = offset + limit;
        } while (offset < total)

        return tracks;
    } catch (err) {
        console.error("Error retrieving the playlist tracks: " + err.message);
    }

    return null;
}

export async function getTrackInfo(id) {
    await setSpotifyAccessToken();

    try {
        const trackResponse = await spotifyApi.getTrack(id);
        return trackResponse.body;
    } catch (err) {
        console.error("Error retrieving the track information: " + err.message);
    }

    return null;
}