import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../lib/api";
import { useGoogleLogin } from "@react-oauth/google";
import UserContext from "../context/userContext";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userData = useContext(UserContext)

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {

            console.log(response)
            console.log(response.access_token)

            api.post("/users/google", {
                accessToken: response.access_token
            }).then(
                (res) => {
                    console.log(res)
                    toast.success("Login succesful")
                    localStorage.setItem("token", res.data.token)

                    userData.setUser(res.data.user)


                    if (res.data.isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }

                }
            ).catch(
                (err) => {
                    console.log(err)
                    toast.error("Google Login failed")
                }
            )

        },
        onError: (error) => {
            console.log(error)
            toast.error("Google Login failed")
        }
    })

    const navigate = useNavigate()


    function handleLogin() {

        // axios.post("http://localhost:3000/users/login", 
        //     {
        //         email : email, 
        //         password : password
        //     }

        // )

        api.post("users/login",
            {
                email: email,
                password: password
            }
        ).then(
            (res) => {

                toast.success("Login succesful")

                //this will be store in the user's browser store
                localStorage.setItem("token", res.data.token)

                userData.setUser(res.data.user)

                if (res.data.isAdmin) {
                    //window.location.href = "/admin"
                    navigate("/admin")

                } else {
                    //window.location.href = "/"
                    navigate("/")
                }

            }

        ).catch(

            (err) => {
                console.log(err)
                toast.error("Login failed")
            }
        )


    }


    return (
        <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center">

            <div className="w-[400px] h-[580px] backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col items-center">

                <img src="logo.png" className="w-[200px] h-[70px] object-cover bg-accent/40 rounded-lg" />
                <h1 className="text-3xl font-bold text-secondary mt-5">Login</h1>

                <label className="w-full text-secondary mt-5 text-left font-semibold">Email</label>

                <input

                    value={email}
                    onChange={
                        (e) => {

                            setEmail(e.target.value)
                        }
                    }


                    type="email" className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 text-secondary/50 border-accent focus:border-accent/80 outline-none px-2 text-secondary" placeholder="user@gmail.com" />

                <label className="w-full text-secondary mt-5 text-left font-semibold">Password</label>
                <input


                    value={password}
                    onChange={
                        (e) => {

                            setPassword(e.target.value)
                        }
                    }


                    type="password" className="w-full h-10 rounded-lg p-2 mt-2 text-lg bg-secondary/20 border-2 border-accent/50 text-secondary/50 border-accent focus:border-accent/80 outline-none px-2 text-secondary" placeholder="******" />

                <p className="w-full text-black text-right py-0 rounded-lg cursor-pointer text-[14px]">Forget Password? reset <Link to="/reset-password" className="text-accent hover:underline">here</Link></p>

                <button onClick={handleLogin} className="w-full h-10 rounded-lg p-1 mt-5 text-lg bg-accent text-white font-bold hover:bg-accent/40 transition-all duration-300">Login</button>
                <p className="w-full text-black text-center py-0 rounded-lg cursor-pointer text-[14px] mt-5">Don't have an account? <Link to="/register" className="text-accent hover:underline">Register</Link></p>

                <button className="w-full h-10 rounded-lg p-1 mt-4 text-[16px] bg-secondary/20 text-secondary font-semibold hover:bg-white/50 border-2 border-secondary/50 focus:border-secondary/80 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={googleLogin}><FcGoogle size={26} />Login with Google</button>

            </div>
        </div>
    )

}