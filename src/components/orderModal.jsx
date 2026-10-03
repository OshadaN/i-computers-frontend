import Modal from 'react-modal';
import { useState } from 'react';
import getFormattedPrice from '../lib/price-format';
import { useNavigate } from 'react-router-dom';
import { getCartTotal } from '../lib/cart';
export default function OrderModal(props) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    // const [file, setFile] = useState(null)
    const navigate = useNavigate();

    async function handleConfirmOrder() {
        const token = localStorage.getItem('token');
        if(!token) {
            toast.error("Please log in to place an order.");
            navigate("/login");
            return;
        }

        // const bankSlipLink = await uploadMedia(file);


    }


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-accent/75 hover:bg-accent cursor-pointer transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold"
            >
                Order
            </button>

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
                        <h1 className="text-xl font-semibold text-white">Total: </h1>
                            <span className='text-lg font-semibold text-white'>{getFormattedPrice(getCartTotal(props.cart))}</span> 
                        </div>
                            

                        <div className="w-1/2 h-full justify-center items-center flex flex-row gap-2">
                        <h1 className="text-xl font-semibold text-white">Items: </h1>
                        <span className="text-md font-normal text-white">{props.cart.length}</span>
                        </div>
      
                    </div>
                    <div className="w-full flex flex-row flex-wrap text-secondary">

                        <div className="1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                        <div className="1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="w-full h-[100px] flex flex-col justify-center p-4">
                        <label className="">Address Line 1</label>
                        <input
                            type="text"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            placeholder="123 Main St"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="w-full h-[100px] flex flex-col justify-center p-4">
                        <label className="">Address Line 2</label>
                        <input
                            type="text"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            placeholder="123 Main St"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>
                    <div className="1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Colombo"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="10001"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+94 76-902-7890"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">
                        <label className="">Secondary Phone Number</label>
                        <input
                            type="text"
                            value={secondaryPhoneNumber}
                            onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                            placeholder="+94 71-945-6843"
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    <div className="w-full h-[150px] flex flex-col justify-center p-4">
                        <label className="">Special Notes</label>
                        <textarea
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            placeholder="Any special instructions for delivery?"
                            className="w-full h-[100px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div>

                    {/* <div className="w-full h-[150px] flex flex-col justify-center p-4">
                        <label className="">Bank Slip</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full h-[40px] rounded-md outline-0 border border-gray-500 text-black px-2"
                        />
                        </div> */}

                    <div className="w-full sticky bottom-0 h-[70px] bg-[#7979b8] rounded-b-2xl flex flex-row justify-center items-center gap-10">
                        <button
                            onClick={() => {
                                // Handle order submission logic here
                                setIsOpen(false);
                            }}
                            className="bg-accent/75 hover:bg-green-700 cursor-pointer transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold"
                        >
                            Confirm Order
                        </button>

                        <button
                            onClick={() => {
                                // Handle order submission logic here
                                setIsOpen(false);
                            }}
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

{/* Total Items */}
                    {/* <div className="w-full h-[70px] bg-accent/30 flex">
                        <div className="w-full h-full flex flex-col justify-center items-center">

                            <span className="text-md font-normal text-white">
                                Total Items: {
                                    props.cart.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )
                                }
                            </span>

                        </div>
                    </div> */}