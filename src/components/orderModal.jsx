import Modal from 'react-modal';
import { useState } from 'react';
import getFormattedPrice from '../lib/price-format';
import { useNavigate } from 'react-router-dom';
import { getCartTotal } from '../lib/cart';
import { toast } from 'react-hot-toast';
import api from '../lib/api';

export default function OrderModal(props) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');

    const navigate = useNavigate();

    async function handleConfirmOrder() {

        if (isSubmitting) return;

        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Please log in to place an order.");
            navigate("/login");
            return;
        }

        if (!props.cart || props.cart.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        const orderData = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phone: phoneNumber,
            secondaryPhone: secondaryPhoneNumber,
            customerNotes: specialNotes, // backend reads "customerNotes"
            items: []
        };

        for (let i = 0; i < props.cart.length; i++) {

            orderData.items.push({
                productId: props.cart[i].product.productId,
                qty: props.cart[i].qty
            });

        }

        try {

            setIsSubmitting(true);

            await api.post("/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Order placed successfully!");

            setIsOpen(false);

            navigate("/products");

        } catch (err) {

            console.error("Order Error:", err);
            console.error("Response:", err.response?.data);
            console.error("Status:", err.response?.status);

            toast.error(
                err.response?.data?.message ||
                "Failed to place order. Please try again."
            );

        } finally {

            setIsSubmitting(false);

        }
    }

    return (
        <>
            {/* Button to open the modal */}

            <button
                onClick={() => setIsOpen(true)}
                className="bg-accent/75 hover:bg-green-700 cursor-pointer transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold"
            >
                Confirm Order
            </button>


            {/* Order Modal */}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                    content: {
                        width: '450px',
                        margin: 'auto',
                        padding: '0px',
                        backgroundColor: 'transparent',
                        border: 'none',
                    },
                }}
            >

                <div className="w-full min-h-full rounded-2xl bg-primary flex flex-col">

                    {/* Order Summary Header */}

                    <div className="w-full h-[70px] bg-accent rounded-t-2xl flex">

                        <div className="w-full h-full flex flex-col justify-center items-center">

                            <h1 className="text-2xl font-semibold text-white">
                                Order Summary
                            </h1>

                        </div>

                    </div>


                    {/* Total */}

                    <div className="w-full h-[70px] flex bg-[#7979b8] sticky top-0">

                        <div className="w-1/2 h-full justify-center items-center flex flex-row gap-2">

                            <h1 className="text-xl font-semibold text-white">
                                Total:
                            </h1>

                            <span className="text-lg font-semibold text-white">
                                {getFormattedPrice(getCartTotal(props.cart))}
                            </span>

                        </div>


                        <div className="w-1/2 h-full justify-center items-center flex flex-row gap-2">

                            <h1 className="text-xl font-semibold text-white">
                                Items:
                            </h1>

                            <span className="text-md font-normal text-white">
                                {props.cart.length}
                            </span>

                        </div>

                    </div>


                    {/* Customer Details */}

                    <div className="w-full flex flex-row flex-wrap text-secondary">


                        {/* First Name */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Last Name */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Address Line 1 */}

                        <div className="w-full h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Address Line 1
                            </label>

                            <input
                                type="text"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                placeholder="123 Main St"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Address Line 2 */}

                        <div className="w-full h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Address Line 2
                            </label>

                            <input
                                type="text"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                                placeholder="Apartment / Street"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* City */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Colombo"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Postal Code */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Postal Code
                            </label>

                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="10001"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Phone Number */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+94 76-902-7890"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Secondary Phone Number */}

                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">

                            <label>
                                Secondary Phone Number
                            </label>

                            <input
                                type="text"
                                value={secondaryPhoneNumber}
                                onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                                placeholder="+94 71-945-6843"
                                className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Special Notes */}

                        <div className="w-full h-[150px] flex flex-col justify-center p-4">

                            <label>
                                Special Notes
                            </label>

                            <textarea
                                value={specialNotes}
                                onChange={(e) => setSpecialNotes(e.target.value)}
                                placeholder="Any special instructions for delivery?"
                                className="w-full h-[100px] rounded-md outline-0 border border-gray-500 text-black px-2"
                            />

                        </div>


                        {/* Buttons */}

                        <div className="w-full sticky bottom-0 h-[70px] bg-[#7979b8] rounded-b-2xl flex flex-row justify-center items-center gap-10">


                            {/* Submit Order */}

                            <button
                                onClick={handleConfirmOrder}
                                disabled={isSubmitting}
                                className="bg-accent/75 hover:bg-green-700 cursor-pointer transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Placing..." : "Confirm Order"}
                            </button>


                            {/* Cancel */}

                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="bg-gray-500/75 hover:bg-red-500 cursor-pointer transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            </Modal>
        </>
    );
}