import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, CarTaxiFront, MapPinned } from 'lucide-react';
import { asserts } from '../assets/assets';

function Navbar() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between h-20 md:px-8 px-4">

                {/* Left Navigation Options */}
                <div className="flex items-center gap-6">
                    <button
                        className="flex items-center gap-2 text-gray-700 hover:text-green-400 transition"
                        aria-label="Stays"
                    >
                        <BedDouble className="size-6" />
                        <span>Stays</span>
                    </button>

                    <button
                        className="flex items-center gap-2 text-gray-700 hover:text-green-400 transition"
                        aria-label="Taxi"
                    >
                        <CarTaxiFront className="size-6" />
                        <span>Taxi</span>
                    </button>

                    <button
                        className="flex items-center gap-2 text-gray-700 hover:text-green-400 transition"
                        aria-label="Tour Guides"
                    >
                        <MapPinned className="size-6" />
                        <span>Tour Guides</span>
                    </button>
                </div>

                {/* Logo */}
                <Link to="/" className="text-center">
                    <h1 className="text-2xl font-bold">
                        Travel <span className="text-green-400">Ceylon</span>
                    </h1>
                </Link>

                {/* User Avatar */}
                <div>
                    <img
                        src={asserts.user1}
                        alt="User Avatar"
                        className="size-12 rounded-full object-cover object-center border border-gray-300"
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
