import Layout from "../../components/layout"

export async function getStaticProps() {
    return {
        props: {}
    }
}

export async function getStaticPaths() {
    const paths = [];
    return {
        paths,
        fallback: false
    }
}

export default function Song(props) {
    return (
        <Layout>
            
        </Layout>
    )
}