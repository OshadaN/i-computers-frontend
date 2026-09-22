import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimations";
import api from "../lib/api";
import ImageSlideShow from "../components/imageSlideShow";

export default function ProductOverview() {

    const params = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (loading){
        api.get("/products/" + params.productId)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Error fetching product details");
                setProduct(null);
                setLoading(false);
            });
        }
    });

    return (
        <div className="w-full h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] ">
            {
            loading && <LoadingAnimation />
            }

            {
            product != null &&
                <div className="w-full h-full min-h-full flex">
                    <div className="w-1/2 h-full flex justify-center items-center">
                    <ImageSlideShow images={product.images}/>
                    </div>

                    
                    <div className="w-1/2 h-full">
                    </div>
                    
                </div>
            }
            {
                product==null&&!loading&&
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold">Product Not Found</h1>
                </div>

            }
        </div>
    );
}