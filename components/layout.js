import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>WicDiv Playlist Explorer</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <header>
                WicDiv Playlist Explorer
            </header>
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">{children}</main>
            <footer>💀</footer>
        </div>
    );
}