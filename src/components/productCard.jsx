
export default function ProductCard(props){

    const product = props.product;

     return(
        <div className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl flex flex-col overflow-hidden">
            <div className="w-full h-[350px] border-red-900 relative">

                <img src={product.images[0]} className="w-full h-full absolute"/>
                <img src={product.images[1]} className="w-full h-full absolute"/>

            </div>
           
        </div>
     )

}