import Layout from "../../components/layout"
import SpotifyHelper from "../../lib/spotify-helper"
import {setTimeout} from "timers/promises"

export async function getStaticProps({params}) {
    // use timeouts to avoid API throttling; there's likely a better way to do this
    await setTimeout(1000);
    const trackInfo = await SpotifyHelper.getTrackInfo(params.id);
    await setTimeout(1000);
    const trackAudioFeatures = await SpotifyHelper.getTrackAudioFeatures(params.id);

    return {
        props: {
            trackInfo: trackInfo ?? null,
            trackAudioFeatures: trackAudioFeatures ?? null,
        }
    }
}

export async function getStaticPaths() {
    const tracks = await SpotifyHelper.getPlaylistBasicTrackInfo();

    const paths = tracks.map((trackInfo) => {
        return {
            params: {
                id: trackInfo.track.id
            }
        }
    });
    return {
        paths: paths,
        fallback: false
    }
}

export default function Song(props) {
    const albumImgUrl = props.trackInfo?.album.images[0]?.url;
    const albumImgSize = props.trackInfo?.album.images[0]?.height;

    return (
        <Layout>
            <img
                src={albumImgUrl}
                alt={"Art for album " + props.trackInfo?.album.name}
                height={albumImgSize}
                width={albumImgSize}
                className="object-contain justify-self-center self-center max-h-60"
            />
            <h3 className="text-4xl">{props.trackInfo.name}</h3>
            <h4 className="text-3xl">{props.trackInfo.artists[0].name}</h4>
            <table className="table-auto text-left">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Danceability</td>
                        <td>{props.trackAudioFeatures.danceability}</td>
                    </tr>
                    <tr>
                        <td>Energy</td>
                        <td>{props.trackAudioFeatures.energy}</td>
                    </tr>
                    <tr>
                        <td>Valence</td>
                        <td>{props.trackAudioFeatures.valence}</td>
                    </tr>
                    <tr>
                        <td>Tempo</td>
                        <td>{props.trackAudioFeatures.tempo}</td>
                    </tr>
                </tbody>
            </table>
        </Layout>
    )
}