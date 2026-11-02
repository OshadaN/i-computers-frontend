import { Route, Routes, Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { BsBox } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductForm from "./admin/adminAddProductForm";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import EditProductForm from "./admin/adminEditProductForm";
import { useContext } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function AdminPage() {

    const userData = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.user || !userData.user.isAdmin) {
            navigate("/login");
        }
    }, [userData.user, navigate]);


    return (
        <div className="w-full h-full flex">

            <div className="w-[360px] min-h-full shadow-2xl text-secondary flex flex-col">

                <div className="w-full h-[60px] p-2 flex gap-2 items-end mb-4">
                    <img src="/logo.png" alt="logo" className="h-full mt-1" />
                    <span className="text-2xl font-bold relative -top-[06px]">Admin</span>
                </div>

                <Link to="/admin" className="w-full text-xl flex items-center p-2 gap-2 mb-2 hover:bg-accent hover:text-white"><BsCart2 />Orders</Link>
                <Link to="/admin/products" className="w-full text-xl flex items-center p-2 gap-2 mb-2 hover:bg-accent hover:text-white"><BsBox />Products</Link>
                <Link to="/admin/users" className="w-full text-xl flex items-center p-2 gap-2 mb-2 hover:bg-accent hover:text-white"><LuUsers />Users</Link>

            </div>
            <div className="w-[calc(100%-360px)] h-full bg-primary">

                <Routes>
                    <Route path="/" element={<AdminOrdersPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="/add-products" element={<AdminAddProductForm />} />
                    <Route path="/edit-product" element={<EditProductForm />} />
                </Routes>
            </div>


        </div>
    )

}

// primary - #f2f2f2
// secondary - #333333
// accent - #000080