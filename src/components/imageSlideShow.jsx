import { useState } from "react";

export default function ImageSlideShow(props){

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const images = props.images;

    return(
        <div className="w-[500px] h-[650px] flex flex-col">
            <img src={images[activeImageIndex]} className="w-full h-[500px] object-contain"/>

            <div className="w-full h-[100px] flex justify-center items-center gap-2">
                {
                    images.map((image,index)=>{
                        return(
                            <img src={image} className={"w-[80px] h-[80px] object-contain cursor-pointer rounded-md border-2 " + (index === activeImageIndex ? "border-accent" : "border-transparent")}
                                onClick={()=>{setActiveImageIndex(index)}}
                            />
                        )
                    })
                }
            </div>
            

        </div>
    )

}