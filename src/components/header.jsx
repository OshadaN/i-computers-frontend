import {Link } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";


export default function Header(){
    return (
        <header className="w-full h-[100px] bg-accent flex p-4 justify-between">
            <Link to="/" className="h-full">
                <img src="/logo.png" alt="Logo" className="h-full" />

            </Link>

            <div className="h-full text-primary flex items-center pt-[20px]">
                <Link to="/" className="h-full items-center px-4 hover:bg-accent-dark">Home</Link>
                <Link to="/products" className="h-full items-center px-4 hover:bg-accent-dark">Products</Link>
                <Link to="/about" className="h-full items-center px-4 hover:bg-accent-dark">About</Link>

            </div>
          <div className="w-[100px] h-full flex items-center">
            <Link to="/cart">
            <PiShoppingCartSimple className="text-white text-4xl"/>
            </Link>
            </div>

        </header>
    )
}