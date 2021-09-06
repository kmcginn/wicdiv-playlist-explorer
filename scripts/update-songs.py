#! python3
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from decouple import Config, RepositoryEnv
import json
import os

# define paths to other files
script_path = os.path.dirname(__file__)
data_path = os.path.join(os.path.split(script_path)[0], 'data')
env_local_path = os.path.join(os.path.split(script_path)[0], '.env.local')

# read variables from environment or .env.local
env_config = Config(RepositoryEnv(env_local_path))
CLIENT_ID = env_config("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = env_config("SPOTIFY_CLIENT_SECRET")
PLAYLIST_ID = "11LAaVMMhxPfSp4i2b6JRJ"

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=CLIENT_ID,
                                                           client_secret=CLIENT_SECRET))
# request playlist data
try:
    limit = 100
    offset = 0
    tracks = []
    total = None
    fields = "items(added_at,track(id,name,artists(id,name),album(id,name,images),is_local)),total"

    while True:
        playlist_tracks_response = sp.playlist_tracks(PLAYLIST_ID, 
                                                        fields=fields,
                                                        offset=offset,
                                                        limit=limit)
        tracks_to_add = [trackInfo for trackInfo in playlist_tracks_response['items'] if not trackInfo['track']['is_local']]
        tracks.extend(tracks_to_add)
        total = playlist_tracks_response['total']
        offset = offset + limit
        if offset > total:
            break
except:
    print("Error retrieving playlist tracks")

# write playlist top-level track data to file
playlist_data_path = os.path.join(data_path, 'playlist_tracks.json')
with open(playlist_data_path, 'w') as playlist_file:
    playlist_file.write(json.dumps(tracks, indent=2))

# request track details
limit = 50 # limit set by the tracks API
trackStart = 0
trackDetails = {}
while trackStart < len(tracks):
    track_ids = [trackInfo['track']['id'] for trackInfo in tracks[trackStart:trackStart+limit]]

    tracksResponse = sp.tracks(track_ids)
    for response in tracksResponse['tracks']:
        track_id = response['id']
        if track_id not in trackDetails.keys():
            trackDetails.update({track_id: {}})
        trackDetails[track_id].update({'details': response})

    trackAudioFeaturesResponse = sp.audio_features(track_ids)
    for response in trackAudioFeaturesResponse:
        track_id = response['id']
        if track_id not in trackDetails.keys():
            trackDetails.update({track_id: {}})
        trackDetails[track_id].update({'audio_features': response})

    trackStart = trackStart + limit

# write track-addressable details data to file
track_details_path = os.path.join(data_path, 'track_details.json')
with open(track_details_path, 'w') as track_details_data_file:
    track_details_data_file.write(json.dumps(trackDetails, indent=2))
