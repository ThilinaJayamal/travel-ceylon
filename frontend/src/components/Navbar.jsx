import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, CarTaxiFront, MapPinned, Menu, X } from 'lucide-react';
import { asserts } from '../assets/assets';
import { useAuthStore } from '../store/auth-store';

function Navbar() {
    const user = useAuthStore((state) => state.user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: <BedDouble className="size-5" />, label: 'Stays' },
        { icon: <CarTaxiFront className="size-5" />, label: 'Taxi' },
        { icon: <MapPinned className="size-5" />, label: 'Tour Guides' }
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between h-20 px-4 md:px-8">

                {/* Left Nav (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-bold">
                    Travel <span className="text-green-500">Ceylon</span>
                </Link>

                {/* Right - Avatar & Menu Toggle */}
                <div className="flex items-center gap-4">
                    <img
                        src={user.image}
                        alt="User Avatar"
                        className="size-10 md:size-12 rounded-full object-cover border border-gray-300"
                    />
                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 py-4 bg-white shadow-md border-t border-gray-100 space-y-3 animate-slide-down">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-green-500 transition"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
