import React, { useState, useRef, useEffect } from 'react';
import { BedDouble, CarTaxiFront, MapPinned, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useServiceAuthStore } from '../store/serviceAuthStrore';

function Navbar() {
    const traveler = useAuthStore((state) => state.user);
    const travelerLogout = useAuthStore((state) => state.logout);

    const provider = useServiceAuthStore((state) => state.user);
    const providerLogout = useServiceAuthStore((state) => state.logout);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const navItems = [
        { icon: <BedDouble className="w-5 h-5" />, label: 'Stays', to: '/stays' },
        { icon: <CarTaxiFront className="w-5 h-5" />, label: 'Taxi', to: '/taxi' },
        { icon: <MapPinned className="w-5 h-5" />, label: 'Tour Guides', to: '/guides' },
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        if (traveler) await travelerLogout();
        else if (provider) await providerLogout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
            <div className="relative flex items-center justify-between h-20 px-4 md:px-8">
                {/* Left - Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => { navigate(item.to); window.scrollTo(0, 0); }}
                            className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Center - Logo */}
                <Link
                    to="/"
                    className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold text-gray-800"
                >
                    Travel <span className="text-green-500">Ceylon</span>
                </Link>

                {/* Right - Avatar & Mobile Menu */}
                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                    {/* Avatar */}
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img
                            src={traveler?.profilePic || provider?.profilePic || 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                        />
                    </button>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-100 py-2 flex flex-col z-50 animate-slide-down">
                            <div className="px-4 py-2 text-gray-800 font-medium truncate">
                                {traveler?.email || provider?.email}
                            </div>
                            <button
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                                onClick={() => { navigate('/'); setIsDropdownOpen(false); }}
                            >
                                <User className="w-5 h-5" /> Profile
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-500 transition"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 py-4 bg-white shadow-md border-t border-gray-100 space-y-3 animate-slide-down">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => { navigate(item.to); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
                            className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-green-500 transition"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}

                    {/* Mobile User Menu */}
                    <div className="border-t border-gray-200 pt-3">
                        <div className="px-2 text-gray-700 truncate">{traveler?.email || provider?.email}</div>
                        <button
                            className="flex items-center gap-2 px-2 py-2 w-full text-left hover:bg-gray-100 text-gray-700"
                            onClick={() => { navigate('/user-profile'); setIsMobileMenuOpen(false); }}
                        >
                            <User className="w-5 h-5" /> Profile
                        </button>
                        <button
                            className="flex items-center gap-2 px-2 py-2 w-full text-left hover:bg-gray-100 text-red-500"
                            onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        >
                            <LogOut className="w-5 h-5" /> Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
