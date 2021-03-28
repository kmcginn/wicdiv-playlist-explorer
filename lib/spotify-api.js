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
    if(data.error) {
        console.error("Unable to retrieve access token: (" + data.error + ") " + data.error_description);
    }
    return data.access_token
}

export async function getAllPlaylistTracksBasic(playlistId) {
    const access_token = await getAccessToken();
    let tracks = [];
    let url = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?fields=items(track(id,name,artists(id,name),album(id,name))),next";
    while(url) {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + access_token
            }
        });
        const data = await res.json();
        if(data.error) {
            console.error("Unable to retrieve playlist data: (" + data.error.status + ") " + data.error.message);
        }
        url = data.next;
        tracks = tracks.concat(data.items)
    }
    return tracks;
}