import SpotifyWebApi from 'spotify-web-api-node'

export default class SpotifyHelper {
    static spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });

    static wicDivPlaylistId = "11LAaVMMhxPfSp4i2b6JRJ";

    static async setSpotifyAccessToken() {
        // don't set a new access token if it is already set
        const accessToken = this.spotifyApi.getAccessToken();
        if( typeof accessToken !== "undefined" )
        {
            return;
        }

        try {
            const credsResponse = await this.spotifyApi.clientCredentialsGrant();
            console.log("Access token expires in " + credsResponse.body["expires_in"]);
            this.spotifyApi.setAccessToken(credsResponse.body["access_token"]);
        } catch (err) {
            console.error("Something went wrong when retrieving the access token: " + err.message);
        }
    }

    static async getPlaylistBasicTrackInfo() {
        await this.setSpotifyAccessToken();

        try {
            const limit = 100;
            let offset = 0;
            let tracks = [];
            let total = null;

            do {
                const playlistTracksResponse = await this.spotifyApi.getPlaylistTracks(
                    this.wicDivPlaylistId, {
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
            console.error("Error retrieving the playlist tracks:", err.message);
        }

        return null;
    }

    static async getTrackInfo(id) {
        await this.setSpotifyAccessToken();

        try {
            const trackResponse = await this.spotifyApi.getTrack(id);
            return trackResponse.body;
        } catch (err) {
            console.error("Error retrieving the track information:", err.statusCode, err.message);
        }

        return null;
    }

    static async getTrackAudioFeatures(id) {
        await this.setSpotifyAccessToken();

        try {
            const audioFeatureResponse = await this.spotifyApi.getAudioFeaturesForTrack(id);
            return audioFeatureResponse.body;
        } catch (err) {
            console.error("Error retrieving the track audio features:", err.statusCode, err.message);
        }
    }
}