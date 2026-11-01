import { useContext, useState, useEffect} from "react";
import UserContext from "../context/userContext";
import uploadMedia from "../lib/uploadMedia";
import LoadingAnimation from "../components/loadingAnimations";
import api from "../lib/api";
import toast from "react-hot-toast";

export default function SettingsPage() {

    const userInfo = useContext(UserContext);

    const [firstName, setFirstName] = useState(userInfo.user?.firstName || "");
    const [lastName, setLastName] = useState(userInfo.user?.lastName || "");
    const [image, setImage] = useState(null);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    
    async function handleProfileUpdate() {

        const token = localStorage.getItem("token");

        if (token != null) {

            try {
                setIsLoading(true);

                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    image: userInfo.user?.image
                };

                if (image != null) {
                    data.image = await uploadMedia(image);
                }

                await api.put("/users/update", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                window.location.reload();

            } catch (err) {
                console.log(err);
                toast.error("Failed to update profile");
                setIsLoading(false);
            }
        }
    }

    async function handlePasswordUpdate() {

        const token = localStorage.getItem("token");

        if (token != null) {

            if(password !== confirmPassword){
                toast.error("Passwords do not match")
            return;
            }

            try {
                setIsLoading(true);

                const data = {
                    password: password
                };

                await api.put("/users/password", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                localStorage.removeItem("token")

                userInfo.setUser(null)

                toast.success("Password updated successfully. Please login again")

                window.location.href = "/login";

            } catch (err) {
                console.log(err);
                toast.error("Failed to update password");
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="min-h-full w-full bg-primary flex flex-wrap justify-center gap-4 p-4">
            <div className="w-[450px] h-[450px] bg-white shadow-xl rounded-md flex flex-col relative">

                <h1 className="text-2xl font-semibold text-secondary p-4">Update Profile </h1>
                <div className="w-full flex flex-col px-4">
                    <label className="text-lg font-medium text-gray-700 p-2">First Name</label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-[40px] border border-gray-300 rounded-md p-2 outline-none focus:border-accent"
                        placeholder="Enter first name"
                    />
                </div>

                <div className="w-full flex flex-col px-4">
                    <label className="text-lg font-medium text-gray-700 p-2">
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-[40px] border border-gray-300 rounded-md px-2 outline-none focus:border-accent"
                        placeholder="Enter last name"
                    />
                </div>

                <div className="w-full flex flex-col px-4">
                    <label className="text-lg font-medium text-gray-700 p-2">
                        Profile Image
                    </label>

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full h-[40px] border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="w-full flex flex-col px-4 absolute bottom-0 h-[50px]">
                    <button
                        className="w-full h-[40px] bg-accent text-white px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                        onClick={handleProfileUpdate}
                    >
                        Update Profile
                    </button>
                </div>

            </div>


            
            <div className="w-[450px] h-[450px] bg-white shadow-xl rounded-md flex flex-col relative">

                <h1 className="text-2xl font-semibold text-secondary p-4">
                    Change Password
                </h1>

                <div className="w-full flex flex-col px-4">
                    <label className="text-lg font-medium text-gray-700 p-2">
                        New Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded-md px-2 outline-none focus:border-accent"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="w-full flex flex-col px-4">
                    <label className="text-lg font-medium text-gray-700 p-2">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded-md px-2 outline-none focus:border-accent"
                        placeholder="Confirm new password"
                    />
                </div>

                <div className="w-full flex flex-col px-4 absolute bottom-0 h-[50px]">
                    <button
                        className="w-full h-[40px] bg-accent text-white px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                        onClick={handlePasswordUpdate}
                    >
                        Change Password
                    </button>
                </div>

            </div>

            {
                isLoading && <LoadingAnimation />
            }
        </div>

    );
}
