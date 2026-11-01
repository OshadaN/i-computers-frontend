import LoadingAnimation from "../components/loadingAnimations";

export default function TestPage() {
    return (
       <div className="w-screen h-screen bg-accent">

        <div className="w-[200px] h-">

        </div>

       </div>
    )
}




// import { useState } from "react";
// import toast from "react-hot-toast";
// import uploadMedia from "../lib/uploadMedia";

// export default function TestPage() {
    
//     const [file, setFile] = useState(null);

//     function uploadFile() {

//        uploadMedia(file).then(
//         (res)=> {
//             console.log(res)
//         }

//        ).catch(
//         (err) => {
//             console.log(err)
//             toast.error("Upload failed")
//         }
//        )
//     }

//     return (
//         <div className="w-full h-full flex flex-col items-center justify-center">

//             <input
//                 type="file"
//                 onChange={(e) => {
//                     const selectedFile = e.target.files[0];

//                     setFile(selectedFile);

//                     console.log("Selected file:", selectedFile);
//                 }}
//             />

//             <button
//                 onClick={uploadFile}
//                 className="bg-green-600 text-white p-2 mt-[-30px] ml-60 rounded-lg"
//             >
//                 Submit
//             </button>

//         </div>
//     );
// }


<div className="p-6 flex flex-col items-center"></div>