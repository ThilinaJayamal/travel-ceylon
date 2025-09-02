import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BedDouble, CarTaxiFront, MapPinned, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";

function NavbarBlack() {
  const user = useAuthStore((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: <BedDouble className="size-5" />, label: "Stays", to: "/stays" },
    { icon: <CarTaxiFront className="size-5" />, label: "Taxi", to: "/taxi" },
    {
      icon: <MapPinned className="size-5" />,
      label: "Tour Guides",
      to: "/guides",
    },
  ];

  const navigate = useNavigate();
  return (
    <nav className=" top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Left Nav (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <button
              onClick={() => navigate(item.to, scrollTo(0, 0))}
              key={index}
              className="flex items-center gap-2 text-black hover:text-green-500 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-black">
          Travel <span className="text-green-500">Ceylon</span>
        </Link>

        {/* Right - Avatar & Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link to={"/user-profile"}>
            <img
              src={user?.image}
              alt="User Avatar"
              className="size-10 md:size-12 rounded-full object-cover border border-gray-300"
            />
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
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

export default NavbarBlack;
