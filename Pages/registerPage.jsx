import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../lib/api";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister() {

        // Check passwords
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Send registration request
        api.post("users/", 
        {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        })
        .then((res) => {

            toast.success("Registration successful");

            navigate("/login");

        })
        .catch((err) => {

            console.log(err);
            toast.error("Registration failed");

        });
    }


    return (
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center">

            <div className="w-[400px] h-[620px] backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col items-center">


                {/* Logo */}
                <img
                    src="/logo.png"
                    className="w-[200px] h-[70px] object-cover bg-accent/40 rounded-lg"
                />

                {/* Email */}
                <label className="w-full text-secondary mt-5 text-left font-semibold">
                    Email
                </label>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="user@gmail.com"
                    className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 focus:border-accent/80 outline-none text-secondary"
                />



                {/* First Name + Last Name */}
                <div className="w-full flex gap-3 mt-5">

                    <div className="w-1/2">

                        <label className="text-secondary font-semibold">
                            First Name
                        </label>

                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="John"
                            className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 focus:border-accent/80 outline-none text-secondary"
                        />

                    </div>


                    <div className="w-1/2">

                        <label className="text-secondary font-semibold">
                            Last Name
                        </label>

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Doe"
                            className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 focus:border-accent/80 outline-none text-secondary"
                        />

                    </div>

                </div>

                {/* Password */}
                <label className="w-full text-secondary mt-5 text-left font-semibold">
                    Password
                </label>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="******"
                    className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 focus:border-accent/80 outline-none text-secondary"
                />


                {/* Confirm Password */}
                <label className="w-full text-secondary mt-5 text-left font-semibold">
                    Confirm Password
                </label>

                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="******"
                    className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 focus:border-accent/80 outline-none text-secondary"
                />


                {/* Register Button */}
                <button
                    onClick={handleRegister}
                    className="w-full h-10 rounded-lg p-1 mt-5 text-lg bg-accent text-white font-bold hover:bg-accent/40 transition-all duration-300"
                >
                    Register
                </button>


                {/* Login Link */}
                <p className="w-full text-black text-center text-[14px] mt-2">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-accent hover:underline"
                    >
                        Login
                    </Link>
                </p>


                {/* Google Button */}
                <button
                    className="w-full h-10 rounded-lg p-1 mt-6 text-[16px] bg-secondary/20 text-secondary font-semibold hover:bg-white/50 border-2 border-secondary/50 transition-all duration-300 flex items-center justify-center gap-2"
>
                    <FcGoogle size={26} />
                    Register with Google
                </button>

            </div>

        </div>
    );
}