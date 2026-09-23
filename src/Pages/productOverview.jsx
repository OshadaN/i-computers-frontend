import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimations";
import api from "../lib/api";
import ImageSlideShow from "../components/imageSlideShow";
import { BiCategory } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import getFormattedPrice from "../lib/price-format";
import { addToCart, getCart } from "../lib/cart";




export default function ProductOverview() {

    const params = useParams();
    const location = useLocation();

    const [product, setProduct] = useState(location.state);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products/" + params.productId)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error fetching product details");
                setProduct(null);
                setLoading(false);
            });
    }, [params.productId]);

    return (
        <div className="w-full h-[calc(100vh-100px)] min-h-[calc(100vh-100px)]">

            {/* Loading Animation */}
            {loading && <LoadingAnimation />}

            {/* Product Details */}
            {product != null && !loading && (
                <div className="w-full h-full min-h-full flex">

                    {/* Product Images */}
                    <div className="w-1/2 h-full flex justify-center items-center">
                        <ImageSlideShow images={product.images} />
                    </div>

                    {/* Product Information */}
                    <div className="w-1/2 h-full p-8 flex flex-col">

                        <h1 className="text-3xl font-semibold">{product.name}

                            {product.altNames?.map(
                                (name, index) => (
                                <span key={index} className="font-normal text-gray-500"> | {name}
                                </span>
                            )
                        )
                    }
                        </h1>
                        <p className="text-lg text-gray-600 italic">{product.productId}</p>
                        <p className="text-xl font-thin mt-4 flex items-center"><BiCategory/><span className="mx-2 font-normal">Category</span> <FaAngleRight/>{product.category}</p>
                        <p className="text-xl font-thin mt-4 flex items-center mb-4"><HiOutlineBadgeCheck /><span className="mx-2 font-normal">{product.brand}</span><FaAngleRight/>{product.model}</p>
                        {
                            product.labelledPrice>product.price&&
                            <span className="text-lg font-normal line-through text-gray-500">{getFormattedPrice(product.labelledPrice)}</span>
                        }
                        <p className="text-3xl font-semibold text-accent mt-3">{getFormattedPrice(product.price)}</p>
                        <p className="text-lg font-normal text-gray-600 mt-3">{product.description}</p>

                        <div className="w-full py-5 gap-4 flex">
                            <button className="w-[200px] h-[60px] bg-white border-2 border-accent text-accent font-semibold rounded-md hover:bg-accent hover:text-white transition-colors duration-500 cursor-pointer"
                            onClick={
                                ()=>{
                                    addToCart(product,1);
                                    toast.success("Product added to cart");
                                }
                            }>Add to Cart</button>

                            <button className="w-[200px] h-[60px] bg-accent border-2 text-white font-semibold rounded-md hover:bg-white hover:text-accent ml-2 transition-colors duration-500 cursor-pointer"
                            onClick={
                                ()=>{
                                    const cart = getCart();

                                    console.log(cart);
                                }
                            }>Buy Now</button>

                        </div>

                    </div>

                </div>
            )}

            {/* Product Not Found */}
            {product == null && !loading && (
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold">
                        Product Not Found
                    </h1>
                </div>
            )}

        </div>
    );
}
