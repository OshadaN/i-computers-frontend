import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function DeleteProductModal(props) {

    
    const [showModal, setShowModal] = useState(false);

    const refresh = props.refresh
    const product = props.product

    async function handleDelete() {
    const token = localStorage.getItem("token");

    try {
        await api.delete(`/products/${product.productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success("Product deleted successfully");
        refresh()

    } catch (error) {
        console.log(error);

    }finally{
        setShowModal(false);
    }
}


    return (
        <>
            <CiTrash
                onClick={() => setShowModal(true)}
                className="hover:text-red-600 cursor-pointer"
            />

            {showModal && (
                <div className="w-screen h-screen bg-black/50 flex justify-center items-center fixed left-0 top-0">

                    <div className="w-160 bg-white rounded-md shadow-md flex flex-col items-center overflow-hidden">

                        {/* Header bar: title + X inside, aligned on same row */}
                        <div className="w-full h-13 bg-accent flex items-center justify-between text-white p-4">
                            <h1 className="px-2 font-semibold">Delete Confirmation</h1>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-white/20 rounded cursor-pointer hover:text-red-600">X</button>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex flex-col items-center">

                            <p className="text-lg font-semibold text-center">
                                Are you sure you want to delete this product with ID {product.productId}?
                            </p>

                            <div className="flex gap-3 mt-4 justify-center">
                                <button onClick={handleDelete} className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer">
                                    Confirm
                                </button>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-red-500 px-4 py-2 text-white rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </>
    );
}
