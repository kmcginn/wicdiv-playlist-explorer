import Image from "next/image";

export default function SongSummary(props) {
    const albumImgSize = 300;
    const albumImgUrl = props.track.album.images.find(i => i.height === albumImgSize)?.url;

    return (
        <div key={props.track.id} className="grid grid-rows-1 grid-cols-2 gap-2 max-h-40 max-w-md border-2 border-black rounded-lg">
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
        </div>
    )
}