import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BedDouble, CarTaxiFront, MapPinned, Menu, X } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import useAuthStore from '../store/authStore';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuthStore();
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error (e.g., user not authenticated)
                setUser(null); // Ensure user is null if fetch fails
            }
        };

        fetchUserData();
    }, []); // Empty dependency array means this runs once on mount

    const navItems = [
        { icon: BedDouble, label: 'Stays', to: "/stays" },
        { icon: CarTaxiFront, label: 'Taxi', to: "/taxi" },
        { icon: MapPinned, label: 'Tour Guides', to: "/tour-guides" }
    ];

    const handleNavClick = (to) => {
        navigate(to);
        window.scrollTo(0, 0); // Corrected from scrollTo to window.scrollTo
        setIsMobileMenuOpen(false);
    };

    // Fallback profile image URL
    const fallbackProfileImage = "https://via.placeholder.com/100x100?text=Profile";

    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between h-20 px-4 md:px-8">

                {/* Left Nav (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavClick(item.to)}
                            className="flex items-center gap-2 text-white hover:text-green-500 transition"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-bold text-white">
                    Travel <span className="text-green-500">Ceylon</span>
                </Link>

                {/* Right - Avatar & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    <Link to="/user-profile">
                        <img
                            src={user?.profilePic}
                            alt="User Avatar"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-300"
                        />
                    </Link>
                    <button
                        className="md:hidden text-white"
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
                            onClick={() => handleNavClick(item.to)}
                            className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-green-500 transition"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;