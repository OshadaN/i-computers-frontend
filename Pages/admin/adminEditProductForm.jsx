import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiUpload } from "react-icons/bi";
import { CiCircleInfo } from "react-icons/ci";
import api from "../../lib/api";
import uploadMedia from "../../lib/uploadMedia";
import LoadingAnimation from "../../src/components/loadingAnimations";



export default function EditProductForm() {
    
    const location = useLocation()
    const [productId, setProductId] = useState(location?.state?.productId ||"");
    const [Name, setName] = useState(location?.state?.name ||"");
    const [altNames, setAltNames] = useState(location?.state?.altNames?.join(",")||"");
    const [description, setDescription] = useState(location?.state?.description|| "");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(location?.state?.price||"");
    const [labelledPrice, setLabelledPrice] = useState(location?.state?.labelledPrice||"");
    const [stock, setStock] = useState(location?.state?.stock||"");
    const [isAvailable, setIsAvailable] = useState(location?.state?.isAvailable||true);
    const [category, setCategory] = useState(location?.state?.category|| "Laptop");
    const [brand, setBrand] = useState(location?.state?.brand||"");
    const [model, setModel] = useState(location?.state?.model||"");
    const [loading, setLoading] = useState(false);    
    const navigate = useNavigate();

    if(location.state == null){
        toast.error("No product data found")
        navigate("/admin/products")
    }
    
    async function handleUpdate() {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (token == null) {
            toast.error("You are not logged in")
            navigate("/login")
            return;
      }

      const productData = {
            productId : productId,
            name : Name,
            altNames : [],
            description : description,
            images : [],
            price : price,
            labelledPrice : labelledPrice,
            stock : stock,
            isAvailable : isAvailable,
            category : category,
            brand : brand,
            model : model
      }

      try{
            const imageUploadPromises =[]

            //toast.success(images.length)

            for (let i = 0; i < images.length; i++){

                 imageUploadPromises[i] = uploadMedia(images[i])
            }


            const uploadedImagesUrls = await Promise.all(imageUploadPromises)

            if(uploadedImagesUrls.length > 0){
                productData.images = uploadedImagesUrls
            }else{
                productData.images = location?.state?.images||[]
            }

            productData.altNames = altNames.split(",")

            const res = await api.put("/products/"+productId, productData ,
                 {
                  headers: {
                        Authorization: "Bearer " + token
                  }
                  }
            )

            console.log(res)
            toast.success("Product updated successfully")

            navigate("/admin/products")

      }catch (err) {
            console.log(err)
            toast.error("Failed to update product")
            setLoading(false)
      }
    }



    return (
        <div className="w-full max-h-full flex flex-wrap p-4 items-start gap-0 overflow-y-scroll">

           { loading && <LoadingAnimation /> }

            <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">
                <h1 className="text-2xl font-semibold text-secondary">Edit Product</h1>
   
                <div className="flex gap-2">
                    <Link to="/admin/products" className="p-2 bg-red-600 text-white rounded-md">Cancel</Link>
                    <button className="w-[65px] bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700" onClick={handleUpdate}>Update</button>
                </div>

            </div>

            <div className="w-[15%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Product ID</label>
                  <input disabled type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-[40%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Product Name</label>
                  <input type="text" value={Name} onChange={(e) => setName(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-[45%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2 flex items-center gap-2">Alternative Names<div className="flex justify-center items-center h-full italic font-thin tooltip"><CiCircleInfo /><div className="tooltip-text">Comma Separated</div></div></label>
                  <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-full flex flex-col p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-[100px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

             <div className="w-[40%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Images</label>
                  <input type="file" multiple={true} onChange={(e) => setImages(e.target.files)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

             <div className="w-[30%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

             <div className="w-[30%] flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Labelled Price</label>
                  <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Stock</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
            </div>

            {/* <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Availability</label>
                  <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
            </div> */}

            <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Availability</label>
                  <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
                        <option value={true}>In Stock</option>
                        <option value={false}>Out of Stock</option>
                  </select>
            </div>
            <div className="w-1/2 flex flex-col h-[100px] p-2"></div>

            <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Graphic Card">Graphic Card</option>
                        <option value="Processor">Processor</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="RAM">RAM</option>   
                        <option value="Power Supply">Power Supply</option>
                  </select>

            </div>

            <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Brand</label>
                  <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
            </div>

            <div className="w-1/4 flex flex-col h-[100px] p-2">
                  <label className="text-secondary text-lg font-semibold mb-2">Model</label>
                  <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
            </div>

        </div>
    )
}
