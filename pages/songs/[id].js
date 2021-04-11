import Layout from "../../components/layout"
import { getPlaylistBasicTrackInfo, getTrackInfo } from "../../lib/spotify-helper"

export async function getStaticProps({params}) {
    const trackInfo = await getTrackInfo(params.id);

    // TODO: get audio features
    return {
        props: {
            trackInfo
        }
    }
}

export async function getStaticPaths() {
    const tracks = await getPlaylistBasicTrackInfo();

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
    return (
        <Layout>
            <h3>{props.trackInfo.name}</h3>
        </Layout>
    )
}