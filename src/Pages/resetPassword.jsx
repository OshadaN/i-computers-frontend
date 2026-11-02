import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimations';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';


export default function ResetPasswordPage() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    async function handleOTPRequest() {
        setIsLoading(true);
        try {

            await api.post("/users/otp/send", { email: email });
            setIsOtpSent(true);

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong.");
        }

        setIsLoading(false);

    }

    async function handlePasswordReset() {
        setIsLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match.");
                setIsLoading(false);
                return;
            }

            await api.post("/users/reset-password", { email: email, otp: otp, newPassword: newPassword });
            toast.success("Password reset successful");
            navigate("/login");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong.");
        }
        setIsLoading(false);
    }

            return (
                <div className='w-full h-full flex justify-center items-center bg-primary'>

                    {
                        isOtpSent ?
                            <div className='w-[400px] py-6 bg-white rounded-lg flex flex-col justify-center items-center gap-4'>
                                <h1 className='text-2xl font-bold'>Reset Password</h1>
                                <h2 className='text-sm text-gray-500'>{email}</h2>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <label htmlFor="otp" >OTP</label>
                                    <input type="text" name="otp" id="otp" placeholder='Enter the OTP' className='w-full h-[40px] px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-accent' value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" name="newPassword" id="newPassword" placeholder='Enter your new password' className='w-full h-[40px] px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-accent' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm your new password' className='w-full h-[40px] px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-accent' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <button onClick={handlePasswordReset} className='w-[80%] h-[40px] bg-accent text-white rounded-md  hover:bg-blue-800 transition-colors duration-300'>
                                    Submit
                                </button>
                                <Link to="/login" className='text-sm text-accent'>Back to Login</Link>

                            </div> :

                            <div className='w-[400px] h-[400px] bg-white rounded-lg flex flex-col justify-center items-center gap-4'>
                                <h1 className="text-2xl font-bold">Reset Password</h1>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder='Enter your email' className='w-full h-[40px] px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-accent' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <button className='w-[80%] h-[40px] bg-accent text-white rounded-md  hover:bg-blue-800 transition-colors duration-300' onClick={handleOTPRequest}>Reset Password</button>
                                <Link to="/login" className='text-sm text-accent'>Back to Login</Link>
                            </div>}
                    {
                        isLoading && <LoadingAnimation />
                    }

                </div>
            )
        }
