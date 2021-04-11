import Link from "next/link";

export default function SongSummary(props) {
    const albumImgUrl = props.track.album.images[0]?.url;
    const albumImgSize = props.track.album.images[0]?.height;

    return (
        <Link href={"/songs/" + props.track.id}>
            <a className="grid grid-rows-1 grid-cols-2 gap-2 max-h-40 max-w-md border-2 border-black rounded-lg hover:bg-gray-200">
                {/* TODO: replace this with a <picture> and <img> setup? */}
                { albumImgUrl ? (
                <>
                    <img
                        src={albumImgUrl}
                        alt={"Art for album " + props.track.album.name}
                        height={albumImgSize}
                        width={albumImgSize}
                        className="object-contain justify-self-center self-center max-h-36"
                    />
                </>
                ) : (
                    <>
                        {/* replace this with an image placeholder */}
                        <div className="justify-self-center self-center">
                            No image
                        </div>
                    </>
                )}
                <div className="grid grid-rows-2 grid-cols-1">
                    <div className="justify-self-center self-center">{props.track.name}</div>
                    {/* TODO: display all names separated with commas */}
                    <div className="justify-self-center self-center">{props.track.artists[0].name}</div>
                </div>
            </a>
        </Link>
    )
}