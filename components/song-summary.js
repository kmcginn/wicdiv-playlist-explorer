import Image from "next/image";

export default function SongSummary(props) {
    const albumImgSize = 300;
    const albumImgUrl = props.track.album.images.find(i => i.height === albumImgSize)?.url;

    return (
        <div className="grid grid-rows-1 grid-cols-2 border border-black">
            { albumImgUrl ? (
            <>
                <Image 
                    src={albumImgUrl}
                    alt={"Art for album " + props.track.album.name}
                    height={albumImgSize}
                    width={albumImgSize}
                    className="object-contain"
                />
            </>
            ) : (
                <>
                    <div>
                        No image
                    </div>
                </>
            )}
            <div className="grid grid-rows-2 grid-cols-1">
                <div>{props.track.name}</div>
                {/* TODO: display all names separated with commas */}
                <div>{props.track.artists[0].name}</div>
            </div>
        </div>
    )
}