import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import Modal from 'react-modal';
import getFormattedPrice from "../lib/price-format";
import formatTimestamp from "../lib/date-format";



export default function AdminOrderDetailsModal(props){

    const refresh = props.refresh
    const order = props.order
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [status, setStatus] = useState(order.status)

    return(
        <>
        <IoEyeOutline  className="text-secondary hover:text-accent cursor-pointer text-xl"
        onClick={() => setIsModalOpen(true)} />
        <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
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
                        
                                            <div className="w-full h-[70px] bg-accent rounded-t-2xl flex">
                                                 
                                                 {/* Order Summary Header */}
                                                <div className="w-full h-full flex flex-col justify-center items-center">
                        
                                                    <h1 className="text-2xl font-semibold text-white">
                                                        Order Summary
                                                    </h1>
                        
                                                </div>
                        
                                            </div>
                        
                        
                                            {/* Total */}
                        
                                            <div className="w-full flex flex-wrap justify-center bg-[#7979b8] sticky top-0 px-2">

                                                <div className="w-1/3 justify-center items-center flex flex-row gap-2">
                                                    <span className="text-lg  text-white">
                                                        {order.orderId}
                                                    </span>
                                                </div>
                
                                                <div className="w-1/3 justify-center items-center flex flex-row gap-2">
                                                    <span className="text-lg  text-white">
                                                        {getFormattedPrice(order.totalAmount)}
                                                    </span>
                                                </div>
                        
                        
                                                <div className="w-1/3  justify-center items-center flex flex-row gap-2">
                                                    <h1 className="text-xl  text-white">
                                                        {order.items.length} Items
                                                    </h1>
                                                </div>

                                                <div className="w-full justify-center items-center flex flex-row gap-2 border-t-2 border-white">
                                                    <h1 className="text-xl  text-white">
                                                        {formatTimestamp(order.date)}
                                                    </h1>
                                                </div>

                                                <div className="w-full justify-center items-center flex flex-row gap-2 text-center border-t-2 border-white">                    
                                                    <h1 className="text-xl  text-white">
                                                        {order.firstName} {order.lastName}, {order.addressLine1}, {order.addressLine2}, {order.city}, {order.postalCode}, {order.country}
                                                        ({order.phone} / {order.secondaryPhone})
                                                    </h1>
                                                </div>
                                                <div className="w-full justify-center text-white items-center flex flex-row gap-2 text-center border-t-2 border-white">                    
                                                    Order Status : <select className="bg-accent text-white rounded-lg px-2 py-1" value={status}
                                                    onChange={(e) => {
                                                        setStatus(e.target.value)
                                                    }}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="h-[100px] w-full">
                                                Notes : {order.customerNotes}
                                            </div>

                                              {
                                                    order.items.map((item, index) => (
                                                        <div key={index} className="w-full flex flex-row text-secondary items-start gap-3 py-3">
                                                            <img src={item.product.image} className="w-[100px] h=[100px] object-contain shrink-0" />
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <h1 className="text-lg font-semibold leading-6">{item.product.name}</h1>
                                                                <h1 className="text-md leading-4 mt-1">{getFormattedPrice(item.product.price)} x {item.qty} = {getFormattedPrice(item.product.price * item.qty)}</h1>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            { status != order.status&& <button className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-800 p-2 rounded-md text-white font-semibold shadow-2xl">
                                                Update Status
                                            </button>}
                        

                                            </div>
                    </Modal>

        </>
    )

}