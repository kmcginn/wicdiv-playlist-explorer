import Layout from '../components/layout'

export default function About(props) {
    return(
        <Layout>
            <article className="prose lg:prose-xl">
                <h3>About</h3>
                <p>This is a fan-created website to explore the tracks in <a href="https://open.spotify.com/playlist/11LAaVMMhxPfSp4i2b6JRJ?si=766a65e7d4c74c9b" target="_blank" rel="noopener noreferrer">the official Spotify playlist</a> for The Wicked + The Divine.</p>
                <p><a href="https://www.wicdiv.com" target="_blank" rel="noopener noreferrer">The Wicked + The Divine</a> is copyright © 2014 Kieron Gillen &amp; Jamie McKelvie. It is published by Image Comics Inc.</p>
                <p>All songs and album art in the playlist are copyright © their respective owners.</p>
                <p>This website was created with 🖤 by <a href="https://www.kmcginn.dev/" target="_blank" rel="noopener noreferrer">Kevin McGinn</a>. You can find the source code <a href="https://github.com/kmcginn/personal-website" target="_blank" rel="noopener noreferrer">on GitHub</a>.</p>
            </article>
        </Layout>
    );
}