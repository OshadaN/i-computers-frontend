import { Link } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";

export default function ProductCard(props){

    const product = props.product;

     return(
        <Link to={"/overview/"+product.productId} state={ product } className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl flex flex-col overflow-hidden hover:[&_.primary-image]:opacity-0">
            <div className="w-full h-[350px] relative bg-white">

                <img src={product.images[0]} className="w-full h-full absolute"/>
                <img src={product.images[1]} className="w-full h-full absolute primary-image transition-opacity duration-700"/>

            </div>

            <span className="text-sm text-gray-400 font-thin px-3 mt-3">{product.productId}</span>
            <h1 className="text-lg font-semibold px-3 ">{product.name}</h1>
            {
                product.labelledPrice > product.price && <span className="text-sm text-gray-500 mt-2 line-through px-3">{getFormattedPrice(product.labelledPrice)}</span>
            }
            <span className="text-lg font-bold mt-1 px-3">{getFormattedPrice(product.price)}</span>

           
        </Link>
     )

} 
