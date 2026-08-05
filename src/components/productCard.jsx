
export default function ProductCard(props){

     return(
        <div className="bg-[#5db099] w-48 h-[330.5px]">
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <p>Price: {props.price}</p>
        </div>
     )

}