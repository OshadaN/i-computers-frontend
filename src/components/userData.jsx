import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../context/userContext";

export default function UserData() {

    const userData = useContext(UserContext)
    const [selectedOption, setSelectedOption] = useState("name")
    const navigate = useNavigate()
    
    return (
        <>
            {userData.user == null ?
                <div className="text-white p-2">
                    <Link to="/login">Login </Link>
                    |
                    <Link to="/register"> Register</Link>
                </div>
                :
                <div className="flex gap-2">
                    <img src={userData.user.image} alt="Avatar" className="w-[40px] h-[40px] rounded-full border border-white p-2"/>
                    <select 
                    value={selectedOption}

                    onChange={(e) => { 
                        const value = e.target.value;
                        setSelectedOption(value)

                        if(e.target.value === "settings"){
                            navigate("/settings")
                        }else if(e.target.value === "my-orders"){
                            navigate("/my-orders")
                        }else if(e.target.value === "logout"){
                            localStorage.removeItem("token")
                            userData.setUser(null)
                            navigate("/login")
                        }
                    }}

                    className="bg-accent text-white p-2 rounded">
                        <option value="name">{userData.user.firstName} {userData.user.lastName}</option>
                        <option value="settings">Settings</option>
                        <option value="my-orders">My Orders</option>
                        <option value="logout">Logout</option>

                    </select>
                </div>
            }
        </>
    )
}