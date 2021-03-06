import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col justify-center min-h-screen py-2 space-y-4">
            <Head>
                <title>WicDiv Playlist Explorer</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <header className="border-b-4 border-black flex space-x-8">
                <h1 className="text-xl">WicDiv Playlist Explorer</h1>
                <nav>
                    <ul className="space-x-4">
                        <li className="float-left"><Link href="/"><a>Home</a></Link></li>
                        <li className="float-left"><Link href="/about/"><a>About</a></Link></li>
                    </ul>
                </nav>
            </header>
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                {children}
            </main>
            <footer className="text-center">💀</footer>
        </div>
    );
}