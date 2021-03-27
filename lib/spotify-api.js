function getEncodedAuth() {
    return Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET, "binary").toString("base64");
}

async function getAccessToken() {
    const url = "https://accounts.spotify.com/api/token";

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Basic " + getEncodedAuth(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });
    const data = await res.json();
    // TODO: error handling
    return data.access_token
}

export async function getAllPlaylistTracksBasic(playlistId) {
    const access_token = await getAccessToken();
    const url = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?fields=items(track(name,artists(name),album(name))),next";
    // TODO: handle paging
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + access_token
        }
    });
    const data = await res.json();
    // TODO: error handling
    return data;
}