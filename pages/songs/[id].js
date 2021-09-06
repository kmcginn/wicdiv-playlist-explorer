import Layout from "../../components/layout"
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

export async function getStaticProps({params}) {
    const trackDetailDataPath = path.join(dataDirectory, 'track_details.json');
    const trackDetailData = JSON.parse(fs.readFileSync(trackDetailDataPath, 'utf-8'));

    return {
        props: {
            trackInfo: trackDetailData[params.id].details ?? null,
            trackAudioFeatures: trackDetailData[params.id].audio_features ?? null,
        }
    }
}

export async function getStaticPaths() {
    const playlistDataPath = path.join(dataDirectory, 'playlist_tracks.json');
    const playlistData = JSON.parse(fs.readFileSync(playlistDataPath, 'utf-8'));

    const paths = playlistData.map((trackInfo) => {
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