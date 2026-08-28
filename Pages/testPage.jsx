import { useState } from "react";
import toast from "react-hot-toast";

export default function TestPage (){


    const [status, setStatus] = useState("Off");
    const [level, setLevel] = useState("1");


    return(
        <div className="w-full h-full flex flex-col items-center justify-center">

            <h1 className="text-3xl font-bold">{status}</h1>

            <div className="w-75 h-[50px] flex justify-center items-center">

                <button onClick={
                    () =>{
                        // status = "On"
                        setStatus("On")
                        toast.success("Status is now On")
                        
                    } 
                    
                    } className="p-2 text-white m-2 bg-green-600">Turn On</button>


                <button onClick={
                    () => {
                        
                        setStatus("Off")
                        toast.error("Status is now Off")
                        
                    }
                } className="p-2 text-white m-2 bg-red-600">Turn Off</button>


                <button onClick={
                    () => {
                        setStatus("Idle")
                        toast.error("Status is now Idle")
                        
                    }
                } className="p-2 text-white m-2 bg-yellow-600">Idle</button>


                </div>


                <h1 className="text-3xl font-bold">{level}</h1>
                <div className="w-75 h-[50px] flex justify-center items-center">

                    <button onClick={
                        () => {
                            setLevel("1")
                        }
                    } className="p-2 text-white m-2 bg-green-600">1</button>

                    <button onClick={
                        () => {
                            setLevel("2")
                        }
                    } className="p-2 text-white m-2 bg-red-600">2</button>

                    <button onClick={
                        () => {
                            setLevel("3")
                        }
                    } className="p-2 text-white m-2 bg-yellow-600">3</button>   
                </div>
        </div>

    )
}








// export default function TestPage (){
//     return(
//         <div className="w-full h-full">
//             <div className="w-[280px] h-[280px] bg-yellow-400">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque delectus ut nulla ad saepe vel deleniti corporis autem temporibus hic, voluptate nesciunt nisi error perspiciatis ipsa accusamus voluptates iste quod magnam odit officia praesentium commodi aliquam distinctio! Soluta maxime et voluptas tempora ad!
//                 </div>
//     </div>
//     )
// }




// Alignments and positions in css
// export default function TestPage (){
//     return(
//         <div className="w-full h-full">
//             <div className=" flex flex-col items-center justify-center w-[600px] h-[600px] bg-yellow-400">

//                 <div className="w-[100px] h-[100px] bg-red-400">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-green-400">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-blue-400">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-white">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-black">
//                 </div>
//         </div>
//     </div>
//     )
// }